---
layout: post
title: Improving performance for bulk PnP PowerShell scripts
date: '2021-03-21 14:00:00'
excerpt: >-
  I have been a little quiet on this blog recently and while the stress of the pandemic with lots of kids at home has played into that, another large part has been a painful migration project. I have learnt plenty about the scales of SharePoint Online and reminding myself of the limitations of SharePoint 2010 - I really had forgotten how painful it was considering servers! One of the biggest areas though has been the validation. While the migration tooling gives us some information, we have been running lots of PnP PowerShell scripts for both creating structures and also validating that content has migrated correctly. Having tens of thousands of sites and libraries brings its own challenges.
thumb_img_path: 'images/previews/2021/03/toycar.jpg'
thumb_img_alt: Toy car
content_img_path: 'images/2021/03/toycar.jpg'

---
I have been a little quiet on this blog recently and while the stress of the pandemic with lots of kids at home has played into that, another large part has been a painful migration project. I have learnt plenty about the scales of SharePoint Online and reminding myself of the limitations of SharePoint 2010 - I really had forgotten how painful it was considering servers! One of the biggest areas though has been the validation. While the migration tooling gives us some information, we have been running lots of PnP PowerShell scripts for both creating structures and also validating that content has migrated correctly. Having tens of thousands of sites and libraries brings its own challenges.

This weekend I found a great improvement to things. Instead of just using PnP PowerShell, I decided to use REST calls and focus them on particular things. PnP PowerShell is fantastic but it does everything and there are often times where speed is the important factor, not scale. Reducing the amount of data returned and only returning what you need can have huge benefits.

One thing that hasn't changed is the use of a database to track what has run and what hasn't. Being able to re-run a script at any point and know that it will pick up where it left off has meant that the age old challenges of servers rebooting in the middle of the night mean there is less impact with being able to start again.

## So what does the script do?
The script I was working on most recently was aimed at checking that everything was in place ready for handover. It checked a set of libraries for:

- Check library is hidden
- Check Minor Versions disabled
- Check search is disabled
- Check title is set correctly
- Check ContentTypes exist
- Check default content type set
- Check list specific field added to content types
- Check fields set to correct required fields
- Check field order set
- Check views set

You may wonder why some of these things are in there (a list specific field added to each content type?) but I'll save that chat for when we can meet for a coffee/beer/whisky. The challenges with some of these were that the migrated content was in a different state to what we wanted in a few cases which added to the fun.

## How did the original script work?

For working with the database, I made use of a few scripts that you can find with a quick Google:

- [out-table.ps1](https://github.com/RamblingCookieMonster/PowerShell/blob/master/Out-DataTable.ps1)
- [write-datatable.ps1](https://github.com/suntong/lang/blob/e7bd7a35690ec89cadee39d21ebb8d921854534d/lang/PowerShell/Examples/Db/Write-DataTable.ps1)
- [Invoke-SqlCmd2.ps1](https://github.com/falkheiland/CommonTools/blob/dfcd4c5fc3b8703a19f72291c69a7d1e4ff31b4e/CommonTools/Public/Invoke-Sqlcmd2.ps1)

Big thanks to Chad Miller who I think was the originator of most of these.

Next, I update the database to say that the library being worked on is started:

```SQL
Invoke-Sqlcmd2 -ServerInstance “SQLVM1” -Database “MigrationReporting” -Query "UPDATE LibraryLineage SET ValidationStarted='$((Get-Date).ToString("dd MMM yyyy hh:mm:ss"))' WHERE LibID=$libID" -erroraction Stop
```

I retrieve the main list details with Get-PnPList based on the url path (mostly because the name had some details that was more compled but you could use name too).

```PowerShell
$list = Get-PnPList -Identity $libID -erroraction Stop
$itemCount = $list.ItemCount
# Check list is hidden
if ($list.Hidden -eq $true) {
    $isHidden = 1
}
else {
    $isHidden = 0
}
```

With this, you see that I have a variable that I will use at the end to track all the right things are set. I had similar checks for minor versions being enabled and whether the search crawl was disabled.

The most painful part for performance was to get the ContentTypes details for the list.

```PowerShell
$listCTs = Get-PnPContentType -List $libID
```

I'm not entirely sure why this was quite so painful either but something I may dig further into the PnP code. I should add that this is the legacy PnP code as well because many of the other scripts are in there so this could be much more efficient now.

I looped through each loaded Content Type to check whether the ones I expected were there. On the first iteration, I checked it was the default value expected. Then I loaded the fields for the content type to check if the list field had been added and that the field order was correct.

```PowerShell
foreach($listCT in $listCTS) {

    # Check default content type set
    if ($firstValue -eq $true) {
        if ($listCT.Name -eq "DefaultDocumentCT") {    
            $defaultIsFirst = 1
        }
        $firstValue = $false
    }
    if ($listCT.Name -eq "DefaultDocumentCT") {
        $defaultCTExists = 1

        # Check related records added to content types
        $listCT.Context.Load($listCT.Fields)
        $listCT.Context.ExecuteQuery()
        $matchingFields = $listCT.Fields | Where-Object {$_.Title -eq "Related Records"}
        if ($matchingFields.Count -gt 0) {
            $defaultCTContainsRR = 1
        }

        $fieldLinks = Get-PnPProperty -ClientObject $listCT -Property "FieldLinks"
        $fieldOrderCorrect = 1
        if ($fieldLinks[0] -ne "FileLeafRef") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[1] -ne "Title") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[2] -ne "FieldOne") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[3] -ne "FieldTwo") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[4] -ne "FieldThree") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[5] -ne "FieldFour") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[6] -ne "_dlc_DocId") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[7] -ne "_dlc_DocIdUrl") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[8] -ne "_dlc_DocIdPersistId") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[9] -ne "SelectFilename") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[10] -ne "Modified") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[11] -ne "Modified_x0020_By") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[12] -ne "Created_x0020_By") { $fieldOrderCorrect = 0 }
        if ($fieldLinks[13] -ne "Created") { $fieldOrderCorrect = 0 }
        $defaultFieldOrderCorrect = $fieldOrderCorrect
        
    }
}
```

For the fields, I needed to ensure that the mandatory fields and default values were set:

```PowerShell
# Check fields set to correct required fields
$fields = Get-PnPField -List $list
$fieldOneValid = 0
$fieldTwoValid = 0
$fieldThreeValid = 0
$fieldFourValid = 0

foreach ($field in $fields) {
    if ($field.Title -eq "FieldOne") {
        if ($field.Required -eq $true -and $field.DefaultValue -eq "$libID") {
            $fieldOneValid = 1
        }
    }
    if ($field.Title -eq "FieldTwo") {
        if ($field.Required -eq $false -and $field.DefaultValue -eq "$libID") {
            $fieldTwoValid = 1
        }
    }
    if ($field.Title -eq "FieldThree") {
        if ($field.Required -eq $true -and $field.DefaultValue -eq "$8;#Confidential|cd929a3b-bdf0-4885-a40b-471c17bb63d8") {
            $fieldThreeValid = 1
        }
    }
    if ($field.Title -eq "FieldFour") {
        if ($field.Required -eq $true) {
            $fieldFourValid = 1
        }
    }
}
```

The last check was whether the main view was set up with the right fields for users.

```PowerShell
# Check views set
$updateView = Get-PnPView -List $list -Identity "All Documents" -Fields "DocIcon","LinkFilename","SampleDocumentType","Title","FieldOne","FieldTwo","FieldThree" -erroraction Stop
$viewValid = 1
if ($updateView.ViewFields[0] -ne "DocIcon") { $viewValid = 0 }
if ($updateView.ViewFields[1] -ne "LinkFilename") { $viewValid = 0 }
if ($updateView.ViewFields[2] -ne "SampleDocumentType") { $viewValid = 0 }
if ($updateView.ViewFields[3] -ne "Title") { $viewValid = 0 }
if ($updateView.ViewFields[4] -ne "FieldOne") { $viewValid = 0 }
if ($updateView.ViewFields[5] -ne "FieldTwo") { $viewValid = 0 }
if ($updateView.ViewFields[6] -ne "FieldThree") { $viewValid = 0 }
```

Each of the properties checking the values are then written into a database table for each library so it could be queried. This also formed the basis of the fix scripts that could see what was wrong and only check those records.

```PowerShell
$query = "INSERT INTO [dbo].[LibraryCheck] ([LibID],[ItemCount],[IsHidden],[IsMinorVersionsEnabled],[IsNoCrawl],[IsTitleSet],[DefaultCTExists]"
$query += ",[SecondCTExists],[ThirdCTExists],[DefaultCTIsFirst],[DefaultCTContainsRR],[SecondCTContainsRR],[ThirdCTContainsRR],[DefaultCTFieldOrderCorrect]"
$query += ",[SecondCTFieldOrderCorrect],[LinkCTFieldOrderCorrect],[MNumberValid],[PNumberValid],[ProtectiveMarkingValid],[DateReceivedValid],[DocumentStatusValid]"
$query += ",[AESCRDocTypeValid],[AESCRRestrictedReasonValid],[WCCSubjectValid],[ViewValid]) "
$query += "VALUES ($mNumber,$itemCount,$isHidden,$minorVersionsEnabled,$isNoCrawl,$titleSet,$defaultCTExists"
$query += ",$secondCTExists,$thirdCTExists,$defaultIsFirst,$defaultCTContainsRR,$secondCTContainsRR,$thirdCTContainsRR,$defaultFieldOrderCorrect"
$query += ",$secondFieldOrderCorrect,$thirdCTFieldOrderCorrect,$libIdValid,$fieldOneValid,$fieldTwoValid,$fieldThreeValid,$fieldFourValid,$viewValid)"

$query
Invoke-Sqlcmd2 -ServerInstance “VMWP-SPMIGSQL1” -Database “MigrationReporting” -Query $query
```

So I had a script that analysed each of my libraries well but the problem was how long it took. On average, I was seeing each library take 33 seconds which on its own was ok, but for 65k libraries was going to be a problem. Running on a single server would take 24.8 days just to get a list of what was wrong. Even running across 10 different servers, I was looking at 2.5 days. This was not ideal.

## A little investigations and refactoring
The first steps were to see what was taking so long. I stepped through the code and could see that the calls for Get-PnPContentType took 10-12 seconds quite often. Retrieving the list of fields was pretty slow too. I did a little testing to see if I could retrieve the fields using -Includes as well on the Get-PnPContentType call but it made the main call slower and didn't add any performance benefits.

My initial inclination was to rework the PowerShell to use direct CSOM calls to see if that would be faster. The logic was that I could just do what I needed to do for my code whereas the PnP calls may be doing a lot more.

Instead though, I started with something simpler (for me at least). When I was checking things, I would often use REST calls to check on details for a particular list which got me thinking that I could try these calls. PnP PowerShell has a lovely function called Invoke-PnPSPRestMethod that allows you to make REST calls. With these, I swapped out all the calls I was making with PnP functions with this. I moved most of them to the top of the script and was able to leave the majority of the rest of the code in place.

```PowerShell
$list = Invoke-PnPSPRestMethod -Method get -Url "/_api/web/GetList('/sites/TestSite/$libID')"
$listCTs = Invoke-PnPSPRestMethod -Method get -Url "/_api/web/GetList('/sites/TestSite/$libID')/ContentTypes"
$listFields = Invoke-PnPSPRestMethod -Method get -Url "/_api/web/GetList('/sites/TestSite/$libID')/Fields"
$allDocsView = Invoke-PnPSPRestMethod -Method get -Url "/_api/web/GetList('/sites/TestSite/$libID')/Views?`$filter=Title%20eq%20%27All%20Documents%27"
```

I needed to make some changes to the foreach loops but the SchemaXml field contained the fields for the ContentTypes so I could reduce the number of calls made.

```PowerShell
foreach($listCT in $listCTs.value) {
    $listCTSchema=""
    $listCTSchema  = [xml]$listCT.SchemaXml

```

To retrieve certain fields, I could make use of a little bit of XPath from that schema XML. Retrieving these details then no longer required any additional calls to the server.

```PowerShell
# Check related records added to content types
        $rr = $listCTSchema.SelectSingleNode("/ContentType/Fields/Field[@DisplayName='Related Records']")
        
        if ($rr -ne $null) {
            $defaultCTContainsRR = 1
        }

        $fieldLinks = $listCTSchema.SelectNodes("/ContentType/Fields/Field")
```

With these in place, the average time reduced from 33 seconds down to a little over 2 seconds. Running on a single server could be down in 1.5 days or just over 3.5 hours across 10 servers. Not bad at all. Now to see if updating the fix scripts will speed things up too!

Photo courtesy of [Rod Long](https://unsplash.com/@rodlong) via [Unsplash](https://unsplash.com)

$postsPath = "content/pages/posts"

$items = Get-ChildItem -Path $postsPath -Recurse -File

foreach($item in $items) {
    $slugs = $item.Name.Split('-')
    Write-Output "Processing $($item.Name)"
    if ($slugs.Count -gt 3) {
    
        $postYearPath = $postsPath & "/" & $slugs[0]
        $postYearPathExists = Test-Path -Path $postYearPath
        if ($postYearPathExists -eq $false) {
            New-Item -Path $postYearPath -ItemType directory
        }

        $postMonthPath = $postYearPath & "/" & $slugs[1]
        $postMonthPathExists = Test-Path -Path $postMonthPath
        if ($postMonthPathExists -eq $false) {
            New-Item -Path $postMonthPath -ItemType directory
        }

        $postDayPath = $postMonthPath & "/" & $slugs[2]
        $postDayPathExists = Test-Path -Path $postDayPath
        if ($postDayPathExists -eq $false) {
            New-Item -Path $postDayPath -ItemType directory
        }

        $itemPath = "$($item.Directory)/$($item.Name)"
        Write-Output "Source: $itemPath"
        $destinationName = $item.Name.Replace("$($slugs[0])-$($slugs[1])-$($slugs[2])-","")
        $destinationPath = "$($item.Directory)/$($slugs[0])/$($slugs[1])/$($slugs[2])/$destinationName"
        Write-Output "Destination: $destinationPath"
        Move-Item -Path $itemPath -Destination $destinationPath
    }
}


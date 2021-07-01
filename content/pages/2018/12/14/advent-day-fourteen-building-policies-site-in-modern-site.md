---
layout: post
title: An Advent series - Building a policies site in Modern SharePoint and Page Approval
date: '2018-12-14 06:00:00'
content_img_path: 'images/2018/12/book.jpeg'
comments: false
author: "Kevin McDonnell"
tags:
- SharePoint
- Digital Workplace

---

Modern SharePoint sites are taking hold and so people are starting to make real use of them, including the latest changes like Page Approvals.

I have worked on a few different Intranet/Digital Workplace projects now and in almost all of them, there has been the requirement to have a Policies site. Whether it was for the HR policies only or included all policies for the whole organisation, it needed to make it easy for staff to find the latest changes and not be hidden away. In many cases, there was also the requirement to have approvals for any changes to a policy. So how could this look on a Modern SharePoint site?

![Modern SharePoint Policies Site](/images/2018/12/ModernSharePointPoliciesSite.PNG)

I had a few requirements:
- It should be able to cope with Policies as documents and as pages
- There should be an approval process for changes to policies
- Policies should have metadata, initially Department and Role that the policy is relevant for
- You should be able to see the latest policy changes
- It should work on mobile devices

I started out with a standard Communications Site and then took a look to see which policies I could use. Thanks to the wonderful sharing nature of the internet, I have added the following:

- Project Management Policy - https://www.nationalgallery.org.uk/upload/pdf/Project_Management_Risk_Management.pdf
- IT Architecture Policies - https://ict.police.uk/national-strategic-ict-principles/
- Sales and Marketing Policy - https://www.infogovbasics.com/challenges/sales-marketing-customer-expereince/
- Security Policy - https://www.projectmanagementdocs.com/wp-content/uploads/2018/08/Security-Policy.docx
- Company Handbook - http://www.human-resource-solutions.co.uk/HR-Policy-Pages/HR-Policy-Manual/Document_Management_HR_Policy_Manual.html


Some of these I copied out in to pages and others I left as documents which were then displayed on a page using a File Viewer WebPart.

![Company Handbook](/images/2018/12/ModernSharePointCompanyHandbook.PNG)
![Sales Governance](/images/2018/12/ModernSharePointSalesGovernance.PNG)

For the list of policies, they are displayed as tiles in a list and grouped by the metadata such as by role. The content can be searched using the standard site search box and users can create their own views if required.

![Policies by role](/images/2018/12/ModernSharePointPoliciesByRole.PNG)

The latest changes are shown as tiles on the home page so staff can easily see the latest.

![Policies by role](/images/2018/12/ModernSharePointLatestChanges.PNG)

Finally, you can show these policies on other sites, such as the Human Resources site. Eagle eyed readers may notice that this is from the SharePoint Starter Kit - more on that in a minute.

![Policies on HR site](/images/2018/12/ModernSharePointCrossSitePolicies.PNG)


So is this all that is needed?

## Next steps

The lack of search box on the main part of the screen and the inability to show the policy metadata on the tiles reduces some of the benefits of the improved looks. It is also not possible to show a policy in multiple departments or roles in this way, even though it can be possible to mark a policy with multiple values.

What is better news is that all this can be changed. You can develop a custom webpart to show the policies in a single view that can be sliced and diced by the metadata and a search box added. This is something I will cover in a future blog post.

I would also like to submit this to the SharePoint Starter Kit but before I do, I would love to get some feedback as to the sort of extra requirements you have seen or requested before. Drop me a tweet with any thoughts.
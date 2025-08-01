---
layout: post
title: How to integrate GraphQL with Sitecore using JSS
description: Step by step instructions to integrate GraphQL with Sitecore using JSS
share-img: /assets/img/posts/sitecore/sitecore-jss.png
permalink: /how-to-integrate-graphql-with-sitecore-using-jss/
tags: [sitecore, graphql, jss]
comments: true
keywords: "sitecore graphql integration, sitecore jss, graphql with sitecore, sitecore tutorial, sitecore javascript services, graphql sitecore example, sitecore headless, sitecore data querying, sitecore development, install jss sitecore"
---

This blog contains step by step instructions on how you can integrate GraphQL with Sitecore. Also how you can start using GraphQL for querying the sitecore data.

## Prerequisites:

1. Working setup of Sitecore
2. Sitecore certified developers account to download JSS package

Once you have above prerequisites you can start following below steps to install JSS and GraphQL.

### Download JSS package

Downloading the JSS package requires a certified developer account. You can download the JSS package from [sitecore downloads page](https://dev.sitecore.net/Downloads/Sitecore_JavaScript_Services.aspx){:target="_blank"}.

Use the below table to find the right JSS package for your sitecore version. You can also visit [this link](https://kb.sitecore.net/articles/541788){:target="_blank"} to find the latest version compatibility table.

![Crepe](/assets/img/posts/sitecore/sitecore-jss-version-compatibility-table.png)


### Install JSS package using Installation Wizard

Open sitecore in your browser and goto Desktop -> Development Tools -> Installation Wizard

![Crepe](/assets/img/posts/sitecore/sitecore-installation-wizard.png)

Upload the downloaded JSS package and start the installation process. Once the installation is finished, make sure that you are still able to open sitecore in your browser without any problem. If you face any issue, fix them first before moving on to the next step.

In my case I faced issue with one of the dependencies ```Newtonsoft.Json```. I solved it by updating the version of this dependency.

```xml
<dependentAssembly>
    <assemblyIdentity name="Newtonsoft.Json" publicKeyToken="30ad4fe6b2a6aeed" />
    <bindingRedirect oldVersion="0.0.0.0-11.0.0.0" newVersion="10.0.0.0" />
</dependentAssembly>
```

<br>
### Open GraphQL

Once the JSS package is installed successfully, login to your sitecore instance and open http://sitecore.local/sitecore/api/graph/items/master/ui 

You should be able to see below page.

![Crepe](/assets/img/posts/sitecore/sitecore-graphql-page.png)

You can try and execute the below query and see that everything works as expected.

```graphql
{
  item(path: "/sitecore") {
    id
    name
    children {
      name
    }
  }
}
```

<br>
### Add API Key to Sitecore

The next step is to add an API Key to query GraphQL using API instead of UI. The API Key needs to be added in core db. To add the key goto ```/sitecore/system/Settings/Services/API Keys```. Right click on the API Keys folder and insert a new API Key.

![Crepe](/assets/img/posts/sitecore/sitecore-adding-api-key.png)

<br>
### Enable GraphQL authentication using API Key

1. Open AppConfig\Sitecore\Services.GraphQL\Sitecore.Services.GraphQL.config
2. In security section make the following changes

```xml
<requireAuthentication>false</requireAuthentication>
<requireApiKey>true</requireApiKey>
```


<br>
### Query sitecore content using Postman

 Open postman to query sitecore data using graphql api

```
 API: http://sitecore.local/sitecore/api/graph/items/master
 METHOD: POST
 Query Param: sc_apikey: <Your api key>
 ```

 ![Crepe](/assets/img/posts/sitecore/sitecore-postman-query-param.png)

 ![Crepe](/assets/img/posts/sitecore/sitecore-postman-query.png)


That's all! You are all set to start using GraphQL to query your data.
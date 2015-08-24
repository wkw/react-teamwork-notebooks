Teamwork.com Notebooks Utility (React.js)
=========================================

Quick API access to Teamwork.com's notebooks from a Browser bookmarklet.


  > **DISCLAIMER: This project is NOT affiliated with teamwork.com. It is only a personal project which uses their api.**


Motivation
----------

  Our team stores client-related data in Teamwork notebooks which we end up accessing dozens of times every day. It was laborious to load teamwork.com, locate a project, click over to Notebooks, open the notebook then find the credentials we needed.
  
  And I needed an interesting project to explore [React](http://facebook.github.io/react/).
  
  This React App uses the [Teamwork.com API](http://developer.teamwork.com/) to incrementally locate projects by name while you type. At each stage of results, you can click a link to view the found notebooks. When the user input resolves to a single project, the notebook contents are automatically displayed. An additional shortcut is available when input narrows the results to a single Project: typing `>` will open the Project in a new Browser tab.

  There are two modes of usage for the App. The first is standalone, just load it in a browser window and start typing. The second mode is as a bookmarklet which will overlay a frame on any web page so you avoid changing tabs/windows. Just locate the info you need while viewing some other page. The bookmarklet is autmatically generated for you and available to drag to your browser Bookmarks Bar. When loading the app without a provided or stored API key, you will be prompted to enter your Teamwork.com API key, at this point your customized bookmark is presented.
  
  The Bookmarklet mode overlay will not work when viewing secure pages, unless served over https. [need to confirm this...]



Teamwork API Key handling during development
--------------------------------------------

You can avoid entering your API key by accessing the app with `host:/example.io/dist/?key=XYZ`. If the app is hosted on another server, your key will most likely end up in server logs. 

When running locally with browserify, add a json file named `TW-API-KEY.json` to the project root.
The format is:

```

    {key: 'YOUR-KEY'}
  
```

To test the behavior w/out having a key provided to the script (which triggers an input field widget, and sets up the Bookmarklet view)
set your key to `null` or rename the key file.


Building the Project
--------------------

__Install the dependencies:__

`npm install`

__Development mode with browserSync:__

`gulp watch`



---------------------------------------------------------------------


#### Dev Stack based on [React Starterify](https://github.com/Granze/react-starterify), An opinionated React JS application skeleton.



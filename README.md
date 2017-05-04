<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavascriptClassCreator (JSCC)](#javascriptclasscreator-jscc)
- [Introduction](#introduction)
- [UML Diagrams](#uml-diagrams)
- [Compressing Code](#compressing-code)
- [Structure of ___JSCC___ projects](#structure-of-jscc-projects)
  - [JSCC Projects](#jscc-projects)
  - [HTML Files - HTML Templates](#html-files---html-templates)
  - [Pages (Parent: FileHTML)](#pages-parent-filehtml)
- [Status of software](#status-of-software)
  - [Release Status](#release-status)
  - [ToDo](#todo)
- [Acknowledgement](#acknowledgement)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavascriptClassCreator (JSCC)

An Extensible Software Environment for Improvement and Adaptation (ESEIA) is a web-based tool, that allows novice developers to tweak software without digging very deep into libraries and code of the project.

The objectiv of an ESEIA approach is, that large groups of people are able to modify a software according to their needs.
An ESEIA tool like ___JavascriptClassCreator___ exports the code in a certain programming languages or syntax (here HTML and Javascript), so that also deep alterations are still possible and these improvement can be added to the templates for code generation. The structure alterations of software done be programmers with less time or knowledge in the programming language, can be exported with the new templates. So structural rough alterations and improvements in the logic can be exported with the improvement ESEIA templates. This concept is well-known for Content Management Systema like Typo3, Joomla at. al., where LAYOUT and CONTENT are separated working levels. On technical level CSS does that for HTML layout. JavascriptClassCreator is a ESEIA prototype to extend this principle on the software development level, placed in between UML and grass roots programming of functions, classes, data structures, ...

The vision for certain OpenSource projects is, that a software release *X1* has a ESEIA tool as well, that allow quick and simple alterations *X1* into *X2*.

**(Medium Skill) Example 1:** A Web-App *X1* is regarded useful for another area of domain.  
* a pages are added to the WebApp with a few checkboxes
* Wording is changes on pages,
* Buttons are added or
* simple the data structure of the submitted records to the server
are altered.

**(Low Skill) Example 2:** If the software *Y1* can be configured by a config file, the ESEIA tool can be just a web-based interface, that allows to exports the config file and has an menu driven graphical user interface (GUI) to create JSON file (e.g. create a Software Menu and the Menu items a mapper to certain call of the underlying *Y1*. Publishing the software with a new config file support developer in rapid alterations of new releases without diving too deep into the code.  

## Introduction
Web-based Javascript Class Creator that
* allows Object Oriented JS Classes, which is not concept (i.e. OOP) JavaScript was originally designed for.
* supporting [Inheritage](http://phrogz.net/js/classes/OOPinJS2.html) of Classes by using [functions as conctructors](https://www.phpied.com/3-ways-to-define-a-javascript-class/) for classes in ways:
    1) **Defining Methods internally:** allows dynamic replacement of methods during runtime for single instances, but is more memory and time consuming, because internal methods are recreated every time you create a new object of the class.
    2) **Methods added to the prototype:** defines the methods for a class once for all created instances/objects. This is the recommended way to create Javascript classes, the more flexible approach for dynamic assignment for methods is rarely used.
* stores the Classes in Browser's LocalStorage and
* exports the Classes in JSON Files
The code is stored in the docs/ folder, because the settings of the repository for gh-pages are defined to use the index.html file in /docs to be launched when you call the JavascriptClassCreator with the URL
* https://niebert.github.com/JavascriptClassCreator
All the repositories in "niebert" are mainly designed for rapid prototyping, exploring features or as demos for a final sound implementation.

## UML Diagrams ##
JavascriptClassCreator facilitates the export of UML-diagrams with the libraries of the OpenSource [JointJS](https://github.com/clientIO/joint) repository:
* **Attributes of Classes:** UML editing of Attrubutes of Classes
* **Methods of Classes:** UML editing of Attrubutes of Classes
* **Inheritance from Classes:** ___JSCC___ allows to edit the SuperClass of Classes, visualized in UML-diagram.
* **Associations** between objects (Associations can be created and destroy during runtime)
* **Aggregation** of child instances/objects by a parent instance/object
* **Interfaces** allows inheritance the method headers that determine the call of methods. This is implemented in the JavascriptClassCreator (JSCC), but not in the Javascript itsself. When you determine a class of the type *Interface*, that ___JSCC___ checks if all method headers (i.e. the way a method will be called with parameters) are properly defined and existing. If not, ___JSCC___ will create the method header for you without creating a link for inheritance in Javascript. Attributes of the interface class are available in class as well.
* **Abstract** In contrast to an Interface an abstract class has real defined bodies of methods that can be inherited. For those methods that do not contain a body (i.e. MethodCode is empty) the method code is handle like methods defined in an interface. This means that ___JSCC___ creates method header for you by inheritance from the abstract class, that will overwritten/defined in the child class.

* **IDE vs ESEIA:** An Integrated Development Enviroment is very rich of features. The art of ESEIA development is to eliminate features of IDE (cover feature) and tailor the remaining features for the area of application of the software release. On the other end - in contrast to a pure front-end for software the ESEIA concept allows to *touch certain areas of the code* on the grass roots level of programming. The existing code elements guide programmers with creating new versions or branches by templating the syntactic workflow for the previous versions. UML export of code provides insight in the software design. High levels of documentation for comprehension of the semantics of code are augemented with code compressors, when the exported code is executed by an interpreter (and not compiled).

## Compressing Code ##
You might know from other implementations of JavaScript repositories (e.g. [JQuery](), MathJAX), that there are existing two versions of the JavaScript implementation.
1) the minimise/compressed code for higher performance in web browsers and NodeJS,
2) documented code for further software development and comprehension of the previous development by new members of a team

UglifyJS is used for compressing the code and generate higher performance for the web-applications. The Developer [Mihai Bazon](http://lisperator.net/) created UglifyJS, that has even the option to parse Javascript Code, which is necessary to create equivalent minified the Javascript code (see [Source Code of UglifyJS](https://github.com/mishoo/UglifyJS2))). ___JSCC___ uses  mainly the wrapper for UglifyJS is written [Dan Wolff](http://danwolff.se/). His UglifyJS-Online example is called in a seperate window to minify/compress the exported Javascript code for generated JS Classes. The original version of his [UglifyJS-Wrapper](https://skalman.github.io/UglifyJS-online/) can be accessed and forked at [GitHub](https://github.com/Skalman/UglifyJS-online).

Future application of UglifyJS will allow cross compilation of generation of generic XML-Code for code generation that is highly independent of a specific programming language (see [XML2Code]https://github.com/niebert/XML2Code) as a proposal). UglifyJS can take Javascript code as input and create an [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (AST). When the [AST in UglifyJS](http://lisperator.net/uglifyjs/ast) is generated, you can send a [AST walker](http://lisperator.net/uglifyjs/walk) over all nodes of the abstract syntax tree and perform a [Cross Compilation](https://en.wikipedia.org/wiki/Cross_compiler) from Javascript for example to PHP. For the code compressor in UglifyJS the AST is e.g. used to replace <tt>var vMyLongVariable = 0</tt> by <tt>var v=0</tt>. The walker for the code compressor reduces (among other tasks) the length of variable name. This makes the code less readable for developers, but creates less loading for web browsers. For ___JSCC___ the removal of comments has the highest impact on the size of the code.

## Structure of ___JSCC___ projects

### ___JSCC___ Projects
**(JSCC)** is the main JSON file, that contains the ___JSCC___ project of the software development

**Example:** The web-based software *DisApp* is used in the online version as project of JSCC. Furthermore *DisApp* is used as example for the following sections too.

### HTML Files - HTML Templates

**(FileList) Parent: (JSCC)** is an *JS Object* of all HTML-files, used in the project. The key to access the JSON definition of the file is just the filename itself.

**Remark:** Using a filename as a key has the advantage that the you do not have to handle a the mapping of the filename to the key of the hash **FileList**. But approach has the disadvantage, that you cannot access the appropriate object in a JSON tree by the dot-notation of an tree.
* ___vJSON_JS["FileList"]___ is equivalent to ___vJSON_JS.FileList___ but
* ___vJSON_JS["FileList"]["app.html"]___ or ___vJSON_JS.FileList["app.html"]___  is the only way to address the JSON object of the file ___app.html___ correctly. ___vJSON_JS.FileList.app.html___ addresses a ___html___-object as suboject of the ___app___-object, and this object does not exist in the JSON tree in general.

**Example:** The web-based software *DisApp* contains two HTML-files:
* **<tt>index.html</tt>** for login to the server the JSON element can be access by ___JSCC.FileList["index.html"]___ ).
* **<tt>app.html</tt>** is the window that will be opened by <tt>index.html</tt>, which contains the main interactive elements of *DisApp*,  (e.g. ___JSCC.FileList["app.html"]___).
* **<tt>submit.html</tt>** is the window that will be opened by <tt>app.html</tt>, which will be used to submit data to server/backend of *DisApp*,  (e.g. ___JSCC.FileList["submit.html"]___).

In traditional software development HTML pages can be regarded as windows with a certain content, that are opened and closed within the software. The HTML file defines the Graphical User Interface (GUI) of the app in these windows.


**(Templates) Parent: (JSCC)** is an *JS Object* of all Templates, used for the project. The templates can be edited and exported form JSCC to you own harddrive for sharing these templates with others. Templates are not stored in the ___project.json___ file because a developer wants to replace the templates for Javascript code generation and for the exported HTML-files by templates that match with the cooperate identity of an institution or agency. So if institutions or developing teams collaborate for creating or maintaining a certain WebApp then the share the  ___project.json___ and keep their templates.

**Example:** The web-based software *DisApp* contains two HTML-files:
* **<tt>Login</tt>** is the file <tt>index.html</tt> for login screens to the server and so the JSON element can be access by <tt>JSCC.TemplateHTML["Login"]</tt> ).
* **<tt>Main</tt>** is the window with <tt>app.html</tt> that will be opened by <tt>index.html</tt>.

Both files use the same HTML template for all main HTML file used for *DisApp*  (e.g. <tt>JSCC.vDOM_TPL["tMainHTML"]</tt>). The export of the main template is stored in ___tpl/Default.html___. Alter this file and load that into JSCC to create your own look and feel for the WebApp. If you generate new HTML files in ___JSCC___ and add this file to the ___project.json___, then this new file will be generated with the same basic template too. E.g. a new HTML page <tt>submit.html</tt> will share the same look and feel of <tt>app.html</tt> and  <tt>index.html</tt>, because they share the same HTML template.


For this demo of JSCC the following main template is based on the following themes and icons:
* OS-Inspired jQuery Mobile theme by Tait Brown. Resources at [GitHub page](https://github.com/taitems/iOS-Inspired-jQuery-Mobile-Theme).
* iOS style Icons by Joseph Wain at [http://www.glyphish.com](http://www.glyphish.com). Licensed under the Creative Commons Attribution 3.0 United States License.

#### Rationals for template driven development
In traditional software development HTML pages can be regarded as windows with a certain content, that are opened up and closed within the software. The HTML page defines the Graphical User Interface (GUI) of these windows.

The classes in the project define the behaviour of the WebApp, the methods of the Javascript classes are called from GUI elements.

When we consider the object oriented programming concept we have classes in instances of the classes (objects). Similar to this concept we create HTML files as templates, that contain certain markers, that are replaced by user-defined content.

#### Markers and identifiers for Replace Operation in Files
The markers three preceding underscores before and after the identifier. An identifier itself consists of uppercase characters only with 3 underscores before and after the uppercase name of the identifier. Only uppercase characters and single separating underscores are allowed as identifiers. An example of a marker will look like thislook like this:

**Examples Marker:**  The marker

      ___MYMARKER___  or ___MY_MARKER___

in the template for an identifier with the name ___MYMARKER___ or ___MY_MARKER___ that will be replaced by a defined content for a specific instance of the template. E.g.

     ___PAGE_ID___

will be replaced by a unique ID of the page, e.g. ___page12___ for the 12th generated page of one template. The number will be incremented after
any new page generation of a certain HTML template (PageType). Similar to this approach the marker

      ___PAGE_TITLE___

will be replaced by the title of the HTML page. In general markers that are replaced by content from a hash (Object), are stored in the project JSON file ___vJSON_JS___ with the ID in uppercase characters (e.g. PAGE_TITLE) and the definition of page title.

      ___"PAGE_TITLE": "My Title of the Page",___

The notation with  3 underscores before an after the uppercase identifier is used, because it creates less conflict with other programming languages and the programming infrastructure of the JavaScriptClassCreator can be extended to other languages as well.

### Pages (Parent: FileHTML)
Pages are sections in HTML files that are shown separately with JQuery in the WebApp. In general the user will perceive switching from page to an other page like following from one HTML page to an other HTML page. From the programming site we have to distinguish ___pages___ and ___html-files___ because the browser will not leave the HTML-page, when an other pages is displayed. For ___pages___ the previous page is hidden and the new page is shown by application of ___JQuery___. Pages must have a unique ID ___PAGE_ID___, so that single pages can be addressed by JQuery via ___hide()___ and ___show()___.

For pages the standard markers are
* element ___HEADER_BUTTON1___ first button of the header of a page (usually left button)
* element ___HEADER_BUTTON2___ second button of the header of a page (usually right button)
Header buttons can just link to another page (e.g. ___Show Page: home___)

### Elements on Page (Parent: Page)
A page contains elements. These elements could be a
* HTML select box,
* a checkbox,
* input box for text,
* a password to login to the backend,
* a text or
* larger section of HTML, that are used on multiple pages.
These elements with a unique ID (e.g. ___HTML_TITLE___) are replaced in all page contents of all HTML files. This leads to the fact, that definition of DOM elements in layout, wording and event handling can be defined accross HTML files of the web app.

Also language dependencies for header buttons can be handle by ___Elements___, because the elements are globally replaced in the HTML page.


### FileHTML
A FileHTML (e.g. ___app.html___ or ___login.html___) is generated from a template (e.g. ___DefaultTPLHTML___). In a HTML file their are two main identifiers, that are replaced by a specific page content.
* the identifier ___LIBRARIES___ will be replaced by all imported Javascript libraries and JSON databases.
* the identifier ___PAGES___ will be replaced by all defined pages, that are used in the HTML file. For all HTML-files, pages can be defined separately. HTML files can exchange actions settings via the parameters of the URL, starting with a "?". Main parameters are:
* the selected database (e.g. ___database=mydata.db___)
* the action ID (e.g. ___action=dothis___)
* FileHTML with the ID ___index.html___ loads a file ___tpl/index.html___ replaces the markers and the file should be stored in the downloaded subfolder ___/app_LSAC/___ as ___/app_LSAC/index.html___. The folder ___/app_LSAC/___ can be retrieved if you download the repository of ___JavaScriptClassCreator___ from GitHub.

## Folders of software
With the following enumeration the purpose of the folders is explained. JSCC-folders are necessary for the JavascriptClassCreator. ___JSCC___ uses serveral other OpenSource projects mentioned in the section [Acknowledgements](#acknowledgement). If you want to replace the libraries with new versions of the OpenSource software it is much easier to replace that, when the versions are kept in separate folders. The used OpenSource packages are not updated automatically, so that ___JSCC___ as a whole could fail all of a sudden, due to unresolved dependencies.
1. JSCC-folder ___/ace___ contains the source of the ACE code editor used in iFrames for JavascriptClassCreator (JSCC)
2. WebApp-folder ___/app_LSAC___ is the directory in which you can store the generate sources for a specific WebApp. ___LSAC___ is an abbreviation for ***Local Storage and App Cache***.
3. JSCC-folder ___/css___ contains the Stype Sheets for JavascriptClassCreator (JSCC)
4. folder ___/exporter4code___ is a template driven code generator that is pure HTML/JS and independent of a specific syntax of an programming languages (not necessary for JSCC)
5. folder ___/java2javascipt___ allows the import of Java-Classes into JSCC, it parses attributes and method headers of the Java Class (not necessary for JSCC)
6. folder ___/javascipt2htmlcreator___ contains older framework for WebApps based on frames (not necessary for JSCC)
7. JSCC-folder ___/jquery___ contains the JQuery libraries and images
8. JSCC-folder ___/js___ contains the Javascript libraries for JSCC
9. JSCC-folder ___/prog___ contains the JSON files for the programming project
10. JSCC-folder ___/srv___ contains the HTML files that emulate and server and the server response to a client request
11. JSCC-folder ___/uglify___ contain the code compressor.
12. JSCC-folder ___/uml___ contains the UML diagram generation, called from JSCC based on JointJS.

## Status of Software
### Release Status
Software in currently in Beta-Phase. It is a proof of concept.
Refactoring of JavascriptClassCreator code in an object-oriented style

### Programming Languages
JavascriptClassCreator (JSCC) is currently designed to develop software for Javascript. Even if it is not a perfect solutions for this web-based approach Javascript is regarded as sink for programming code. By using the parser UglifyJS, Javascript code will be parsed and crosscompile in other programming languages (e.g. PHP, C++, Java,... ). Source code optimizations can be performed in the exported programming language.

## Internal Load Chain for Project and Templates
If you start the [JavascriptClassCreator JSCC](http://niebert.github.io/JavascriptClassCreator/index.html)  with ___docs/index.html___ in your browser then JSCC loads the following definitions:
* ***Project Definitions*** for you programming project, that define all Javascript Classes and HTML files for your WebAppm
* ***Code Generation Templates***, that determines the code output of Javascript Classes and HTML pages.
For both definitions there is a load chain, that assigns an order the loading the content of these definitions.
1. ***Load Project and Templates from Local Storage***: These definitions are available if the user has stored his settings by pressing ___Save Local Storage___ button in ___JSCC___.
2. ***Load Project and Templates from ___vDatabase___***:  if users of ___JSCC___ never stored the alterations of the code in ___Local Storage___ of the browser. Then the predefined databases in the hash ___vDatabase___  are used. Accessing a specific JSON database works as usual by ___vDatabase["myjson"]___. If these databases are changed, it is necessary to store the alterations in local storage. Now the local storages does contain a JSON file and new reload in the browser will load data from the local storage.

## Client-Server Communication of App
### Collected Data in LocalStorage
The collected data of the App is stored in the LocalStorage of the browser by default.
The application of LocalStorage from the browser does not require any connectivity to the Server. This assures that data collection can be done if the mobile device is offline.

### Cross-site scripting - Security Risk
Cross site scripting is a security risk for users, so the WebApp must be stored on the webserver, where the server backend is installed, e.g.:
* start app via
     https://www.example.com/myapp/index.html
* submit data to server e.g. via PHP-script
     https://www.example.com/backend/myapp/submit.php

### Remote Server and Form Submit
If it is necessary to submit the collected data to a remote server it is necessary to use the FORM tag in HTML. The following workflow can be applied:
* start app for login
     https://www.example.com/myapp/index.html
* a sucessful login creates a session ID ___sid___ for the user ___uid___ that is valid for a certain period of time. Then the app is started with those parameters
     https://www.example.com/myapp/app.html?uid=...&sid=...&...
* The client collects data offine and stores the data in LocalStorage of the browser. All records get a primary key ___pkey___ (e.g. ___pkey=637___). If a certain record was not submitted to the server the client assigns the submitted attribute in the offline database as false (e.g. ___record with pkey=637 submitted=false____). The in the HTML-page of ___app.html___ the client submits data to the remote server via PHP-script
* Through a form in the HTML-page of ___app.html___ the client submits data to the remote server via PHP-script
     https://www.remote.srv/backend/myapp/submit.php?uid=...&sid=...&pkey=637&...&
* The import step is the backward channel from the remote server to https://www.remote.srv to the clients url. HTML-file can access the query string of the call of the HTML file. The server calls the ___app.html___ as callback e.g. with the following parameters:
     https://www.example.com/myapp/app.html?uid=...&pkey=637&action=submitted
So the client knows that the record was sucessfully submitted. This leads to alteration of the submitted flag in the LocalStorage of the browser (e.g. ___record with pkey=637 submitted=true____).

### Template Driven Code Generation
JSCC is HTML/Javascript application and the templates of ___JSCC___ are stored in textareas or input elements of HTML pages itsself. All template elements have a unique ID in the HTML-tag and the function ___getValueDOM("tTplHTML")___ reads e.g. the content of the input element. Javascript Code is generated on the ___Code___ of ___JSCC___ and the underlying HTML pages for the App are generated on the ___HTML___ tab of JSCC.

#### View Code Templates
You can view the content elements used for code generation by scrolling down the ___JSCC___ page and press on the blue Button ___Code Templates___. You can play around with these templates and explore how these templates affect code generation for Classes and HTML file changes these value without any concerns and check impact on code generation. Just by reload of the JSCC-HTML page [docs/index.html](http://niebert.github.io/JavascriptClassCreator/index.html) the old settings of the code templates are restored.

#### Edit Code Templates and Export
Scroll down the ___JSCC___ page in  [docs/index.html](http://niebert.github.io/JavascriptClassCreator/index.html)  and press on the blue Button ___Code Templates___. Now you can edit or replace the content elements that determine the code generation of classes.
* If you press ___Save Local Storage___ in ___JSCC___ and the template setting is stored in your own browser (not alteration of templates are submitted to a server). Next reload with the same browser will restore you settings.
* If you want to share your templates with others download your setting by ___Export Templates___ with the downloaded template file ___code_templates.json___ you can send the file to other developers and the import the templates in ___Code___ tab of ___JSCC___.
* You can download the ___JSCC___ infrastructure on you own computer and then replace the template file ___code_templates.js___ in folder ___docs/tpl___. The difference between the extension ___.js___ and ___.json___ is a simple prefix in front of the JSON file, that converts the JSON-file into JavaScript-file. The prefix defines, where the JSON content is stored.
* JSON: ___{"color":"blue","setting" : "is ok", "header" : "this is my header"}___
* JS-File with global Variable: ___vMyJSON = {"color":"blue","setting" : "is ok", "header" : "this is my header"}___
* JS-File with Hash: ___vDatabase["myjson"] = {"color":"blue","setting" : "is ok", "header" : "this is my header"}___
With this approach you can access the JSON file in the hash ___vDatabase___ with the ID ___myjson___. This has the advantage, that you can load and access several JSON file through the hash ___vDatabase___  without contamination the root name space of the App/HTML file to much.

### ToDo
* UglifyJS can parse the syntactic structure of Javascript code. Parsing Javascript code and export to other languages (Python, C, Java, PHP, ...). UglifyJS can be used for to crosscompilation of Javascript Classes in other programming languages. Use the tree walker over the [AST Abstract Syntax Tree](http://lisperator.net/uglifyjs/ast).
* implement createNewPageType() in jsondb.js  which adds a new PageType definition
* Integrate UglifyJS for parsing Javascript Code of Classes for exporting to Code2XML with AST and TreeWalker
* BUG: createButtonSelect() is not implemented, Buttons need an empty first entry
* BUG: When PageType is selected Buttons are not set and Save does not read the settings of Buttons
* BUG: Update Method Selector
* BUG: Generated Header Button (e.g. CANCEL) is not generated in tButtonList
* BUG: ButtonTitle is NOT set for init and for selecting another Header Button
* MISSING IMPLEMENTATION: getPageIDArr4File(pFile);
* MISSING IMPLEMENTATION: getDefaultPageHash(pID);
* MISSING INTEGRATION: showClass(),showAttributes(),showMethods
* IMPROVE: Write Classname in Header of Attributes and Methods in blue color
* BUG: AttribTypeSelect is not working
* BUG: Updating change in Form by
* IMPROVE: add blank selection option to DB selector
* IMPROVE: import JSON Classes in Code Generator
* IMPROVE: Aggregate all libs into one file and send after aggregation to the code compressor, that improves the percentage of compression a bit (low priority, because aggregation of compressed files into a single has a higher impact on loading time than the compression of the aggregated single file of all classes)


## Acknowledgement
Special thanks to the following individual developers and teams of OpenSource JavaScript projects:
* Developer [Mihai Bazon](http://lisperator.net/) create UglifyJS, a great tool to handle and parse Javascript Code and minify the Javascript code (see [Source Code of UglifyJS](https://github.com/mishoo/UglifyJS2)).
* The wrapper for UglifyJS is written [Dan Wolff](http://danwolff.se/). His UglifyJS-Online example is used to minify/compress the exported Javascript code of generated JS Classes (For Online Example of the [UglifyJS-Wrapper](https://skalman.github.io/UglifyJS-online/) see source code on https://github.com/Skalman/UglifyJS-online for the Online-Version of the Wrapper.
* Developers of ACE Code Editor https://ace.c9.io (Javascript Editing uses the Editor in iFrames)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js) Developer Eli Grey provided the ___FileSaver.js___ that is used to store created ___JSCC___ files to the local filesystem. ___JSCC___ uses the same mechanism of browsers, that allows a ___Save as...___ in the context menu of a web pages or image. So not uncontrolled write access to your file system is implemented, because users have to select the locations in which the user whats to store the file (e.g. JSON, Javascript or HTML).
* [JointJS](https://github.com/clientIO/joint) JointJS is a JavaScript diagramming library. It can be used to create either static diagrams. JointJS is used in this project to create UML-diagrams, that are interactive diagramming in conjunction and application builder in Javascript.
* [Inheritage for JavaScript with protoypes](http://phrogz.net/js/classes/OOPinJS2.html) by Gavin Kistner
* [3 ways to define a JavaScript class](https://www.phpied.com/3-ways-to-define-a-javascript-class/) by Stoyan Stefanov
* [JQuery](https://jqueryui.com) is used for the theme and standard operations in the Document Object Model (DOM) of HTML-pages. The [JQuery-Themeroller](https://jqueryui.com/themeroller/) was used to create a JQuery theme for JSCC.
* OS-Inspired jQuery Mobile theme by Tait Brown. Resources at [GitHub page](https://github.com/taitems/iOS-Inspired-jQuery-Mobile-Theme).
* iOS style Icons by Joseph Wain at glyphish.com. Licensed under the Creative Commons Attribution 3.0 United States License.

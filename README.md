# JavascriptClassCreator (JSCC)

An Extensible Software Environment for Improvement and Adaptation (ESEIA) is a web-based tool, that allows to tweak software without digging very deep into libraries and code.

The objectiv of a ESEIA approach is, that large group of people is able to modify a software.
An ESEIA tool like JavascriptClassCreator exports the code in a certain syntax (here HTML and Javascript), so that also deep alterations are still possible and these improvement can be added to the templates for code generation. The structure alterations of software done be programmers with less time or knowledge in the programming language, can be exported with the new templates. So structural rough alterations and improvements in the logic can be exported with the improvement ESEIA templates. This concept is well-known for Content Management System like Typo3, Joomla at. al., where LAYOUT and CONTENT are separated working levels. On technical level CSS does that for HTML layout. JavascriptClassCreator is a ESEIA prototype to extend this principle on the software development level, placed in between UML and grass roots programming of functions, classes, data structures, ...

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
* **Inheritance from Classes:** JSCC allows to edit the SuperClass of Classes, visualized in UML-diagram.
* **Associations** between objects (Associations can be created and destroy during runtime)
* **Aggregation** of child instances/objects by a parent instance/object
* **Interfaces** allows inheritance the method headers that determine the call of methods. This is implemented in the JavascriptClassCreator (JSCC), but not in the Javascript itsself. When you determine a class of the type *Interface*, that JSCC checks if all method headers (i.e. the way a method will be called with parameters) are properly defined and existing. If not, JSCC will create the method header for you without creating a link for inheritance in Javascript. Attributes of the interface class are available in class as well.
* **Abstract** In contrast to an Interface an abstract class has real defined bodies of methods that can be inherited. For those methods that do not contain a body (i.e. MethodCode is empty) the method code is handle like methods defined in an interface. This means that JSCC creates method header for you by inheritance from the abstract class, that will overwritten/defined in the child class.

* **IDE vs ESEIA:** An Integrated Development Enviroment is very rich of features. The art of ESEIA development is to eliminate features of IDE (cover feature) and tailor the remaining features for the area of application of the software release. On the other end - in contrast to a pure front-end for software the ESEIA concept allows to *touch certain areas of the code* on the grass roots level of programming. The existing code elements guide programmers with creating new versions or branches by templating the syntactic workflow for the previous versions. UML export of code provides insight in the software design. High levels of documentation for comprehension of the semantics of code are augemented with code compressors, when the exported code is executed by an interpreter (and not compiled).

## Compressing Code ##
You might know from other implementations of JavaScript repositories (e.g. [JQuery](), MathJAX), that there are existing two versions of the JavaScript implementation.
1) the minimise/compressed code for higher performance in web browsers and NodeJS,
2) documented code for further software development and comprehension of the previous development by new members of a team

UglifyJS is used for compressing the code and generate higher performance for the web-applications. The Developer [Mihai Bazon](http://lisperator.net/) created UglifyJS, that has even the option to parse Javascript Code, which is necessary to create equivalent minified the Javascript code (see [Source Code of UglifyJS](https://github.com/mishoo/UglifyJS2))). JSCC uses  mainly the wrapper for UglifyJS is written [Dan Wolff](http://danwolff.se/). His UglifyJS-Online example is called in a seperate window to minify/compress the exported Javascript code for generated JS Classes. The original version of his [UglifyJS-Wrapper](https://skalman.github.io/UglifyJS-online/) can be accessed and forked at [GitHub](https://github.com/Skalman/UglifyJS-online).

Future application of UglifyJS will allow cross compilation of generation of generic XML-Code for code generation that is highly independent of a specific programming language (see [XML2Code]https://github.com/niebert/XML2Code) as a proposal). UglifyJS can take Javascript code as input and create an [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (AST). When the [AST in UglifyJS](http://lisperator.net/uglifyjs/ast) is generated, you can send a [AST walker](http://lisperator.net/uglifyjs/walk) over all nodes of the abstract syntax tree and perform a [Cross Compilation](https://en.wikipedia.org/wiki/Cross_compiler) from Javascript for example to PHP. For the code compressor in UglifyJS the AST is e.g. used to replace <tt>var vMyLongVariable = 0</tt> by <tt>var v=0</tt>. The walker for the code compressor reduces (among other tasks) the length of variable name. This makes the code less readable for developers, but creates less loading for web browsers. For JSCC the removal of comments has the highest impact on the size of the code.

## Structure of JSCC projects

### JSCC Projects
**(JSCC)** is the main JSON file, that contains the JSCC project of the software development

    **Example:** The web-based software *DisApp* is used in the online version as project of JSCC. Furthermore *DisApp* is used as example for the following sections too.

### HTML Files - HTML Templates

**(ListHTML) Parent: (JSCC)** is an *JS Object* of all HTML-files, used in the project.

    **Example:** The web-based software *DisApp* contains two HTML-files:
    * **<tt>index.html</tt>** for login to the server the JSON element can be access by <tt>JSCC.ListHTML["index.html"]</tt> ).
    * **<tt>app.html</tt>** is the window that will be opened by <tt>index.html</tt>, which contains the main interactive elements of *DisApp*,  (e.g. <tt>JSCC.ListHTML["app.html"]</tt>).
    * **<tt>submit.html</tt>** is the window that will be opened by <tt>app.html</tt>, which will be used to submit data to server/backend of *DisApp*,  (e.g. <tt>JSCC.ListHTML["submit.html"]</tt>).

In traditional software development HTML pages can be regarded as windows with a certain content, that is opened up and closed within the software. The HTML page defines the Graphical User Interface (GUI) of these windows.


**(TemplateHTML) Parent: (JSCC)** is an *JS Object* of all HTML-files, used in the project.

**Example:** The web-based software *DisApp* contains two HTML-files:
* **<tt>Login</tt>** is the template for login screens to the server the JSON element can be access by <tt>JSCC.TemplateHTML["Login"]</tt> ).
* **<tt>Main</tt>** is the window that will be opened by <tt>index.html</tt>, which imports the standard libraries for all main HTML file used for *DisApp*  (e.g. <tt>JSCC.TemplateHTML["Main"]</tt>). In the example the HTML page <tt>submit.html</tt> and <tt>app.html</tt> are created with this HTML template.

In traditional software development HTML pages can be regarded as windows with a certain content, that is opened up and closed within the software. The HTML page defines the Graphical User Interface (GUI) of these windows.

When we consider the object oriented programming concept we have classes in instances of the classes (objects). Similar to this concept we create HTML files as templates, that contain certain markers, that are replaced by user-defined content.
The markers three preceding underscores before and after the identifier. In Identifying itself consist of uppercase characters. An example of a marker wll look like thislook like this:

**Examples Marker:**  The marker <code>___PAGE_ID___</code> in the template will be replaced by a defined content in the HTML page. The marker <code>___TITLE___</code> will be replaced by the title of the HTML page.

The notation with  3 underscores before an after the uppercase identifier is used and, because he creates less conflict with other programming languages the programming infrastructure of the JavaScriptClassCreator can be extended to other languages as well.

### Pages (Parent: FileHTML)
Pages are areas of HTML files that shown or hidden by JQuery.

## Status of software
### Release Status
Software in currently in Beta-Phase. It is a proof of concept.
Refactoring of JavascriptClassCreator code in an object-oriented style

### ToDo
* UglifyJS can parse the syntactic structure of Javascript code. Parsing Javascript code and export to other languages (Python, C, Java, PHP, ...). UglifyJS can be used for to crosscompilation of Javascript Classes in other programming languages. Use the tree walker over the [AST Abstract Syntax Tree](http://lisperator.net/uglifyjs/ast).
* implement createNewPageType() in jsondb.js  which adds a new PageType definition
* Integrate UglifyJS for the generated Javascript Classes for exporting to Code2XML with AST and TreeWalker
* BUG: createButtonSelect() is not implemented, Buttons need an empty first entry
* BUG: When PageType is selected Buttons are not set and Save does not read the settings of Buttons
* BUG: Update Method Selector
* IMPROVE: add blank selection option to DB selector
* IMPROVE: remove JSON Code Generator from init in <tt>index.html</tt>
* IMPROVE: Aggregate all libs into one file and send after aggregation to the code compressor, that improves the percentage of compression a bit (low priority, because aggregation of compressed files into a single has a higher impact on loading time than the compression of the aggregated single file of all classes)


## Acknowledgement
Special thanks to the following individual developers and teams of OpenSource JavaScript projects:
* Developer [Mihai Bazon](http://lisperator.net/) create UglifyJS, a great tool to handle and parse Javascript Code and minify the Javascript code (see [Source Code of UglifyJS](https://github.com/mishoo/UglifyJS2)).
* The wrapper for UglifyJS is written [Dan Wolff](http://danwolff.se/). His UglifyJS-Online example is used to minify/compress the exported Javascript code of generated JS Classes (For Online Example of the [UglifyJS-Wrapper](https://skalman.github.io/UglifyJS-online/) see source code on https://github.com/Skalman/UglifyJS-online for the Online-Version of the Wrapper.
* Developers of ACE Code Editor https://ace.c9.io (Javascript Editing uses the Editor in iFrames)
* [JointJS](https://github.com/clientIO/joint) JointJS is a JavaScript diagramming library. It can be used to create either static diagrams. JointJS is used in this project to create UML-diagrams, that are interactive diagramming in conjunction and application builder in Javascript.
* [Inheritage for JavaScript with protoypes](http://phrogz.net/js/classes/OOPinJS2.html) by Gavin Kistner
* [3 ways to define a JavaScript class](https://www.phpied.com/3-ways-to-define-a-javascript-class/) by Stoyan Stefanov
* [JQuery](https://jqueryui.com) is used for the theme and standard operations in the Document Object Model (DOM) of HTML-pages. The [JQuery-Themeroller](https://jqueryui.com/themeroller/) was used to create a JQuery theme for JSCC.

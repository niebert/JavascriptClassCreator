# JavascriptClassCreator
Web-based Javascript Class Creator that
* allows Object Oriented JS Classes,
* supporting Inheritage of Classes,
* stores the Classes in Browser's LocalStorage and
* exports the Classes in JSON Files
The code is stored in the docs/ folder, because the settings of the repository for gh-pages are defined to use the index.html file in /docs to be launched when you call the JavascriptClassCreator with the URL
* https://niebert.github.com/JavascriptClassCreator
All the repositories in "niebert" are mainly designed for rapid prototyping, exploring features or as demos for a final sound implementation.

## UML Diagrams ##
JavascriptClassCreator facilitates:
* (Attributes) UML editing of Attrubutes of Classes
* (Methods) UML editing of Attrubutes of Classes
* (Inheritage) edit the SuperClass of Classes

## ToDo
* UglifyJS can parse the syntactic structure of Javascript code. Parsing Javascript code and export to other languages (Python, C, Java, PHP, ...)
* implement createNewPageType() in jsondb.js  which adds a new PageType definition
* Integrate UglifyJS for the generated Javascript Classes
* BUG: Select Page does not set parent-id and page-title
* BUG: createButtonSelect() is not implemented, Buttons need an empty first entry
* BUG: When PageType is selected Buttons are not set and Save does not read the settings of Buttons
* IMPROVE: add blank selection option to DB selector
* IMPROVE: remove JSON Code Generator from init in index.html


## Acknowledgement
Special thanks to:
* Developer [Mihai Bazon](http://lisperator.net/) create UglifyJS, a great tool to handle and parse Javascript Code and minify the Javascript code (see [Source Code of UglifyJS](https://github.com/mishoo/UglifyJS2)).
* The wrapper for UglifyJS is written [Dan Wolff](http://danwolff.se/). His UglifyJS-Online example is used to minify/compress the exported Javascript code of generated JS Classes (For Online Example of the [UglifyJS-Wrapper](https://skalman.github.io/UglifyJS-online/) see source code on https://github.com/Skalman/UglifyJS-online or https://github.com/Skalman/UglifyJS-online for the Online-Version of the Wrapper.
* Developers of ACE Code Editor https://ace.c9.io (Javascript Editing uses the Editor in iFrames)
* [JointJS](https://github.com/clientIO/joint) JointJS is a JavaScript diagramming library. It can be used to create either static diagrams. JointJS is used in this project to create UML-diagrams, that are interactive diagramming in conjunction and application builder in Javascript.

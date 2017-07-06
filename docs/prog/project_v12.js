vDataJSON['project'] = {
    "JSCC_type": "JSCC",
    "JSCC_version": "1",
    "init_date": "2017/03/05 18:13:28",
    "mod_date": "2017/05/01 14:15:53",
    "sStandalone": "YES",
    "tMainAuthor": "Engelbert Niehaus",
    "tMainEMail": "niehaus@uni-landau.de",
    "tPages": "welcome|Welcome|DefaultPage|home\nhome|Home|MenuPage|\nsetting|Settings|OptionsPage|home\nsave|Save|SaveDialog|home\nquit|Quit App|ConfirmPage|home\nlogin|Login|LoginPage|quit\n    ",
    "tPageTypes": "DefaultPage|home|\nMenuPage|welcome|QUIT\nOptionsPage|home|save\nConfirmPage|home|OK\nSaveDialog|home|CANCEL\nLoginPage|home|CANCEL",
    "tButtons": "QUIT|Quit|<a href=\"#\" id=\"b___BUTTON_ID______COUNTER___\" onclick=\"if (confirm('Do you want to quit!')) window.close();\" data-theme=\"c\">Quit</a>\nOK|OK|<a href=\"#\" id=\"b___BUTTON_ID______COUNTER___\" onclick=\"vApp.confirmClick(this.id);\" data-theme=\"a\">OK</a>\nCANCEL|Cancel|<!-- header button: '___BUTTON_TITLE___' -->___CR___<a href=\"#\" class=\"b_CANCEL\" id=\"b_CANCEL___COUNTER___\" onclick=\"alert('Click Button CANCEL');return false\" data-theme=\"a\">___BUTTON_TITLE___</a>___CR___",
    "sPageTypeHTML": "ConfirmPage",
    "sPageHTML": "editdata",
    "sButtonHTML": "QUIT",
    "tGlobalLibs": "js/string.js\njs/localstorage.js\njs/writedom.js",
    "tDatabases": "db/mydata.js\n../jquery/db/dummy.json",
    "tExportPrefix": "vDataJSON['___DB___'] = ",
    "sDatabaseList": "mydata.js",
    "tPageHTML": "Content of ___PAGE_TITLE___ (ID:'___PAGE_ID___')",
    "tPageTypeHTML": "     <!-- Page: ___PAGE_ID___     Page Type: DefaultPage -->\n     <div data-role=\"page\" id=\"___PAGE_ID___\">\n         <div data-role=\"header\" data-position=\"fixed\">\n           ___HEADER_BUTTON1___\n            <h1>___PAGE_TITLE___</h1>\n           ___HEADER_BUTTON2___\n       </div>\n         <!-- /header -->\n       <div data-role=\"content\">\n        <table  bgcolor=\"#FFFFFF\">\n            <tr>\n                <td>\n                  ___PAGE_CONTENT___\n                </td>\n            </tr>\n        </table>     \n       </div>\n    <!-- /page ID: ___PAGE_ID___ -->\n    </div>\n",
    "tElementHTML": "File app.html - Content of element HTML_TITLE",
    "sExportPrefix": "",
    "sShowGeneralizations": "show",
    "sShowAggregations": "show",
    "sShowAssociations": "show",
    "SelectedClass": "Editor4JSON",
    "SelectedPage": "editdata",
    "SelectedPageType": "ConfirmPage",
    "SelectedButton": "QUIT",
    "SelectedFile": "app.html",
    "SelectedElement": "HTML_TITLE",
    "ClassType": {
        "DOMVar": "Red",
        "DOMVarList": "Red",
        "CheckBoxList": "Red",
        "FuzzyLayer": "Yellow",
        "FuzzyController": "Yellow",
        "DatabaseList": "Green",
        "Database": "Green",
        "AppAbstract": "Abstract",
        "Server": "Blue",
        "App": "Blue",
        "LinkParam": "Blue",
        "Editor4JSON": "Blue"
    },
    "ClassList": {
        "App": {
            "tClassname": "App",
            "tSuperClassname": "AppAbstract",
            "sClassType": "Blue",
            "JSCC_mod_date": "",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "aDoc=null\naName=\"DisApp\"\naServer=new Server(\"___SERVER_URL___\")\naDatabaseList=new DatabaseList()\naCurrentPage=\"welcome\"\naFuzzyController=new FuzzyController()\naLinkParam=new LinkParam()",
            "tMethods": "initDOM(pDoc:Document,pDatabase:Hash)\nload():Boolean\nsave():Boolean\nevent(pPageID:String,pButtonID:String,pEventID:String)\ngotoPage(pPageID:String)\ngotoURL(pFileHTML:String)",
            "sAttribList": "aDoc",
            "tAttribName": "aDoc",
            "tAttribType": "Document",
            "tAttribComment": "Attribute: 'aDoc' Type: '' stores ... ",
            "tAttribDefault": "null",
            "sAttribTypeList": "",
            "tMethodHeader": "gotoPage(pPageID:String)",
            "tMethodComment": "goto a certain page of the App File",
            "sMethodList": "gotoPage",
            "tLoopObject": "myArray",
            "tLoopMethod": ".myLoopMethod(pID)",
            "AttribName": {},
            "AttribAccess": {
                "aDoc": "public",
                "aName": "public",
                "aServer": "public",
                "aDatabaseList": "public",
                "aCurrentPage": "public",
                "aFuzzyController": "public",
                "aLinkParam": "public"
            },
            "AttribDefault": {
                "aDoc": "null",
                "aName": "\"DisApp\"",
                "aServer": "new Server(\"___SERVER_URL___\")",
                "aDatabaseList": "new DatabaseList()",
                "aCurrentPage": "\"welcome\"",
                "aFuzzyController": "new FuzzyController()",
                "aLinkParam": "new LinkParam()"
            },
            "AttribType": {
                "aDoc": "Document",
                "aName": "String",
                "aServer": "Server",
                "aDatabaseList": "DatabaseList",
                "aCurrentPage": "String",
                "aFuzzyController": "FuzzyController",
                "aLinkParam": "LinkParam"
            },
            "MethodReturn": {
                "init": "",
                "load": "Boolean",
                "save": "Boolean",
                "calcRisk": "",
                "calcResponse": "",
                "gotoPage": "",
                "submitPage": "",
                "event": "",
                "initDOM": "",
                "gotoURL": ""
            },
            "MethodCode": {
                "initDOM": "",
                "load": "",
                "save": "",
                "event": "alert(\"pPageID=\"+pPageID+\" pButtonID=\"+pButtonID+\" pEventID=\"+pEventID)",
                "gotoPage": "$.mobile.changePage( '#'+pPageID, { transition: 'slideup', changeHash: false })",
                "gotoURL": ""
            },
            "MethodComment": {
                "initDOM": "1) inits the DOM content of the App and writes dynamic content into the Document Object Model of the HTML-file\n2) populates the content with the current records of the databases 3) the LinkParameter are available at this time of the call initDOM is called from the init() Method defined in AppAbstract",
                "load": "load Databases and DOMVars from LocalStorage if the exist in local storage",
                "save": "save Databases and DOMVars to LocalStorage",
                "event": "this is the event handler of the App. The handler gets the button or link as parameter, which determines the event handler for event",
                "gotoPage": "goto a certain page of the App File",
                "gotoURL": "navigate to page on the same host in the same window (in general another file of the app)"
            },
            "AttribComment": {
                "aDoc": "Attribute: 'aDoc' Type: '' stores ... ",
                "aName": "Attribute: 'aName' Type: 'String' stores ... ",
                "aServer": "Attribute: 'aServer' Type: 'Server' stores ... ",
                "aDatabaseList": "stores all databases loaded in the app",
                "aCurrentPage": "Attribute: 'aCurrentPage' Type: 'String' stores ... ",
                "aFuzzyController": "Attribute: 'aFuzzyController' Type: 'FuzzyController' stores ... ",
                "aLinkParam": "stores all parameters from the URL in aLinkParam.aVars"
            },
            "MethodParameter": {
                "initDOM": "pDoc:Document,pDatabase:Hash",
                "load": "",
                "save": "",
                "event": "pPageID:String,pButtonID:String,pEventID:String",
                "gotoPage": "pPageID:String",
                "gotoURL": "pFileHTML:String"
            },
            "tMethodName": "",
            "tMethodCode": "$.mobile.changePage( '#'+pPageID, { transition: 'slideup', changeHash: false })",
            "tMethodAccess": "public",
            "sClassList": "App",
            "MethodAccess": {
                "initDOM": "public",
                "load": "public",
                "save": "public",
                "event": "public",
                "gotoPage": "public",
                "gotoURL": "public"
            }
        },
        "AppAbstract": {
            "tClassname": "AppAbstract",
            "tSuperClassname": "",
            "sClassType": "Abstract",
            "JSCC_mod_date": "",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "aLinkParam = new LinkParam()\naDatabaseList = new DatabaseList()",
            "tMethods": "init(pDoc:Document,pDatabase:Hash)\nload():Boolean\nsave():Boolean",
            "sAttribList": "aLinkParam",
            "tAttribName": "aLinkParam",
            "tAttribType": "",
            "tAttribComment": "stores all parameters from the URL in aLinkParam.aVars",
            "tAttribDefault": "new LinkParam()",
            "sAttribTypeList": "LinkParam",
            "tMethodHeader": "init(pDoc:Document,pDatabase:Hash)",
            "tMethodComment": "1) inits the App with the document\n2) calls an init on the LinkParameter so that the parameters of the link are available in aLinkParam\n3) inits all the database in aDatabaseList",
            "tMethodCode": "this.aDoc = pDoc || document;\nthis.aDatabaseList.init(pDatabase);",
            "tArrayLoop": "",
            "tMethodLoop": "",
            "AttribName": {},
            "AttribDefault": {
                "aLinkParam": "new LinkParam()",
                "aDatabaseList": "new DatabaseList()"
            },
            "AttribType": {
                "aLinkParam": "LinkParam",
                "aDatabaseList": "DatabaseList"
            },
            "MethodReturn": {
                "init": "",
                "load": "Boolean",
                "save": "Boolean"
            },
            "MethodCode": {
                "init": "this.aDoc = pDoc || document;\nthis.aDatabaseList.init(pDatabase);",
                "load": "this.aDatabaseList.load()\nthis.aDOMVarList.load()",
                "save": "this.aDatabaseList.save()\nthis.aDOMVarList.save()"
            },
            "MethodComment": {
                "init": "1) inits the App with the document\n2) calls an init on the LinkParameter so that the parameters of the link are available in aLinkParam\n3) inits all the database in aDatabaseList",
                "load": "load Databases and DOMVars from LocalStorage if the exist in local storage",
                "save": "save Databases and DOMVars to LocalStorage"
            },
            "AttribComment": {
                "aLinkParam": "stores all parameters from the URL in aLinkParam.aVars",
                "aDatabaseList": "stores all databases loaded in the app"
            },
            "MethodParameter": {
                "init": "pDoc:Document,pDatabase:Hash",
                "load": "",
                "save": ""
            },
            "sMethodList": "init",
            "tMethodName": "",
            "tLoopObject": "",
            "tLoopMethod": "",
            "AttribAccess": {
                "aLinkParam": "public",
                "aDatabaseList": "public"
            },
            "MethodAccess": {
                "init": "public",
                "load": "public",
                "save": "public"
            }
        },
        "DOMVar": {
            "tClassname": "DOMVar",
            "tSuperClassname": "",
            "sClassType": "Red",
            "JSCC_mod_date": "",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "",
            "tMethods": "",
            "sAttribList": "",
            "tAttribName": "",
            "tAttribType": "",
            "tAttribComment": "",
            "tAttribDefault": "",
            "sAttribTypeList": "",
            "tMethodHeader": "",
            "tMethodComment": "",
            "tMethodCode": "",
            "sMethodList": "",
            "tLoopObject": "vMyHash",
            "tLoopMethod": ".init()",
            "AttribName": {},
            "AttribDefault": {},
            "AttribType": {},
            "MethodReturn": {},
            "MethodCode": {},
            "MethodComment": {},
            "AttribComment": {},
            "MethodParameter": {},
            "tMethodName": "",
            "AttribAccess": {},
            "MethodAccess": {}
        },
        "DOMVarList": {
            "tClassname": "DOMVarList",
            "tSuperClassname": "",
            "sClassType": "Red",
            "JSCC_mod_date": "28.4.2017",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "",
            "tMethods": "",
            "sAttribList": "",
            "tAttribName": "",
            "tAttribType": "",
            "tAttribComment": "",
            "tAttribDefault": "",
            "sAttribTypeList": "",
            "tMethodHeader": "",
            "tMethodComment": "",
            "tMethodCode": "",
            "sMethodList": "",
            "tLoopObject": "vMyHash",
            "tLoopMethod": ".init()",
            "AttribName": {},
            "AttribDefault": {},
            "AttribType": {},
            "MethodReturn": {},
            "MethodCode": {},
            "MethodComment": {},
            "AttribComment": {},
            "MethodParameter": {},
            "tMethodName": "",
            "AttribAccess": {},
            "MethodAccess": {}
        },
        "CheckBoxList": {
            "tClassname": "CheckBoxList",
            "tSuperClassname": "",
            "sClassType": "Red",
            "JSCC_mod_date": "28.4.2017",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "",
            "tMethods": "",
            "sAttribList": "",
            "tAttribName": "",
            "tAttribType": "",
            "tAttribComment": "",
            "tAttribDefault": "",
            "sAttribTypeList": "",
            "tMethodHeader": "",
            "tMethodComment": "",
            "tMethodCode": "",
            "sMethodList": "",
            "tLoopObject": "vMyHash",
            "tLoopMethod": ".init()",
            "AttribName": {},
            "AttribDefault": {},
            "AttribType": {},
            "MethodReturn": {},
            "MethodCode": {},
            "MethodComment": {},
            "AttribComment": {},
            "MethodParameter": {},
            "tMethodName": "",
            "AttribAccess": {},
            "MethodAccess": {}
        },
        "FuzzyLayer": {
            "tClassname": "FuzzyLayer",
            "tSuperClassname": "",
            "sClassType": "Yellow",
            "JSCC_mod_date": "28.4.2017",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "",
            "tMethods": "",
            "sAttribList": "",
            "tAttribName": "",
            "tAttribType": "",
            "tAttribComment": "",
            "tAttribDefault": "",
            "sAttribTypeList": "",
            "tMethodHeader": "",
            "tMethodComment": "",
            "tMethodCode": "",
            "sMethodList": "",
            "tLoopObject": "vMyHash",
            "tLoopMethod": ".init()",
            "AttribName": {},
            "AttribDefault": {},
            "AttribType": {},
            "MethodReturn": {},
            "MethodCode": {},
            "MethodComment": {},
            "AttribComment": {},
            "MethodParameter": {},
            "tMethodName": "",
            "AttribAccess": {},
            "MethodAccess": {}
        },
        "FuzzyController": {
            "tClassname": "FuzzyController",
            "tSuperClassname": "",
            "sClassType": "Yellow",
            "JSCC_mod_date": "",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "",
            "tMethods": "",
            "sAttribList": "",
            "tAttribName": "",
            "tAttribType": "",
            "tAttribComment": "",
            "tAttribDefault": "",
            "sAttribTypeList": "",
            "tMethodHeader": "",
            "tMethodComment": "",
            "tMethodCode": "",
            "sMethodList": "",
            "tLoopObject": "vMyHash",
            "tLoopMethod": ".init()",
            "AttribName": {},
            "AttribDefault": {},
            "AttribType": {},
            "MethodReturn": {},
            "MethodCode": {},
            "MethodComment": {},
            "AttribComment": {},
            "MethodParameter": {},
            "tMethodName": "",
            "AttribAccess": {},
            "MethodAccess": {}
        },
        "ParserHTML": {
            "JSCC_type": "CLASS",
            "JSCC_init_date": "22.5.2017",
            "JSCC_mod_date": "2017/04/01 15:33:46",
            "tClassname": "ParserHTML",
            "tSuperClassname": "",
            "sClassType": "Green",
            "tAuthor": "John Resig",
            "tEMail": "jeresig@gmail.com",
            "tAttributes": "aDoc = new DatabaseList()\nstartTag = /^<([-A-Za-z0-9_]+)((?:\\s+\\w+(?:\\s*=\\s*(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?)*)\\s*(\\/?)>/\nendTag = /^<\\/([-A-Za-z0-9_]+)[^>]*>/\nattr = /([-A-Za-z0-9_]+)(?:\\s*=\\s*(?:(?:\"((?:\\\\.|[^\"])*)\")|(?:'((?:\\\\.|[^'])*)')|([^>\\s]+)))?/g;\nempty = null\nblock = null\ninline = null\ncloseSelf = null\nfillAttrs = null",
            "tMethods": "init(pDoc)\ntoXML(pString)\ntoHTML(pString)\ntoDOM(pString):Hash\nmakeMap(pCommaSepString):Hash\nparse(html,handler)",
            "sAttribList": "fillAttrs",
            "tAttribName": "empty",
            "tAttribType": "Hash",
            "tAttribComment": "the attribute 'empty' stores in 'Hash' and is initialized by init()",
            "tAttribDefault": "null",
            "sAttribTypeList": "Hash",
            "tMethodHeader": "toDOM(pString:String):Hash",
            "tMethodName": "init",
            "tMethodComment": "Parses HTML content and creates a DOM tree that can be append to certain node in DOM",
            "sMethodList": "toDOM",
            "tMethodCode": "parses the HTML input and creates DOM tree that can be added to DOM - error in the syntax are correct e.g. missing closing tags",
            "tLoopObject": "vArray",
            "tLoopMethod": ".init()",
            "AttribType": {
                "startTag": "RegularExp",
                "endTag": "RegularExp",
                "attr": "RegularExp",
                "aDoc": "DatabaseList",
                "empty": "",
                "block": "",
                "inline": "",
                "closeSelf": "",
                "fillAttrs": ""
            },
            "AttribAccess": {
                "aDoc": "public",
                "attr": "private",
                "endTag": "private",
                "startTag": "private",
                "fillAttrs": "public",
                "closeSelf": "public",
                "block": "public",
                "inline": "public",
                "empty": "public"
            },
            "AttribDefault": {
                "aDoc": "new DatabaseList()",
                "startTag": "/^<([-A-Za-z0-9_]+)((?:\\s+\\w+(?:\\s*=\\s*(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?)*)\\s*(\\/?)>/",
                "endTag": "/^<\\/([-A-Za-z0-9_]+)[^>]*>/",
                "attr": "/([-A-Za-z0-9_]+)(?:\\s*=\\s*(?:(?:\"((?:\\\\.|[^\"])*)\")|(?:'((?:\\\\.|[^'])*)')|([^>\\s]+)))?/g;",
                "empty": "null",
                "block": "null",
                "inline": "null",
                "closeSelf": "null",
                "fillAttrs": "null"
            },
            "AttribComment": {
                "startTag": "the attribute 'startTag' defines a start-tag in HTML as 'RegularExp' ",
                "endTag": "the attribute 'endTag' defines a end-tag in HTML as 'RegularExp' ",
                "attr": "the attribute 'attr' stores in 'RegularExp' to parse the attributes of the tag ",
                "aDoc": "the attribute 'aDoc' stores a reference to 'document'",
                "empty": "the attribute 'empty' stores in 'Hash' and is initialized by init()",
                "block": "the attribute 'block' stores in 'Hash'  and is initialized by init()",
                "inline": "the attribute 'inline' stores in 'Hash'  and is initialized by init()",
                "closeSelf": "the attribute 'closeSelf' stores in 'Hash'  and is initialized by init()",
                "fillAttrs": "the attribute 'fillAttrs' stores in 'Hash'  and is initialized by init()"
            },
            "MethodParameter": {
                "init": "pDoc:Document",
                "toXML": "pString:String",
                "toHTML": "pString:String",
                "toDOM": "pString:String",
                "makeMap": "pCommaSepString:String",
                "parse": " html:String, handler:Function "
            },
            "MethodReturn": {
                "init": "",
                "toXML": "Hash",
                "toHTML": "Hash",
                "toDOM": "Hash",
                "makeMap": "Hash",
                "parse": ""
            },
            "MethodCode": {
                "init": "// Empty Elements - HTML 4.01\nempty = makeMap(\"area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed\");\n\n// Block Elements - HTML 4.01\nblock = makeMap(\"address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul\");\n\n// Inline Elements - HTML 4.01\ninline = makeMap(\"a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var\");\n\n// Elements that you can, intentionally, leave open\n// (and which close themselves)\ncloseSelf = makeMap(\"colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr\");\n\n// Attributes that have their values filled in disabled=\"disabled\"\nfillAttrs = makeMap(\"checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected\");\n\n// Special Elements (can contain anything)\nvar special = makeMap(\"script,style\");\n",
                "toXML": "",
                "toHTML": "",
                "toDOM": "",
                "makeMap": "var obj = {}, items = pCommaSepString.split(\",\");\nfor ( var i = 0; i < items.length; i++ ) {\n\tobj[ items[i] ] = true;\n};\nreturn obj;\n",
                "parse": ""
            },
            "MethodComment": {
                "init": "init HTML elements for parsing\n* HTML Parser By John Resig (ejohn.org)\n* Original code by Erik Arvidsson, Mozilla Public License\n* http://erik.eae.net/simplehtmlparser/simplehtmlparser.js\n\nUse like so:\n     var vHTMLParser = new HTMLParser();\n     vHTMLParser.init(document)\n     vHTMLParser.parser(htmlString, {\n         start: function(tag, attrs, unary) {},\n         end: function(tag) {},\n         chars: function(text) {},\n         comment: function(text) {}\n      });\n \n or to get an XML string:\n     vHTMLParser.toXML(htmlString);\n \n or to get an XML DOM Document\n  vHTMLParser.toDOM(htmlString);\n \n or to inject into an existing document/DOM node\n     vHTMLParser.toDOM(htmlString, document);\n     vHTMLParser.toDOM(htmlString, document.body);",
                "toXML": "parses the HTML input and creates XML output with XML closing tags that might no been closed in HTML",
                "toHTML": "parses the HTML input and creates HTML output corrects errors e.g. missing closing tags",
                "toDOM": "Parses HTML content and creates a DOM tree that can be append to certain node in DOM",
                "makeMap": "takes a comma separated string e.g. \"input,form,body\" and creates a hash with a default value 'true'",
                "parse": "Main method for parse input and provides a handler to do something with the parsed tree (tree walker)"
            },
            "MethodAccess": {
                "init": "public",
                "toDOM": "public",
                "toXML": "public",
                "toHTML": "public",
                "makeMap": "private",
                "parse": "public"
            },
            "tMethodAccess": "public",
            "JSCC_version": "1",
            "sClassList": "ParserHTML"
        },
        "WrapJSON": {
            "tClassname": "WrapJSON",
            "tSuperClassname": "",
            "sClassType": "Interface",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "data=null",
            "tMethods": "init(pData:Hash)\nupdate(pPathID:String,vValue:Object)\nexists(pPathID):Boolean\ngetValue(pPathID:String):Object\nsetValue(pPathID:String,pValue:Object)\ngetType(pPathID):String;\nsplitPathID(pPathID:String):Array",
            "sAttribList": "data",
            "tAttribName": "data",
            "tAttribType": "Object",
            "tAttribComment": "the attribute 'data' stores a reference to the JSON data",
            "tAttribDefault": "null",
            "sAttribTypeList": "Object",
            "tMethodHeader": "init(pData:Hash)",
            "tMethodComment": "init the JSON wrapper with a reference to a JSON tree",
            "sMethodList": "init",
            "tMethodCode": "",
            "tLoopObject": "data",
            "tLoopMethod": "init()",
            "AttribType": {
                "data": "Hash"
            },
            "AttribDefault": {
                "data": "null"
            },
            "AttribComment": {
                "data": "the attribute 'data' stores a reference to the JSON data"
            },
            "MethodParameter": {
                "update": "pPathID:String,vValue:Object",
                "exists": "pPathID",
                "getValue": "pPathID:String",
                "splitID": "",
                "splitPathID": "pPathID:String",
                "init": "pData",
                "setValue": "pPathID:String,pValue:Object",
                "getType": "pPathID"
            },
            "MethodReturn": {
                "update": "",
                "exists": "Boolean",
                "getValue": "Object",
                "splitID": "",
                "splitPathID": "Array",
                "init": "",
                "setValue": "",
                "getType": "String;"
            },
            "MethodCode": {
                "update": "",
                "exists": " ",
                "getValue": "",
                "splitID": "",
                "splitPathID": "",
                "init": "",
                "setValue": "",
                "getType": ""
            },
            "MethodComment": {
                "update": "Comment for update",
                "exists": "Comment for exists",
                "getValue": "Comment for getValue",
                "splitID": "Comment for splitID",
                "splitPathID": "Comment for splitPathID",
                "init": "Comment for init",
                "setValue": "Comment for setValue",
                "getType": "Comment for getType"
            },
            "JSCC_mod_date": "",
            "tMethodName": "",
            "AttribAccess": {
                "data": "public"
            },
            "MethodAccess": {
                "update": "public",
                "exists": "public",
                "getValue": "public",
                "splitID": "public",
                "splitPathID": "public",
                "init": "public",
                "setValue": "public",
                "getType": "public"
            }
        },
        "DatabaseList": {
            "tClassname": "DatabaseList",
            "tSuperClassname": "WrapJSON",
            "sClassType": "Green",
            "JSCC_mod_date": "",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "aDoc=null\naDBHash={}\naDatabaseHash={}",
            "tMethods": "init(pDoc:Document,pDatabase:Hash)",
            "sAttribList": "aDatabaseHash",
            "tAttribName": "aDatabaseHash",
            "tAttribType": "Hash",
            "tAttribComment": "stores all databases in a Hash",
            "tAttribDefault": "{}",
            "sAttribTypeList": "Hash",
            "tMethodHeader": "init(pDoc:Document,pDatabase:Hash)",
            "tMethodComment": "create Database objects for all keys in pDatabase hash in the init the Database in this.aDB",
            "tMethodCode": "this.aDatabaseHash = pDatabase;\nfor (var vKey in this.aDatabaseHash) {\n  this.aDBHash[vKey] = new Database();\n  this.aDBHash[vKey].init(this.aDatabase[vKey]);\n};\n",
            "sMethodList": "init",
            "tArrayLoop": "this.aDBList",
            "tMethodLoop": "load()",
            "AttribName": {},
            "AttribDefault": {
                "aDoc": "null",
                "aDatabaseHash": "{}",
                "aDBHash": "{}"
            },
            "AttribType": {
                "aDoc": "Document",
                "aDatabaseHash": "Hash",
                "aDBHash": "Hash"
            },
            "AttribAccess": {
                "aDoc": "public",
                "aDatabaseHash": "private",
                "aDBHash": "private"
            },
            "AttribComment": {
                "aDoc": "is the 'document' object",
                "aDatabaseHash": "stores all databases in the init format in a Hash",
                "aDBHash": "stores all databases of Class 'Database' in a Hash"
            },
            "MethodReturn": {
                "init": "",
                "load": "Boolean",
                "save": "Boolean",
                "getDBHash4Type": "Hash"
            },
            "MethodCode": {
                "init": "this.aDatabaseHash = pDatabase;\nfor (var vKey in this.aDatabaseHash) {\n  this.aDBHash[vKey] = new Database();\n  this.aDBHash[vKey].init(this.aDatabase[vKey]);\n};\n",
                "load": "for (var vKey in this.aDBHash) {\n  this.aDBHash[vKey].load();\n};\n",
                "save": "for (var vKey in this.aDBHash) {\n  this.aDBHash[vKey].save();\n};\n",
                "getDBHash4Type": "var vRetHash = {};\nvar vType = \"\";\nfor (var vKey in this.aDBHash) {\n  vType = this.aDBHash[vKey].getType();\n  if (vType==\"pType\") {\n    vRetHash[vKey] = this.aDBHash[vKey];\n  }\n};\nreturn vRetHash\n"
            },
            "MethodComment": {
                "init": "create Database objects for all keys in pDatabase hash in the init the Database in this.aDB",
                "load": "load Databases and DOMVars from LocalStorage if the exist in local storage",
                "save": "save Databases and DOMVars to LocalStorage",
                "getDBHash4Type": "a DatabaseList contains Databases of different types.\nMethod return a Hash of all DBs of a certain Type"
            },
            "MethodParameter": {
                "init": "pDoc:Document,pDatabase:Hash",
                "load": "",
                "save": "",
                "getDBHash4Type": "pType:String"
            },
            "MethodAccess": {
                "init": "public",
                "load": "private",
                "save": "private",
                "getDBHash4Type": "public"
            },
            "tLoopObject": "myHash",
            "tLoopMethod": "myLoopMethod(pID)",
            "tMethodName": "",
            "tMethodAccess": "public",
            "sClassList": "DatabaseList"
        },
        "Database": {
            "tClassname": "Database",
            "tSuperClassname": "WrapJSON",
            "sClassType": "Green",
            "JSCC_mod_date": "2017/04/03 17:32:38",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "aSourceDB = {}\naDB = {}",
            "tMethods": "init(pDB)\ncheckFormat()\nload():Boolean\nsave():Boolean",
            "sAttribList": "aDB",
            "tAttribName": "aDB",
            "tAttribType": "Hash",
            "tAttribComment": "the attribute 'aDB' stores current DB with Offine Data",
            "tAttribDefault": "{}",
            "sAttribTypeList": "",
            "tMethodHeader": "load():Boolean",
            "tMethodComment": "loads the Database from LocalStorage of the browser and store the DB in this.aDB. \nAfter load it calls checkFormat() to check, if the format of the database is still \nthe same as in this.aSourceDB. The checkFormat() is introduced to make the App robust against alterations of \nthe database format from the App-provider.\nThe return value is Boolean. It determines if the load()-operation from the LocalStorage was successful.",
            "sMethodList": "checkFormat",
            "tMethodCode": "var vRetBoolean = false;\n// Code for load\n\nreturn vRetBoolean;",
            "tLoopObject": "vMyHash",
            "tLoopMethod": ".init()",
            "AttribName": {},
            "AttribDefault": {
                "aSourceDB": "{}",
                "aDB": "{}"
            },
            "AttribType": {
                "aSourceDB": "Hash",
                "aDB": "Hash"
            },
            "MethodReturn": {
                "init": "",
                "checkFormat": "",
                "load": "Boolean",
                "save": "Boolean"
            },
            "MethodCode": {
                "init": "this.aSourceDB = pDB",
                "checkFormat": "",
                "load": "var vRetBoolean = false;\n// Code for load\n\nreturn vRetBoolean;",
                "save": ""
            },
            "MethodComment": {
                "init": "DatabaseList.init calls this init-method with a single Database in JSON format. \nThe database is the init format of DB and is may contain a newer DB format that previous selected data",
                "checkFormat": "compares the format of this.aSourceDB and this.aDB and look for changes in the Database format.\nthis.aSourceDB contains the newer format of the App provider. this.aDB will be altered according to changes in \nthis.aSourceDB. If this.aDB does not exist after loading from LocalStorage, checkFormat() will use aSourceDB for aDB to collect data.",
                "load": "loads the Database from LocalStorage of the browser and store the DB in this.aDB. \nAfter load it calls checkFormat() to check, if the format of the database is still \nthe same as in this.aSourceDB. The checkFormat() is introduced to make the App robust against alterations of \nthe database format from the App-provider.\nThe return value is Boolean. It determines if the load()-operation from the LocalStorage was successful.",
                "save": "saves the Database this.aDB to LocalStorage of the browser. JSON.stringify is used to create a string from\nthe hash in this.aDB and this string is stored in the LocalStorage. The return value is Boolean.\nThe boolean determines if the save()-method was performed successfully.\n"
            },
            "AttribComment": {
                "aSourceDB": "the attribute 'aSourceDB' stores the init Database with current DB format ",
                "aDB": "the attribute 'aDB' stores current DB with Offine Data"
            },
            "MethodParameter": {
                "init": "pDB",
                "checkFormat": "",
                "load": "",
                "save": ""
            },
            "JSCC_type": "CLASS",
            "JSCC_version": "1",
            "tMethodName": "",
            "AttribAccess": {
                "aSourceDB": "public",
                "aDB": "public"
            },
            "MethodAccess": {
                "init": "public",
                "checkFormat": "public",
                "load": "public",
                "save": "public"
            }
        },
        "Server": {
            "tClassname": "Server",
            "tSuperClassname": "",
            "sClassType": "Blue",
            "JSCC_mod_date": "28.4.2017",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "",
            "tMethods": "",
            "sAttribList": "",
            "tAttribName": "",
            "tAttribType": "",
            "tAttribComment": "",
            "tAttribDefault": "",
            "sAttribTypeList": "",
            "tMethodHeader": "",
            "tMethodComment": "",
            "sMethodList": "",
            "tMethodCode": "",
            "tLoopObject": "vMyHash",
            "tLoopMethod": ".init()",
            "AttribName": {},
            "AttribDefault": {},
            "AttribType": {},
            "MethodReturn": {},
            "MethodCode": {},
            "MethodComment": {},
            "AttribComment": {},
            "MethodParameter": {},
            "tMethodName": "",
            "AttribAccess": {},
            "MethodAccess": {}
        },
        "LinkParam": {
            "sClassType": "Blue",
            "tClassname": "LinkParam",
            "tSuperClassname": "",
            "JSCC_mod_date": "",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "size = 0\naVars = {}\naLink = \"\"",
            "tMethods": "init(pDoc:Document)\nparseURL(pLink:String):String\ngetURL(pVarHash:Hash):String\nsetValue(pVar:String,pValue:String)\ngetValue(pVar:String):String\ndeleteValue(pVar:String)\ngetLink4URL():String\ngetParam4URL():String\ndecodeParam(pParam:String):String\nencodeParam(pParam:String)\ngetTableHTML():String\ngetEditTableHTML(pPrefixID:String):String\ncalcSize()\nencodeHTML(pValue:String,pWrapCode:Boolean):String\nexists(pVar:String):Boolean",
            "sAttribList": "size",
            "tAttribName": "size",
            "tAttribType": "String",
            "tAttribComment": "Counts the Number of Parameter",
            "tAttribDefault": "0",
            "sAttribTypeList": "Integer",
            "tMethodHeader": "getParam4URL():String",
            "tMethodComment": "get the parameter string for the URL starting with ? if aVars contains variables",
            "sMethodList": "getParam4URL",
            "tMethodCode": "  var vHash = this.aVars || {};\n  var vOut = \"\";\n  var vSep = \"?\";\n  for (var iID in vHash) {\n    if (vHash.hasOwnProperty(iID)) {\n      vOut = vSep + this.encodeParam(iID) + \"=\" + this.encodeParam(vHash[iID]);\n      vSep = \"&\";\n    };\n  };\n  return vOut;\n",
            "tLoopObject": "vMyHash",
            "tLoopMethod": ".init()",
            "AttribDefault": {
                "size": "0",
                "aVars": "{}",
                "aLink": "\"\""
            },
            "AttribType": {
                "size": "Integer",
                "aVars": "Hash",
                "aLink": "String"
            },
            "AttribComment": {
                "size": "Counts the Number of Parameter",
                "aVars": "Attribute: 'aVars' Type: 'Hash' stores all URL parameters ",
                "aLink": "Attribute: 'aLink' Type: 'String' stores the Link before '?' "
            },
            "MethodComment": {
                "init": "init extract the link with parameters from document.location.search and store aLink",
                "parseURL": "parses the URL stores the variables in 'aVar' e.g. ..&lastname=Niehaus&... stores aVars['name']='Niehaus'",
                "getURL": "Comment for getLink",
                "getLink4URL": "get the Link part of the URL without the URL parameters",
                "getParam4URL": "get the parameter string for the URL starting with ? if aVars contains variables",
                "setValue": "Comment for setValue",
                "getValue": "Comment for getValue(pVar) return the definition of the parameter exists otherwise en empty string",
                "deleteValue": "Comment for deleteValue in the parameter hash aVars\nreturn a Boolean if delete was sucessful, resp. variable pVar exists in Hash aVars",
                "decodeParam": "decode a parameter from the URL",
                "encodeParam": "encode a parameter for a call from the app.",
                "getTableHTML": "creates a HTML table with two column for key and value of the parameter hash aVars",
                "getEditTableHTML": "creates a Edit HTML table with two column for key and value of the parameter hash aVars.\nThe keys of aVars are used as IDs for the HTML form.\nAn optional ID prefix as parameter can be used to create a unique ID for the DOM elements\nAll parameters are visible in an input field.",
                "calcSize": "calculates the number of variables defined in the URL parameters, stores result in length",
                "encodeHTML": "Encodes source code for HTML-Output in as code or textarea in the following way:\n 1) Replace \"&\" character with \"&amp;\"\n 2) Replace \"<\" character with \"&lt;\"\n 3) Replace \">\" character with \"&gt;\"\nThe converted pValue will wrapped with <pre> and <code> tags for direct display as HTML \nand without code tag wrapper if the code is written as inner HTML and value to a textarea.",
                "exists": "checks if the parameter with variable 'pVar' exists in parameter hash this.aVars"
            },
            "MethodReturn": {
                "init": "",
                "parseURL": "String",
                "getURL": "String",
                "setValue": "",
                "getValue": "String",
                "deleteValue": "",
                "getLink4URL": "String",
                "getParam4URL": "String",
                "decodeParam": "String",
                "encodeParam": "",
                "getTableHTML": "String",
                "getEditTableHTML": "String",
                "calcSize": "",
                "encodeHTML": "String",
                "exists": "Boolean"
            },
            "MethodCode": {
                "init": "//save \"document\" object in aDoc as Attribute for further use \nthis.aDoc = pDoc;\nthis.aLink = pDoc.location;\nthis.aVars = this.parseURL(pDoc.location.search);",
                "parseURL": "var vLink = pLink || \"\";\nvar vParams = {},\n    vTokens,\n    vRE = /[?&]?([^=]+)=([^&]*)/g;\nif (vLink != \"\") {\n  vLink = vLink.split('+').join(' ');\n  while (vTokens = vRE.exec(vLink)) {\n    vParams[this.decodeParam(vTokens[1])] = this.decodeParam(vTokens[2]);\n    this.calcSize();\n  };\n} else {\n    console.log(\"parseURL(pLink) - pLink contains no parameters\")\n};\nreturn vParams;",
                "getURL": "var vParam = \"\";\nif (pVars) {\n    vParam = getParam4URL(pVars);\n} else {\n    vParam = getParam4URL();\n};\nreturn this.getLink4URL() + vParam;",
                "setValue": "if (this.aVars.hasOwnProperty(pVar)) {\n  console.log(\"Value of link parameter '\"+pVar+\"' changed\");\n} else {\n  this.calcSize();\n  console.log(\"New  link parameter '\"+pVar+\"' created\");\n};\nthis.aVars[pVar] = pValue",
                "getValue": "var vRet = \"\";\nif (this.aVars.hasOwnProperty(pVar)) {\n    vRet = this.aVars[pVar]\n} else {\n    console.log(\"ERROR: variable '\"+pVar+\"' does not exist in LinkParam\");\n};\nreturn vRet;",
                "deleteValue": "var vRet = false;\nif (this.aVars.hasOwnProperty(pVar)) {\n    delete this.aVars[pVar];\n    vRet = true;\n    this.calcSize();\n};\nreturn vRet;",
                "getLink4URL": "return this.aLink;",
                "getParam4URL": "  var vHash = this.aVars || {};\n  var vOut = \"\";\n  var vSep = \"?\";\n  for (var iID in vHash) {\n    if (vHash.hasOwnProperty(iID)) {\n      vOut = vSep + this.encodeParam(iID) + \"=\" + this.encodeParam(vHash[iID]);\n      vSep = \"&\";\n    };\n  };\n  return vOut;\n",
                "decodeParam": "pParam = pParam.replace(/\\+/g,  \" \");\npParam = decodeURIComponent(pParam);\nreturn pParam;\n",
                "encodeParam": "var vParam = encodeURIComponent(pParam);\nvParam = vParam.replace(/'/g,\"%27\").replace(/\"/g,\"%22\");\nreturn vParam;",
                "getTableHTML": "var vOut = \"\";\nvar vHash = this.aVars;\nvOut += \"<table border=1>\";\nvOut += \"<tr><td><b>Variable</b></td><td>Value</td></tr>\";\nvar vWrapCode = true;\nfor (var iID in vHash) {\n    if (vHash.hasOwnProperty(iID)) {\n      vOut += \"<tr>\";\n      vOut += \"<td>\";\n      vOut += \"<b>\"+iID+\"</b>\";\n      vOut += \"</td>\";\n      vOut += \"<td>\";\n      // second parameter vWrapCode = true for non textarea use; \n      vOut += this.encodeHTML(vHash[iID],vWrapCode);\n      vOut += \"</td>\";\n      vOut += \"</tr>\";\n    };\n};\nvOut += \"</table>\";\nreturn vOut;",
                "getEditTableHTML": "var vPrefixID = pPredixID || \"\";\nvar vOut = \"\";\nvar vHash = this.aVars;\nvOut += \"<table border=1>\";\nvar vRows = 1;\nvar vContent = \"\";\nvar vMaxRows = 10;\nvar vWrapCode = false;\nfor (var iID in vHash) {\n    if (vHash.hasOwnProperty(iID)) {\n      vContent = this.encodeHTML(vHash[iID],vWrapCode);\n      vRows = (vHash[iID].split(\"\\n\")).length;\n      if (vRows > vMaxRows) {\n          vRows = vMaxRows;\n      };\n      vOut += \"<tr>\";\n      vOut += \"<td>\";\n      vOut += \"<b>\"+iID+\"</b>\";\n      vOut += \"</td>\";\n      vOut += \"<td>\";\n      // second parameter vWrapCode = true for non textarea use; \n      vOut += \"<textarea id='\"+vPrefix+iID+\"'' cols='90' rows='\"+vRows+\"''>\";\n      vOut += vContent;\n      vOut += \"</textarea>\";\n      vOut += \"</td>\";\n      vOut += \"</tr>\";\n    };\n};\nvOut += \"</table>\";\nreturn vOut;",
                "calcSize": "var vRet = 0;\nif (this.aVars) {\n    var vHash = this.aVars;\n    for (var key in vHash) {\n        vRet++;\n    };\n} else {\n    console.log(\"ERROR: variable '\"+pVar+\"' does not exist in LinkParam\");\n};\nreturn vRet;",
                "encodeHTML": "var vValue = pValue || \"\";\nif (vValue != \"\") {\n    vValue = vValue.replace(/</g,\"&lt;\");\n    vValue = vValue.replace(/>/g,\"&gt;\");\n    vValue = vValue.replace(/&/g,\"&amp;\");\n};\nif (pWrapCode && (pWrapCode == true)) {\n    vValue = \"<pre><code>\"+vValue+\"</code></pre>\";\n};\nreturn vValue",
                "exists": "var vRet = false;\nif (pVar) {\n   vRet = this.aVars.hasOwnProperty(pVar)    \n};\nreturn vRet;\n"
            },
            "MethodParameter": {
                "init": "pDoc:Document",
                "parseURL": "pLink:String",
                "getURL": "pVarHash:Hash",
                "setValue": "pVar:String,pValue:String",
                "getValue": "pVar:String",
                "deleteValue": "pVar:String",
                "getLink4URL": "",
                "getParam4URL": "",
                "decodeParam": "pParam:String",
                "encodeParam": "pParam:String",
                "getTableHTML": "",
                "getEditTableHTML": "pPrefixID:String",
                "calcSize": "",
                "encodeHTML": "pValue:String,pWrapCode:Boolean",
                "exists": "pVar:String"
            },
            "tMethodName": "",
            "AttribAccess": {
                "size": "public",
                "aVars": "public",
                "aLink": "public"
            },
            "MethodAccess": {
                "init": "public",
                "parseURL": "public",
                "getURL": "public",
                "getLink4URL": "public",
                "getParam4URL": "public",
                "setValue": "public",
                "getValue": "public",
                "deleteValue": "public",
                "decodeParam": "public",
                "encodeParam": "public",
                "getTableHTML": "public",
                "getEditTableHTML": "public",
                "calcSize": "public",
                "encodeHTML": "public",
                "exists": "public"
            },
            "tMethodAccess": "public",
            "sClassList": "LinkParam"
        },
        "Editor4JSON": {
            "JSCC_type": "CLASS",
            "JSCC_init_date": "15.6.2017",
            "JSCC_mod_date": "",
            "tClassname": "Editor4JSON",
            "tSuperClassname": "",
            "sClassType": "Blue",
            "tAuthor": "Engelbert Niehaus",
            "tEMail": "niehaus@uni-landau.de",
            "tAttributes": "aEditor = null\naData = []\ncurrent = -1\naSchemaJSON = null",
            "tMethods": "init(pDOMID:String,pData:Array,pSchema:Hash)\nprev()\nnext()\ngoto()\nfirst()\nlast()\nedit()\nsetSchema(pSchemaJSON:Hash)\ngetSchema():Hash\nexport()\nexportData()\nexportSchema()",
            "sAttribList": "current",
            "tAttribName": "",
            "tAttribType": "",
            "tAttribComment": "",
            "tAttribDefault": "",
            "sAttribTypeList": "",
            "tMethodHeader": "exportSchema()",
            "tMethodName": "",
            "tMethodComment": "edit calls the JSON editor of Jeremy Dorn for the selected record. It sets the init value of the JSON editor.  ",
            "sMethodList": "exportSchema",
            "tMethodCode": "",
            "tLoopObject": "",
            "tLoopMethod": "",
            "AttribType": {
                "aEditor": "JSONEditor",
                "aData": "Array",
                "current": " ",
                "aSchemaJSON": " "
            },
            "AttribAccess": {
                "aEditor": "public",
                "aData": "public",
                "current": "public",
                "aSchemaJSON": "public"
            },
            "AttribDefault": {
                "aEditor": "null",
                "aData": "[]",
                "current": "-1",
                "aSchemaJSON": "null"
            },
            "AttribComment": {
                "aEditor": "is the instance of the JSON editor developed by Jeremy Dorn",
                "aData": "the attribute 'aData' is a array of JSON records that are edited with the JSON editor by Jeremy Dorn",
                "current": "the attribute 'current' stores the current selected index in the array, -1 means no JSON record selected in array or array is empty",
                "aSchemaJSON": "the attribute 'aSchemaJSON' stores in JSON schema that defines the structure of JSON records in the array"
            },
            "MethodParameter": {
                "init": "pDOMID:String,pData:Array,pSchema:Hash",
                "prev": "",
                "next": "",
                "goto": "",
                "first": "",
                "last": "",
                "edit": "",
                "setSchema": "pSchemaJSON:Hash",
                "getSchema": "",
                "export": "",
                "exportData": "",
                "exportSchema": ""
            },
            "MethodReturn": {
                "init": "",
                "prev": "",
                "next": "",
                "goto": "",
                "first": "",
                "last": "",
                "edit": "",
                "setSchema": "",
                "getSchema": "Hash",
                "export": "",
                "exportData": "",
                "exportSchema": ""
            },
            "MethodCode": {
                "init": "",
                "prev": "",
                "next": "",
                "goto": "",
                "first": "",
                "last": "",
                "edit": "",
                "setSchema": "",
                "getSchema": "",
                "export": "",
                "exportData": "",
                "exportSchema": ""
            },
            "MethodComment": {
                "init": "Comment for init",
                "prev": "Comment for prev",
                "next": "Comment for next",
                "goto": "Comment for goto",
                "first": "Comment for first",
                "last": "Comment for last",
                "edit": "edit calls the JSON editor of Jeremy Dorn for the selected record. It sets the init value of the JSON editor.  ",
                "setSchema": "Comment for setSchema",
                "getSchema": "Comment for getSchema",
                "export": "Comment for export",
                "exportData": "Comment for exportData",
                "exportSchema": "Comment for exportSchema"
            },
            "MethodAccess": {
                "init": "public",
                "prev": "public",
                "next": "public",
                "goto": "public",
                "first": "public",
                "last": "public",
                "edit": "public",
                "setSchema": "public",
                "getSchema": "public",
                "export": "public",
                "exportData": "public",
                "exportSchema": "public"
            },
            "sClassList": "Editor4JSON",
            "tMethodAccess": "public"
        }
    },
    "DBID2File": {
        "mydata": "db/mydata.js",
        "dummy": "../jquery/db/dummy.json"
    },
    "DatabaseList": {
        "dummy": {
            "test": "Test String",
            "number": 355,
            "visible": true
        },
        "mydata": {
            "JSCC_type": "DB",
            "init_date": "2017/05/00 8:26:58",
            "file": "db/mydata.js",
            "name": "mydata",
            "data": {},
            "schema": {}
        }
    },
    "ButtonList": {
        "QUIT": {
            "BUTTON_ID": "QUIT",
            "BUTTON_TITLE": "Quit",
            "tButtonDefHTML": "       <!-- header button: '___BUTTON_TITLE___' -->\n       <a href=\"#\" id=\"b___BUTTON_ID______COUNTER___\" onclick=\"if (confirm('Do you want to quit!')) window.close();\" data-theme=\"c\">Quit</a>",
            "counter": 1
        },
        "OK": {
            "BUTTON_ID": "OK",
            "BUTTON_TITLE": "OK",
            "tButtonDefHTML": "       <!-- header button: '___BUTTON_TITLE___' -->\n       <a href=\"#\" id=\"b___BUTTON_ID______COUNTER___\" onclick=\"vApp.event('___PAGE_ID___','___BUTTON_ID___','event___COUNTER___')\" data-theme=\"a\">OK</a>",
            "counter": 4
        },
        "CANCEL": {
            "BUTTON_ID": "CANCEL",
            "BUTTON_TITLE": "Cancel",
            "tButtonDefHTML": "       <!-- header button: '___BUTTON_TITLE___' -->\n       <a href=\"#\" class=\"b___BUTTON_ID___\" id=\"b___BUTTON_ID______COUNTER___\" onclick=\"vApp.event('___PAGE_ID___','___BUTTON_ID___','___COUNTER___');return false\" data-theme=\"a\">___BUTTON_TITLE___</a>\n",
            "counter": 5
        }
    },
    "SelectedTypePage": "SaveDialog",
    "PageTypeList": {
        "DefaultPage": {
            "page-type": "DefaultPage",
            "HEADER_BUTTON1": "home",
            "HEADER_BUTTON2": "",
            "template": "     <!-- Page: ___PAGE_ID___     Page Type: DefaultPage -->\n     <div data-role=\"page\" id=\"___PAGE_ID___\">\n         <div data-role=\"header\" data-position=\"fixed\">\n           ___HEADER_BUTTON1___\n            <h1>___PAGE_TITLE___</h1>\n           ___HEADER_BUTTON2___\n       </div>\n         <!-- /header -->\n       <div data-role=\"content\">\n         ___PAGE_CONTENT___\n       </div>\n    <!-- /page ID: ___PAGE_ID___ -->\n    </div>\n"
        },
        "WhiteTablePage": {
            "page-type": "WhiteTablePage",
            "HEADER_BUTTON1": "home",
            "HEADER_BUTTON2": "",
            "template": "     <!-- Page: ___PAGE_ID___     Page Type: DefaultPage -->\n     <div data-role=\"page\" id=\"___PAGE_ID___\">\n         <div data-role=\"header\" data-position=\"fixed\">\n           ___HEADER_BUTTON1___\n            <h1>___PAGE_TITLE___</h1>\n           ___HEADER_BUTTON2___\n       </div>\n         <!-- /header -->\n       <div data-role=\"content\">\n        <table  bgcolor=\"#FFFFFF\"  cellpadding=\"10\" width=\"100%\">\n            <tr>\n                <td>\n                  ___PAGE_CONTENT___\n                </td>\n            </tr>\n        </table>     \n       </div>\n    <!-- /page ID: ___PAGE_ID___ -->\n    </div>\n"
        },
        "MenuPage": {
            "page-type": "MenuPage",
            "HEADER_BUTTON1": "welcome",
            "HEADER_BUTTON2": "QUIT",
            "template": "     <!-- Page: ___PAGE_ID___     Page Type: MenuPage -->\n     <div data-role=\"page\" id=\"___PAGE_ID___\">\n         <div data-role=\"header\" data-position=\"fixed\">\n           ___HEADER_BUTTON1___\n            <h1>___PAGE_TITLE___</h1>\n           ___HEADER_BUTTON2___\n       </div>\n         <!-- /header -->\n       <div data-role=\"content\">\n          ___PAGE_CONTENT___\n          ___MENU_CONTENT___\n       </div>\n    <!-- /page ID: ___PAGE_ID___ -->\n    </div>\n"
        },
        "SubMenuPage": {
            "page-type": "SubMenuPage",
            "HEADER_BUTTON1": "home",
            "HEADER_BUTTON2": "",
            "template": "     <!-- Page: ___PAGE_ID___     Page Type: MenuPage -->\n     <div data-role=\"page\" id=\"___PAGE_ID___\">\n         <div data-role=\"header\" data-position=\"fixed\">\n           ___HEADER_BUTTON1___\n            <h1>___PAGE_TITLE___</h1>\n           ___HEADER_BUTTON2___\n       </div>\n         <!-- /header -->\n       <div data-role=\"content\">\n          ___PAGE_CONTENT___\n          ___MENU_CONTENT___\n       </div>\n    <!-- /page ID: ___PAGE_ID___ -->\n    </div>\n"
        },
        "OptionsPage": {
            "page-type": "OptionsPage",
            "HEADER_BUTTON1": "home",
            "HEADER_BUTTON2": "save",
            "template": "     <!-- Page: ___PAGE_ID___     Page Type: OptionsPage -->\n     <div data-role=\"page\" id=\"___PAGE_ID___\">\n         <div data-role=\"header\" data-position=\"fixed\">\n           ___HEADER_BUTTON1___\n            <h1>___PAGE_TITLE___</h1>\n           ___HEADER_BUTTON2___\n       </div>\n         <!-- /header -->\n       <div data-role=\"content\">\n          ___PAGE_CONTENT___\n       </div>\n    <!-- /page ID: ___PAGE_ID___ -->\n    </div>\n"
        },
        "ConfirmPage": {
            "page-type": "ConfirmPage",
            "HEADER_BUTTON1": "OK",
            "HEADER_BUTTON2": "CANCEL",
            "template": "     <!-- Page: ___PAGE_ID___     Page Type: ConfirmPage -->\n     <div data-role=\"page\" id=\"___PAGE_ID___\">\n         <div data-role=\"header\" data-position=\"fixed\">\n           ___HEADER_BUTTON1___\n            <h1>___PAGE_TITLE___</h1>\n           ___HEADER_BUTTON2___\n       </div>\n         <!-- /header -->\n       <div data-role=\"content\">\n          ___PAGE_CONTENT___\n          \n       </div>\n    <!-- /page ID: ___PAGE_ID___ -->\n    </div>\n"
        },
        "SaveDialog": {
            "page-type": "SaveDialog",
            "HEADER_BUTTON1": "home",
            "HEADER_BUTTON2": "CANCEL",
            "template": "     <!-- Page: ___PAGE_ID___     Page Type: SaveDialog -->\n     <div data-role=\"page\" id=\"___PAGE_ID___\">\n         <div data-role=\"header\" data-position=\"fixed\">\n           ___HEADER_BUTTON1___\n            <h1>___PAGE_TITLE___</h1>\n           ___HEADER_BUTTON2___\n       </div>\n         <!-- /header -->\n       <div data-role=\"content\">\n          ___PAGE_CONTENT___\n       </div>\n    <!-- /page ID: ___PAGE_ID___ -->\n    </div>\n"
        },
        "LoginPage": {
            "page-type": "LoginPage",
            "HEADER_BUTTON1": "home",
            "HEADER_BUTTON2": "CANCEL",
            "template": "     <!-- Page: ___PAGE_ID___     Page Type: LoginPage -->\n     <div data-role=\"page\" id=\"___PAGE_ID___\">\n         <div data-role=\"header\" data-position=\"fixed\">\n           ___HEADER_BUTTON1___\n            <h1>___PAGE_TITLE___</h1>\n           ___HEADER_BUTTON2___\n       </div>\n         <!-- /header -->\n       <div data-role=\"content\">\n          ___PAGE_CONTENT___\n       </div>\n    <!-- /page ID: ___PAGE_ID___ -->\n    </div>\n"
        }
    },
    "PageList": {
        "welcome": {
            "PAGE_ID": "welcome",
            "PAGE_TITLE": "Welcome",
            "page-type": "DefaultPage",
            "parent-id": "home",
            "content": "Content of ___PAGE_TITLE___ (ID:'___PAGE_ID___')"
        },
        "home": {
            "PAGE_ID": "home",
            "PAGE_TITLE": "Home",
            "page-type": "MenuPage",
            "parent-id": "",
            "content": "<h1>DisApp Tool</h1>"
        },
        "setting": {
            "PAGE_ID": "setting",
            "PAGE_TITLE": "Settings",
            "page-type": "ConfirmPage",
            "parent-id": "home",
            "content": "Content of ___PAGE_TITLE___ (ID:'___PAGE_ID___')"
        },
        "load": {
            "PAGE_ID": "load",
            "PAGE_TITLE": "Load JSON",
            "page-type": "ConfirmPage",
            "parent-id": "home",
            "content": "<h2>___PAGE_TITLE___</h2>\n<input class=\"button\" type=\"file\" id=\"myImportFile\" >\n<input name=\"bImportProject\" value=\"Import JSON\" onclick=\"vApp.aDatabaseList.importJSON('myImportFile')\" type=\"button\">\n\n"
        },
        "save": {
            "PAGE_ID": "save",
            "PAGE_TITLE": "Save JSON",
            "page-type": "SaveDialog",
            "parent-id": "home",
            "content": "Content of ___PAGE_TITLE___ (ID:'___PAGE_ID___')"
        },
        "analysis": {
            "PAGE_ID": "analysis",
            "PAGE_TITLE": "Analysis",
            "page-type": "SubMenuPage",
            "parent-id": "home",
            "content": "Content of ___PAGE_TITLE___ (ID:'___PAGE_ID___')"
        },
        "heatmap": {
            "PAGE_ID": "heatmap",
            "PAGE_TITLE": "Heatmap",
            "page-type": "ConfirmPage",
            "parent-id": "analysis",
            "content": "Content of ___PAGE_TITLE___ (ID:'___PAGE_ID___')"
        },
        "timeseries": {
            "PAGE_ID": "timeseries",
            "PAGE_TITLE": "Time Series",
            "page-type": "ConfirmPage",
            "parent-id": "analysis",
            "content": "Content of ___PAGE_TITLE___ (ID:'___PAGE_ID___')"
        },
        "data": {
            "PAGE_ID": "data",
            "PAGE_TITLE": "Data",
            "page-type": "SubMenuPage",
            "parent-id": "home",
            "content": "Content of ___PAGE_TITLE___ (ID:'___PAGE_ID___')"
        },
        "userlocation": {
            "PAGE_ID": "userlocation",
            "PAGE_TITLE": "User Location",
            "page-type": "DefaultPage",
            "parent-id": "data",
            "content": "Content of ___PAGE_TITLE___ (ID:'___PAGE_ID___')"
        },
        "editdata": {
            "PAGE_ID": "editdata",
            "PAGE_TITLE": "Edit Data",
            "page-type": "DefaultPage",
            "parent-id": "data",
            "content": "<h2>___PAGE_TITLE___</h2> \nThe current data was exported and cleaned by Dr. Ajit N. Babu CAGH. Press Pencil button to edit the data.\n<button id=\"bEditFileListJSON\" onclick=\"vApp.aJSONEditor.openWin(vDataJSON['ovitrapmpi_schema'],vDataJSON['ovitrapmpi_data']);return false\">\n    <i class=\"fa fa-pencil\"></i> Edit\n</button>\n            \n\n(ID:'___PAGE_ID___')"
        },
        "quit": {
            "PAGE_ID": "quit",
            "PAGE_TITLE": "Quit",
            "page-type": "DefaultPage",
            "parent-id": "home",
            "content": "Content of ___PAGE_TITLE___ (ID:'___PAGE_ID___')"
        }
    },
    "ElementsDBList": {
        "DB_YESNO": "<select id=\"___DB_ID___\" name=\"___DB___\" onload=\"this.value = vApp.db.getVal('___DB___','___DB_ID___','___DB_ID_VALUE___')\" onchange=\"vApp.db.setVal('___DB___','___DB_ID___',this.value)\"><option>YES</option><option>NO</option></select>",
        "DB_HIDDEN": "<input type=\"hidden\" id=\"___DB_ID___\" name=\"___DB___\" onload=\"this.value = vApp.db.getVal('___DB___','___DB_ID___','___DB_ID_VALUE___')\" onchange=\"vApp.db.setVal('___DB___','___DB_ID___',this.value)\"><option>YES</option><option>NO</option></select>",
        "DB_TEXTAREA": "<textarea id='___DB_ID___' name='___DB___' onload=\"this.value = vApp.db.getVal('___DB___','___DB_ID___','___DB_ID_VALUE___')\" onchange=\"vApp.db.setVal('___DB___','___DB_ID___',this.value)\"></textarea>"
    },
    "GlobalLibList": [
        {
            "file": "js/bootstrap.js",
            "import": true
        },
        {
            "file": "js/arrayhash.js",
            "import": true
        },
        {
            "file": "js/filesaver.js",
            "import": true
        },
        {
            "file": "js/iframe.js",
            "import": true
        },
        {
            "file": "js/localstorage.js",
            "import": true
        },
        {
            "file": "js/linkparam.js",
            "import": true
        },
        {
            "file": "js/lodash.js",
            "import": true
        },
        {
            "file": "js/jsoneditor.js",
            "import": true
        },
        {
            "file": "js/predbedit.js",
            "import": true
        },
        {
            "file": "js/string.js",
            "import": true
        },
        {
            "file": "js/writedom.js",
            "import": true
        }
    ],
    "FileList": {
        "index.html": {
            "tFilename": "index.html",
            "sAppClassHTML": "App",
            "tAppInitCall": "init(document,vDataJSON)",
            "tPageIDs": [
                "login"
            ],
            "elements": {
                "HTML_TITLE": "File index.html - Content of element HTML_TITLE",
                "SERVER_URL": "https://niehbert.github.io/JavascriptClassCreator/srv/loginemu.html",
                "USERNAME": "myuser",
                "SESSION": "File index.html - Content of element SESSION",
                "DATABASE": "File index.html - Content of element DATABASE"
            },
            "ImportList": [
                {
                    "file": "js/login.js",
                    "import": true
                },
                {
                    "file": "js/geolocation.js",
                    "import": true
                }
            ],
            "tElementFileIDs": "HTML_TITLE|SERVER_URL|USERNAME|SESSION|DATABASE",
            "tElementID": "HTML_TITLE",
            "sElementsFileList": "HTML_TITLE",
            "tElementHTML": "File index.html - Content of element HTML_TITLE",
            "sElementFileList": "HTML_TITLE"
        },
        "app.html": {
            "tFilename": "app.html",
            "sAppClassHTML": "",
            "tAppInitCall": "init(document,vDataJSON)",
            "tPageIDs": [
                "welcome",
                "home",
                "quit",
                "analysis"
            ],
            "elements": {
                "HTML_TITLE": "File app.html - Content of element HTML_TITLE",
                "SERVER_URL": "https://niehbert.github.io/JavascriptClassCreator/srv/submitemu.html",
                "USERNAME": "File app.html - Content of element USERNAME",
                "SESSION": "File app.html - Content of element SESSION",
                "DATABASE": "File app.html - Content of element DATABASE"
            },
            "ImportList": [
                {
                    "file": "js/qrcode.js",
                    "import": true
                },
                {
                    "file": "js/geolocation.js",
                    "import": true
                }
            ],
            "tElementFileIDs": "HTML_TITLE|SERVER_URL|USERNAME|SESSION|DATABASE",
            "tElementID": "HTML_TITLE",
            "sElementsFileList": "",
            "tElementHTML": "File app.html - Content of element HTML_TITLE",
            "sElementFileList": "HTML_TITLE"
        },
        "submit.html": {
            "sAppClassHTML": "App",
            "tAppInitCall": "init(document,vDataJSON)",
            "tPageIDs": [
                "welcome",
                "home",
                "quit",
                "newpage"
            ],
            "elements": {
                "HTML_TITLE": "File submit.html - Content of element HTML_TITLE",
                "SERVER_URL": "https://niehbert.github.io/JavascriptClassCreator/srv/submitemu.html",
                "USERNAME": "File submit.html - Content of element USERNAME",
                "SESSION": "File submit.html - Content of element SESSION",
                "DATABASE": "File submit.html - Content of element DATABASE"
            },
            "ImportList": [
                {
                    "file": "js/submit.js",
                    "import": true
                },
                {
                    "file": "js/geolocation.js",
                    "import": true
                }
            ]
        }
    },
    "BasicClasses": {
        "Boolean": "false",
        "String": "\"\"",
        "Integer": "0",
        "Float": "0.0",
        "Array": "[]",
        "Hash": "{}",
        "Object": "null",
        "RegularExp": "/mypattern/g",
        "Document": "document",
        "Function": "function () {}"
    }
}
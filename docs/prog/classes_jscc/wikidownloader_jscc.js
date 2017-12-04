vJSCC_DB['ClassList']['WikiDownloader'] = {
    "JSCC_type": "CLASS",
    "JSCC_init_date": "18.10.2017",
    "JSCC_mod_date": "2017/11/29 15:23:23",
    "tClassname": "WikiDownloader",
    "tSuperClassname": "",
    "sClassType": "Default",
    "tAuthor": "Engelbert Niehaus",
    "tEMail": "niehaus@uni-landau.de",
    "tAttributes": "aSource = \"\"\naURL = \"https://en.wikiversity.org/w\"\naLanguage = \"en\"\naPathAPI = \"/w\"\naDomain = \".wikiversity.org\"\naOutFormat = \"WikiLocal\"\naOut = \"WikiLocal\"",
    "tMethods": "init(pLanguage:String,pDomain:String,pPathAPI:String)\ndownload()\nconvertLink(pLink:String,pType:String):String\nreplaceWikiMath()\nsetSource(pText:String)\ngetSource():String\nconvertLink2Web()\ncreateMediaArray()\ndownloadZIP()\nconvertMedia2Local()\ngetOutput():Server",
    "sAttribList": "aOut",
    "tAttribName": "",
    "tAttribType": "",
    "tAttribComment": "",
    "tAttribDefault": "",
    "sAttribTypeList": "",
    "tMethodHeader": "convert()",
    "tMethodName": "",
    "tMethodComment": "convert replaces links to media and other resources to the appropriate remote or local resources (weblinks, images, audio, video, ...). Uses as input this.aSource, copies the source text to this.aOut and performs conversion to the aOut text.",
    "sMethodList": "convert",
    "tMethodCode": "this.aOut = this.aSource\n// perform math conversion\n\n// perform web link conversion according to this.aOutFormat = \"Web\" or \"Local\"\n\n// perform media link conversion",
    "tLoopObject": "",
    "tLoopMethod": "",
    "AttribType": {
        "aSource": "String",
        "aLanguage": "String",
        "aAPI": "String",
        "aURL": "String",
        "aPathAPI": "String",
        "aDomain": "String",
        "aOutFormat": "String",
        "aOut": "String"
    },
    "AttribAccess": {
        "aSource": "public",
        "aLanguage": "public",
        "aAPI": "public",
        "aURL": "public",
        "aPathAPI": "public",
        "aDomain": "public",
        "aOutFormat": "public",
        "aOut": "public"
    },
    "AttribDefault": {
        "aSource": "\"\"",
        "aURL": "\"https://en.wikiversity.org/w\"",
        "aLanguage": "\"en\"",
        "aPathAPI": "\"/w\"",
        "aDomain": "\".wikiversity.org\"",
        "aOutFormat": "\"WikiLocal\"",
        "aOut": "\"WikiLocal\""
    },
    "AttribComment": {
        "aSource": "Downloaded Source - stored in LocalStorage after download",
        "aLanguage": "the attribute 'aLanguage' stores the MediaWiki Language ID",
        "aAPI": "Downloaded Source - stored in LocalStorage after download",
        "aURL": "the attribute 'aURL' stores in 'String' ... ",
        "aPathAPI": "the attribute 'aPathAPI' stores the API path - index.php is appended for call",
        "aDomain": "the attribute 'aDomain' stores in domain part of the URL",
        "aOutFormat": "the attribute 'aDomain' stores in domain part of the URL",
        "aOut": "the attribute 'aDomain' stores in domain part of the URL"
    },
    "MethodParameter": {
        "init": "pLanguage:String,pDomain:String,pPathAPI:String",
        "download": "",
        "convertLink": "pLink:String,pType:String",
        "replaceWikiMath": "",
        "setSource": "pText:String",
        "getSource": "",
        "convertLink2Web": "",
        "createMediaArray": "",
        "downloadZIP": "",
        "convertMedia2Local": "",
        "getOutput": "",
        "convert": ""
    },
    "MethodReturn": {
        "init": "",
        "download": "",
        "convertLink": "String",
        "replaceWikiMath": "",
        "setSource": "",
        "getSource": "String",
        "convertLink2Web": "",
        "createMediaArray": "",
        "downloadZIP": "",
        "convertMedia2Local": "",
        "getOutput": "Server",
        "convert": ""
    },
    "MethodCode": {
        "init": "this.aLanguage = pLanguage || \"en\";\nthis.aDomain = pDomain || \"wikiversity.org\";\nthis.aPathAPI = pPathAPI || \"/w\";",
        "download": "",
        "convertLink": " ",
        "replaceWikiMath": "",
        "setSource": "",
        "getSource": "return this.aSource || \" \";",
        "convertLink2Web": "",
        "createMediaArray": "",
        "downloadZIP": "",
        "convertMedia2Local": "",
        "getOutput": "this.convert();\nreturn this.aOut;",
        "convert": "this.aOut = this.aSource\n// perform math conversion\n\n// perform web link conversion according to this.aOutFormat = \"Web\" or \"Local\"\n\n// perform media link conversion\n\n    if (this.aSource) {\n        var data = this.aSource;\n        makeProjectDirs(vProjectDir); //audio, video, config, images\n        makedirpath(vProjectDir);\n        var vPath = getProjectDir(getValueDOM(\"inputWEBPROJECT\"));\n        var vFileBase = getValueDOM('wikiARTICLE');\n        vFileBase = filenameCorrection(vFileBase);\n        var vFilename = vFileBase + \".wiki\";\n        var vFileSource =  vFileBase + \"_source.wiki\";\n        var vFileJSON = vPath + vSep + \"config\" + vSep + vFileBase + \"_wiki.json\"\n        var vInputFile = vPath + vSep + vFilename;\n        write2innerHTML(\"inputFILE\",vInputFile);\n        var vOutFile = createOutputFile(vInputFile,getValueDOM(\"outputFORMAT\"));\n        write2innerHTML(\"outputFILE\",vOutFile);\n        //save Source File of Wiki\n        saveFile(vPath + vSep + vFileSource,data);\n        // convert the media links in the Wiki Source\n        var vWikiJSON = {};\n        vWikiJSON[\"url\"] = getValueDOM('inputSERVER')+\"/wiki/\"+getValueDOM('wikiARTICLE');\n        var now = new Date();\n        vWikiJSON[\"date\"] = now.toJSON();\n        data = convertWiki2Local(data,vWikiJSON);\n        data = replaceWikiMath(data);\n        saveJSON(vFileJSON,vWikiJSON);\n        write2value(\"inputEDITOR\",data);\n        console.log(\"Write Wiki Content of '\"+getValueDOM('wikiARTICLE')+\"' to Path '\"+vPath+\"'\");\n        saveFile(vInputFile,data);\n        alert(\"Wiki Article from '\"+getValueDOM('wikiARTICLE')+\"' downloaded from http://\"+getValueDOM('inputSERVER')+getValueDOM('pathAPI'));\n      } else {\n        alert(\"DOWNLOAD WARNING: Wiki Article from '\"+getValueDOM('wikiARTICLE')+\"' could not be downloaded from http://\"+getValueDOM('inputSERVER')+getValueDOM('pathAPI'));\n      };\n"
    },
    "MethodComment": {
        "init": "pLanguage = \"en\" pDomain=\"wikiversity.org\" pPathAPI=\"/w\" defines the source from which the Articles will be downloaded",
        "download": "Comment for download",
        "convertLink": "convertLink(pLink) converts the link pLink into the destination format",
        "replaceWikiMath": "Comment for replaceWikiMath",
        "setSource": "Comment for setSource",
        "getSource": "getSource() returns the downloaded source text from the MediaWiki",
        "convertLink2Web": "convertLink2Web() operates on the donwloaded sources aSource and converts the Wiki links in the source into links referencing Web resources.",
        "createMediaArray": "Comment for createMediaArray",
        "downloadZIP": "what does downloadZIP do?",
        "convertMedia2Local": "convertMedia2Local() converts the media file links to local file",
        "getOutput": "getOutput() return the generated output. getOutput() calls the convert() method, so that \nlinks are converted according to output settings\n- local media\n- remote media",
        "convert": "convert replaces links to media and other resources to the appropriate remote or local resources (weblinks, images, audio, video, ...). Uses as input this.aSource, copies the source text to this.aOut and performs conversion to the aOut text."
    },
    "MethodAccess": {
        "init": "public",
        "download": "public",
        "convertLink": "public",
        "replaceWikiMath": "public",
        "setSource": "public",
        "getSource": "public",
        "convertLink2Web": "public",
        "createMediaArray": "public",
        "downloadZIP": "public",
        "convertMedia2Local": "public",
        "getOutput": "public",
        "convert": "public"
    },
    "sClassList": "WikiDownloader",
    "tMethodAccess": "public",
    "JSCC_version": "1",
    "sAttribName": "aOut"
}
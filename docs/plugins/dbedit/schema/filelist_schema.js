vDataJSON["FileList_schema"] = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "additionalProperties": true,
    "title": "FileList",
    "type": "array",
    "id": "https://niebert.github.io/json-editor",
    "format": "tabs",
    "items": {
        "title": "File",
        //"headerTemplate": "{{i}} - {{self.tFilename}}",
        "headerTemplate": "{{self.tFilename}}",
        "type": "object",
        "id": "/items",
        "defaultProperties": [
            "tFilename",
            "tAppInitCall",
            "sAppClassHTML",
            "tTemplateHTML",
            "tPageIDs",
            "elements",
            "ImportList"
        ],
        "properties": {
            "tFilename": {
                "type": "string",
                "id": "/items/properties/tFilename",
                "title": "HTML File",
                "default": "index.html",
                "format": "text",
                "description": "This is the filename, that is used in app LSAC"
            },
            "sAppClassHTML": {
                "type": "string",
                "id": "/items/properties/sAppClassHTML",
                "title": "App",
                "default": "App",
                "format": "text",
                "description": "An instance of this class is created in the HTML file and the an init method is called."
            },
            "tAppInitCall": {
                "type": "string",
                "id": "/items/properties/tAppInitCall",
                "title": "App initialize",
                "default": "init(document,vDataJSON)",
                "format": "text",
                "description": "An instance of this class is created in the HTML file and the an init method is called."
            },
            "tTemplateHTML": {
                "type": "string",
                "hidden": true,
                "id": "/items/properties/tTemplateHTML",
                "title": "Template",
                "default": "tpl/Default.html",
                "format": "text",
                "description": "This is a template that is used as HTML wrapper for all pages"
            },
            "tPageIDs": {
                "title": "Pages in File",
                "type": "array",
                "format": "table",
                "id": "/items/properties/tPageIDs",
                "uniqueItems":true,
                "items": {
                	"title":"Page",
                	"$ref": "#/definitions/pages"
                },
                "description": "Select root page for HTML file in App, connected pages are added to the HTML file as well."
            },
            "elements": {
                "type": "object",
                "id": "/items/properties/elements",
                "title" :"Replace Markers",
                "collapsed": true,
                "defaultProperties": [
                    "HTML_TITLE",
                    "SERVER_URL",
                    "USERNAME",
                    "SESSION",
                    "DATABASE"
                ],
                "properties": {
                    "HTML_TITLE": {
                        "type": "string",
                        "id": "/items/properties/elements/properties/HTML_TITLE",
                        "title": "Title HTML file:",
                        "default": "HTML Title of File",
                        "format": "text",
                        "description": "This is the title of HTML file."
                    },
                    "SERVER_URL": {
                        "type": "string",
                        "id": "/items/properties/elements/properties/SERVER_URL",
                        "title": "Server URL:",
                        "default": "https://niehbert.github.io/JavascriptClassCreator/srv/loginemu.html",
                        "format": "text",
                        "description": "This definition replaces the marker ___SERVER_URL___ with a specific URL for your server backend"
                    },
                    "USERNAME": {
                        "type": "string",
                        "id": "/items/properties/elements/properties/USERNAME",
                        "title": "User Name:",
                        "default": "myuser",
                        "format": "text",
                        "description": "This definition replaces the marker ___USERNAME___ to authenticate with a specific backend default user name for the server backend."
                    },
                    "SESSION": {
                        "type": "string",
                        "id": "/items/properties/elements/properties/SESSION",
                        "title": "Session",
                        "default": "<input type=\"hidden\" name=\"session\" id=\"session\" value=\"\">",
                        "format": "text",
                        "description": "This replace definition replace a marke ___SESSION___ with a HTML element for handling the session."
                    },
                    "DATABASE": {
                        "type": "string",
                        "id": "/items/properties/elements/properties/DATABASE",
                        "title": "Database ",
                        "default": "mydata.db",
                        "format": "text",
                        "description": "THe marker ___DATABASE___ will be replaced with the definition. It can be used for a database name to store the app data."
                    }
                }
            },
            "ImportList": {
                "type": "array",
                "id": "/items/properties/ImportList",
                "type": "array",
                "title": "Import Libraries",
                "format": "table",
                "uniqueItems":true,
                "items": {
                  "type": "object",
                  "title": "Library",
                  "properties": {
                    "file": {
                      "type": "string",
                      "default": "js/mylib.js"
                    },
                    "import": {
                      "type": "boolean",
                      "default": true
                    }
                  }
                }
            }
        }
    },
    "definitions": {
      "pages" : {
        "type": "string",
        "id": "/definitions/pages",
        "title": "Pages",
        "default": "home",
        "enum": [
          "home",
          "settings",
          "load",
          "save",
          "quit"
        ]
      }
    }
}

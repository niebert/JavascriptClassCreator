vDataJSON["Class_schema"] = {
            "type": "object",
            "title": "Class",
            "properties": {
                "name": {
                    "title": "Name:",
                    "type": "string",
                    "default": "MyClass"
                },
                "comment": {
                     "title": "Comment:",
                   	 "$ref": "#/definitions/comment",
        			       "default": "What does the class do?"
                },
                "attributes": {
                  "title": "Attribute",
                  "type": "array",
                  "format":"tabs",
                  "uniqueItems":true,
                  "items": {
                      "title": "Attrib",
                      "type": "object",
                      "uniqueItems":true,
                      //"headerTemplate": "{{i1}}: {{self.name}}",
                      "headerTemplate": "{{self.name}}",
                      "properties": {
                        "visibility": {
                            "title": "Visibility",
                            "$ref": "#/definitions/visibility"
                        },
                        "name": {
                              "type": "string",
                              "minLength": 2,
                              "default": "aMyAttrib"
                        },
                        "init": {
                          "type": "string",
                          "default": "null"
                        },
                        "class": {
                              "title": "Class",
                              "$ref": "#/definitions/selectclass"
                        },
                        "comment": {
                              "title": "Comment",
                              "$ref": "#/definitions/comment",
                              "default": "What do you stored in this attribute?"
                        }
                      }
        			     }
                },
                "methods": {
                      "title": "Methods",
                      "type": "array",
                      "format": "tabs",
                      "uniqueItems":true,
                      "items" : {
                        //"headerTemplate": "{{i1}}: {{self.name}}()",
                        "headerTemplate": "{{self.name}}()",
                        "type": "object",
                        "title":"Method",
                        "id": "method",
                        "defaultProperties": [
                          "visibility",
                          "name",
                          "parameter",
                          "return",
                          "comment",
                          "jscode"
                        ],
                        "properties": {
                              "visibility": {
                                    "title": "Visibility",
                                    "$ref": "#/definitions/visibility"
                               },
                               "name": {
                                    "type": "string",
                                    "minLength": 1,
                                    "default": "myMethod"
                               },
                               "parameter": {
                                      "type": "array",
                                      "title":"Parameter",
                                      "format":"table",
                                      "uniqueItems": true,
                                      "items": {
                                            "type": "object",
                                            "properties": {
                                                   "name": {
                                                           "type":"string",
                                                           "title":"Parameter",
                                                           "minLength": 1,
                                                           "default": "pVar"
                                                    },
                                                    "class": {
                                                           "title":"Class",
                                                           "$ref":"#/definitions/selectclass"
                                                    }
                                            }
                                      }
                               },
                               "return": {
                                     "title":"Return",
                                     "$ref":"#/definitions/selectclass"
                               },
                               "comment": {
                                     "title": "Comment",
                                     "$ref": "#/definitions/comment",
                                      "default": "What kind of process does this method perform?"
                               },
                               "jscode": {
                                   "title": "Code",
                                   "type": "string",
                                   //"format": "textarea"
                                   "format": "javascript"
                               }
                        }
        			      }
                }
            },
            "definitions":{
            	"selectclass": {
            		"type":"string",
            		"enum":[
            			"",
            			"String",
            			"Boolean",
            			"Integer",
            			"Float",
            			"Array",
            			"Hash",
            			"RegExp",
            			"Function"
            		],
            	},
            	"comment": {
                    "title": "Comment:",
                    "type": "string",
                    "format": "textarea"
                },
        		  "visibility": {
                "type": "string",
                "enum": [
                  "public",
                  "private"
                ]
        		  }
            }
        }

vJSON_JS['ClassList']['DatabaseList'] = {
    "tClassname": "DatabaseList",
    "tSuperClassname": "",
    "sClassType": "Green",
    "JSCC_mod_date": "",
    "tAuthor": "Engelbert Niehaus",
    "tEMail": "niehaus@uni-landau.de",
    "tAttributes": "aDBListHash = {}",
    "tMethods": "init(pDatabase:Hash)\nload()\nsave()",
    "sAttribList": "aDBListHash",
    "tAttribName": "aDBListHash",
    "tAttribType": "Hash",
    "tAttribComment": "the attribute 'aDBListHash' stores in 'Hash' ... ",
    "tAttribDefault": "{}",
    "sAttribTypeList": "Hash",
    "tMethodHeader": "load()",
    "tMethodComment": "pDatabase is a Hash of Databases loaded by the Javascript-Tag in the underlying HTML file. \ninit() Loops over all Databases in Hash and creates a Database object for DBs.",
    "tMethodCode": "for (var vKey in this.aDBList) {\n  this.aDBList[vKey].load();\n};\n",
    "sMethodList": "init",
    "tArrayLoop": "this.aDBList",
    "tMethodLoop": "load()",
    "AttribName": {},
    "AttribDefault": {
        "aDBListHash": "{}"
    },
    "AttribType": {
         
        "aDBListHash": "Hash"
    },
     
    "MethodReturn": {
        "init": "",
        "load": "",
        "save": ""
    },
    "MethodCode": {
        "init": "if (pDatabase) {\n    for (vKey in pDatabase) {\n      aDBList[vKey] = new Database();  \n      aDBList[vKey].init(pDatabase[vKey]);\n    };\n}  ",
        "load": "for (var vKey in this.aDBList) {\n  this.aDBList[vKey].load();\n};\n",
        "save": "for (var vKey in this.aDBList) {\n  this.aDBList[vKey].save();\n};\n"
    },
    "MethodComment": {
        "init": "pDatabase is a Hash of Databases loaded by the Javascript-Tag in the underlying HTML file. \ninit() Loops over all Databases in Hash and creates a Database object for DBs.",
        "load": "pDatabase is a Hash of Databases loaded by the Javascript-Tag in the underlying HTML file. \ninit() Loops over all Databases in Hash and creates a Database object for DBs.",
        "save": "save all Databases in the List of all databases defined by this.aDBList"
    },
    "AttribComment": {
        "aDBList:Hash": "Hash of all Databases. Elements of Hash are objects of class Database()",
        "aDBListHash": "the attribute 'aDBListHash' stores in 'Hash' ... "
    },
    "MethodParameter": {
        "init": "pDatabase:Hash",
        "load": "",
        "save": ""
    },
    "aDBListHash": "Hash of all Databases. Elements of Hash are objects of class Database()",
    "JSCC_type": "CLASS",
    "JSCC_version": "1",
    "JSCC_mod_date": "2017/04/03 17:58:17"
}
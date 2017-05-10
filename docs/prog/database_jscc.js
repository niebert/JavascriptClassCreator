vJSON_JS['ClassList']['Database'] = {
    "tClassname": "Database",
    "tSuperClassname": "",
    "sClassType": "Green",
    "tDate": "28.4.2017",
    "tAuthor": "Engelbert Niehaus",
    "tEMail": "niehaus@uni-landau.de",
    "tAttributes": "",
    "tMethods": "init(pDB)\ncheckFormat()\nload():Boolean\nsave():Boolean",
    "sAttribList": "aDB",
    "tAttribName": "",
    "tAttribType": "",
    "tAttribComment": "",
    "tAttribDefault": "",
    "sAttribTypeList": "",
    "tMethodHeader": "load():Boolean",
    "tMethodComment": "loads the Database from LocalStorage of the browser and store the DB in this.aDB. \nAfter load it calls checkFormat() to check, if the format of the database is still \nthe same as in this.aSourceDB. The checkFormat() is introduced to make the App robust against alterations of \nthe database format from the App-provider.\n",
    "sMethodList": "load",
    "tMethodCode": "",
    "tArrayLoop": "",
    "tMethodLoop": "",
    "AttribName": {},
    "AttribDefault": {
        "aSourceDB": "{}",
        "aDB": "{}"
    },
    "AttribType": {
        "aSourceDB": "Hash",
        "aDB": "Hash"
    },
    "MethodName": {},
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
    "JSCC_mod_date": "2017/04/03 17:32:38"
}
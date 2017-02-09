
//----JSON DB: disapp.db -----
var vJSONDB =  {
  "database": "disapp.db",
  "name":"vJSONDB",
  "DBtitle": "DisApp Short Questionnaire",
  "DBsubtitle": "Database Prototype",
  "submiturl": "http://www.mydisappserver.org/appdb/submit.php",
  "DBformat": ["recdate","autonr","geolocation","countapprox1","yesnodontknow1","countapprox2","peopleapproxii","countapprox3","sampledate","moddate","usergroup","email" ],
  "DBtitles": ["Record Date","No.",
            "Geo Location",
            "How many mosquitos have you noticed (seen or heard)  <font color='red'>during the last two days while you were at home</font>?",
            "Have you seen mosquitos with white stripes on it's body and legs during  <font color='red'>the last two days while you were at home</font>",
            "Approximately how many mosquito bites have you received in the <font color='red'>last two days while you were at home</font>?",
            "Including you, how many members of your family <font color='red'>while staying with you</font> have gotten dengue in the <font color='red'>last one year</font>?",
            "Have you heard of any cases of Dengue in your neighborhood in <font color='red'>the last one month</font>, including cases in local hospitals?",
            "Sample Date","Modify Date","User Group","e-Mail" ],
  "DBmandatory": [false,false,true,true,true,true,true,true,false,false,false,false],
  "DBvisible": [false,false,true,true,true,true,true,true,false,false,false,false],
  "DBcolinput": {
     "recdate": "<input type=\"text\" id=\"app_recdate\" name=\"recdate\" size=\"80\" value=\"\" />",
     "autonr": "<input type=\"text\" id=\"app_autonr\" name=\"autonr\" size=\"80\" value=\"\" />",
     "geolocation": "<table border=\"0\"><tr><td>   <button onclick=\"getCurrentGeolocation();return false\"> GPS </button></td><td><input type=\"text\"  id=\"app_geolocation\" name=\"geolocation\"  size=\"22\" value=\"GPS undefined\"></td></tr></table>",
     "countapprox1": "<SELECT id=\"app_countapprox1\" name=\"countapprox1\" size=\"1\"><OPTION></OPTION><OPTION value='0.0'>None </OPTION><OPTION value='0.33333'>Very few (1-2)</OPTION><OPTION value='0.666666'>Some (3-10)</OPTION><OPTION value='1.0'>High  (more than 10)</OPTION><OPTION value='NA'>Don`t know</OPTION></SELECT>",
     "yesnodontknow1": "<select  id=\"app_yesnodontknow1\" name=\"yesnodontknow1\" size=\"1\"><OPTION></OPTION><option value='1.0'>Yes</option><option value='0.0'>No</option><option value='NA'>don`t know</option></select> <p align='center'><br><img width='90%' src='images/aedes_albopictus.jpg'></p>",
     "countapprox2": "<SELECT  id=\"app_countapprox2\" name=\"countapprox2\" size=\"1\"><OPTION></OPTION><OPTION value='0.0'>None </OPTION><OPTION value='0.33333'>Very few (1-2)</OPTION><OPTIONv alue='0.666666'>Some (3-10)</OPTION><OPTION value='1.0'>High  (more than 10)</OPTION><OPTION value='NA'>Don`t know</OPTION></SELECT>",
     "peopleapproxii": "<SELECT  id=\"app_peopleapproxii\" name=\"peopleapproxii\" size=\"1\"><OPTION></OPTION><OPTION value='0.0'>No one </OPTION><OPTION value='0.33333'>1</OPTION><OPTION value='0.666666'>2</OPTION><OPTION value='1.0'>more than 2</OPTION><OPTION value='NA'>Don`t know</OPTION></SELECT>",
     "countapprox3": "<SELECT  id=\"app_countapprox3\" name=\"countapprox3\" size=\"1\"><OPTION></OPTION><OPTION value='0.0'>None </OPTION><OPTION value='0.25'>Very few (1-2)</OPTION value='0.5'><OPTION value='0.75'>Some (3-10)</OPTION><OPTION value='1.0'>High  (more than 10)</OPTION><OPTION value='NA'>Don`t know</OPTION></SELECT>",
     "sampledate": "<input  id=\"app_sampledate\" type=\"text\" name=\"sampledate\" size=\"80\" value=\"\" />",
     "moddate": "<input  id=\"app_moddate\" type=\"text\" name=\"moddate\" size=\"80\" value=\"\" />",
     "usergroup": "<input  id=\"app_\" type=\"text\" name=\"usergroup\" size=\"80\" value=\"\" />",
     "email": "<input  id=\"app_email\" type=\"text\" name=\"email\" size=\"80\" value=\"\" />"
     },
  "DBlines": [],
  "DBsubmitted": [],
  "LastSyncLine": -1,
  "EditIndex": -1
}

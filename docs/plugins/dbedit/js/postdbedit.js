// the seed JSON is for standalone check of the plugin and in case the
// JSON-editor is not running in an iFrame.

// Initialize the editor
var editor = new JSONEditor(document.getElementById('editor_holder'),{
  // Enable fetching schemas via ajax
  ajax: true,

  // The schema for the editor
  schema: {
    $ref: "schema/"+vFileOut,
    format: "grid"
  },

  // Seed the form with a starting value
  //startval: loadJSCC2JSON()
});

// Hook up the submit button to log to the console
var vButton  = document.getElementById('submit');
if (vButton) {
  vButton.addEventListener('click',function() {
      // Get the value from the editor
      var vJSON = editor.getValue();
      var vContent = JSON.stringify(vJSON,null,4);
      console.log("JSON output: "+vContent);
    });
} else {
  console.log("WARNING: submit button for code export does not exist in DOM");
};
// Hook up the Restore to Default button
document.getElementById('restore').addEventListener('click',function() {
  editor.setValue(loadJSCC());
});


function validateJSON() {
    // Get an array of errors from the validator
    var errors = editor.validate();

    var indicator = document.getElementById('valid_indicator');

    // Not valid
    if(errors.length) {
      indicator.style.backgroundColor = "red";
      indicator.textContent = 'not valid';
    }
    // Valid
    else {
      indicator.style.backgroundColor = "green";
      indicator.textContent = 'valid';
    }
}

// Hook up the validation indicator to update its
// status whenever the editor changes
editor.on('change',validateJSON);

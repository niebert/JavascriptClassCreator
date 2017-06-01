function saveInnerHTML() {
  var vContent = style_html(getEditorInnerHTML("editor_holder"));
  // Get the value from the editor
  saveFile2HDD("editor_innerhtml.html",vContent);
  //console.log(editor.getValue());
}

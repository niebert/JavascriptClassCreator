vDataJSON["GlobalLibList_schema"] = {
  "type": "array",
  "title": "Global Libraries",
  "format": "table",
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

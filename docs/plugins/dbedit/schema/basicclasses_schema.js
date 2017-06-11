vDataJSON["BasicClasses_schema"] = {
  type: "array",
  title: "Basic Classes",
  format: "table",
  items: {
    type: "object",
    title: "Class",
    properties: {
      name: {
        type: "string",
        title: "Name"
      },
      init: {
        type: "string",
        title: "Initialize with"
      }
    }
  }
}

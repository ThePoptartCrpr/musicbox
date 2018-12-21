function getFileExtension(file) {
  var name = file.getName();
  var lastIndexOf = name.lastIndexOf('.');
  if (lastIndexOf == -1) return '';
  return name.substring(lastIndexOf);
}

function getVisibleFileName(file) {
  var name = file.getName();
  var lastIndexOf = name.lastIndexOf('.');
  if (lastIndexOf == -1) return name;
  return name.substring(0, lastIndexOf);
}

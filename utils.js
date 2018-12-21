function getFileExtension(file) {
  var name = file.getName();
  var lastIndexOf = name.lastIndexOf('.');
  if (lastIndexOf == -1) return '';
  return name.substring(lastIndexOf);
}

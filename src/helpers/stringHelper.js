// Define the interpolate method on the String prototype
String.prototype.interpolate = function (params) {
  // Extract keys and values from the params object
  const names = Object.keys(params);
  const vals = Object.values(params);

  // Dynamically create a function using new Function
  return new Function(...names, `return \`${this}\`;`)(...vals);
};

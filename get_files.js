const fs = require("fs");
const path = require("path");
function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), []);
}
function getDirectories(srcpath) {
  return fs
    .readdirSync(srcpath)
    .map((file) => path.join(srcpath, file))
    .filter((path) => fs.statSync(path).isDirectory());
}
function getDirectoriesRecursive(srcpath) {
  return [
    srcpath,
    ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive)),
  ];
}
function getFiles(srcpath) {
  const files = [];
  getDirectoriesRecursive(srcpath)
    .filter((dir) => !dir.includes("node_modules"))
    .forEach((dir) => {
      const filar = fs
        .readdirSync(dir)
        .filter((file) => fs.statSync(`${dir}/${file}`).isFile());
      filar.forEach((file) => files.push(`${dir}/${file}`));
    });
  /*
const join = []
files.forEach(file =>{
  file.forEach(dired =>{
    join.push(dired)
  })
})
return join
*/
  return files.filter(
    (file) =>
      ![`${__dirname}/package.json`, `${__dirname}/package-lock.json`].includes(
        file
      )
  );
}
module.exports = getFiles;

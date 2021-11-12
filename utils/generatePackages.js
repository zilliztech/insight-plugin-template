const fs = require("fs");
const { promises: fs_promises } = require("fs")
const glob = require("glob");
const path = require("path");

const getDirectoriesSync = (src, callback) => {
  try {
    const results = glob.sync(src + "/**/*");
    callback(undefined, results);
  } catch (error) {
    callback(error, []);
  }
};

const copyDir = async (src, dest) => {
  await fs_promises.mkdir(dest, { recursive: true });
  let entries = await fs_promises.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory()
      ? await copyDir(srcPath, destPath)
      : await fs_promises.copyFile(srcPath, destPath);
  }
};

getDirectoriesSync("../src", async (dirErr, dirRes) => {
  const cfg = [];
  dirRes.forEach((item) => {
    if (item.endsWith("/config.json")) {
      const fileData = fs.readFileSync(item);
      const jsonData = JSON.parse(fileData.toString());
      const pluginName = jsonData?.name;
      const pluginPath = item.split("/config.json").shift().split("src/").pop();
      const dirName = pluginPath.split("/").shift();
      const type = pluginPath.split("/").pop();
      cfg.push({
        pluginName,
        pluginPath,
        dirName,
        type,
      });
    }
  });
  await cfg.forEach(({ pluginName, pluginPath, dirName, type }) => {
    copyDir(`../src/${pluginPath}`, `../dist/${pluginName}_${type}`);
  });
});

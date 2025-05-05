// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");
const fs = require("fs");
 
const SRC_DIR = "src";
const srcDirPath = path.resolve(__dirname, SRC_DIR);
 
// This function will build the `entry` that webpack understands.
// See: https://webpack.js.org/configuration/entry-context/
// This will loop through all folders and its sub-folders 
// (recursively) under the "src" folder.
// For each folder: 
//  - If the folder contains an "index.ts" file, 
//    that means this folder will be the entry.
//    This is the library we want to build for each entity 
//    as we want to have a js file per entity
//  - Otherwise, skip (means that the current folder is not the entry, 
//    it just contains the shared/common code)
function getEntries(dirPath, entry = {}) {
  const fileList = fs.readdirSync(dirPath);
 
  fileList.forEach((fileName) => {
    const filePath = path.resolve(dirPath, fileName);
    if (fs.statSync(filePath).isDirectory()) {
      getEntries(filePath, entry);
    } else if (fileName === "index.ts") {
      const dirName = path.basename(dirPath);
      entry[dirName] = {
        import: filePath,
        filename: `${dirName}.js`,
      };
    }
  });
 
  return entry;
}
 
const config = {
  entry: {
    ...getEntries(srcDirPath),
  },
  output: {
    // See: https://webpack.js.org/configuration/output/#outputlibrary
    // This would impact how we use our library in Power Apps,
    // e.g. To call the function `contactOnLoad` of Contact library, 
    // we specify the handler name as `Contact.contactOnLoad`
    library: "[name]", 
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/i,
        loader: "ts-loader", // To support loading typescript code (.ts files)
        exclude: ["/node_modules/"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", "..."],
  },
};
 
module.exports = () => {
  console.log("CONFIG", config);
  return config;
};
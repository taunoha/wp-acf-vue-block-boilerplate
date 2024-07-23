import prompts from "prompts";
import fs from "fs";
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = [
  {
    type: "text",
    name: "name",
    message: "Block name:",
    initial: "My Block",
    validate: (text) =>
      text.match(/[^A-Za-z0-9_-\s]/g)
        ? "Name allows alphanumeric English characters, spaces, underscores and dashes."
        : true,
  },
  {
    type: "text",
    name: "category",
    message: "Block Category:",
    initial: "My Blocks",
    validate: (text) =>
      text.match(/[^A-Za-z0-9_-\s]/g)
        ? "Allowed are alphanumeric English characters, spaces, underscores and dashes."
        : true,
  },
  {
    type: "text",
    name: "text-domain",
    message: "Block Text Domain:",
    initial: "Default",
    validate: (text) =>
      text.match(/[^A-Za-z0-9_-\s]/g)
        ? "Allowed are alphanumeric English characters, spaces, underscores and dashes."
        : true,
  },
];
(async () => {
  const response = await prompts(questions);

  if (!response.name) {
    console.error("You must provide a block name.");
    process.exit(1);
  }

  if( !response.category ) {
    response.category = "My Blocks";
  }

  if( !response["text-domain"] ) {
    response["text-domain"]= response.name;
  }

  const themePath = __dirname.split('/themes/')[1].split('/').slice(1).join('/');

  const replacements = {
    "{block-name}": response.name,
    '{block-slug}': response.name.toLowerCase().replace(/[_\s]/g, "-"),
    '{domain}': response.category.toLowerCase().replace(/[_\s]/g, "-"),
    '{block-library-name}': response.name.toLowerCase().replace(/[-\s]/g, "_"),
    '{block-text-domain}': response["text-domain"].toLowerCase().replace(/[_\s]/g, "-"),
    '{prefix}': response.category.toLowerCase().replace(/[-\s]/g, "_"),
    '{category}': response.category,
    '{path-to-block-folder}': themePath
  };

  console.log("Replacing in file names...");
  renameFiles(replacements);

  console.log("Replacing in file contents...");
  searchReplaceContents(replacements);

  console.log("Remove the 'rename.js' file and the 'promps' dependency from package.json.");
  console.log("Done.");
  
})();

const renameFiles = (replacements) => {
  const dir = path.resolve(__dirname);
  const files = walkSync(dir);

  files.forEach((file) => {
    let newPath = Object.keys(replacements).reduce(
      (acc, key) => acc.replace(new RegExp(key, "g"), replacements[key]),
      file
    );

    fs.renameSync(file, newPath);
  });
}

const searchReplaceContents = (replacements) => {
  const dir = path.resolve(__dirname);
  const files = walkSync(dir);

  files.forEach((file) => {
    const oldContent = fs.readFileSync(file, "utf8");

    let newFileContent = Object.keys(replacements).reduce(
      (acc, key) => acc.replace(new RegExp(key, "g"), replacements[key]),
      oldContent
    );

    fs.writeFileSync(file, newFileContent, "utf8");
  });

}

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach((file) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist.filter(
    (path) => !path.match(/node_modules|\.git|package-lock|rename\.js/)
  );
};

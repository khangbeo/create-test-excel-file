const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const rl = require("readline-sync");

// __dirname is the current directory name /Users/aduong/Documents/projects/node-projects/create-new-folder
const currentDirectory = path.join(__dirname);

// change the folder path to something else like filename-test
const folderName = `${currentDirectory}/test`;
// creates a folder if it doesn't exist already
createFolder(folderName);

const files = fs
  .readdirSync(currentDirectory)
  .filter((fn) => fn.endsWith(".xlsx"));

console.log(files);
const chosenFile = rl.question("Which file do you want? ");
// start extracting first row from workbook

const workbook = XLSX.readFile(files[chosenFile]);
const worksheet = workbook.Sheets["Sheet1"];
const jsonSheet = XLSX.utils.sheet_to_json(worksheet);
const newSheet = XLSX.utils.json_to_sheet(new Array(jsonSheet[0]));

const newFilename = rl.question("What do you want the new file name to be? ");
console.log(`The new file will be named: ${newFilename}`);

// start new workbook and save in test directory
const newWorkbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Sheet1");
XLSX.writeFile(newWorkbook, `${currentDirectory}/test/${newFilename}-test.csv`);

// abstracted functions
function createFolder(name) {
  try {
    if (!fs.existsSync(name)) {
      fs.mkdirSync(name);
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 * Features to add
 * check for existing file
 *     if exists then ask user to enter a new name
 *     keep looping until file name is unique
 * first prompt makes an array and asks user to choose, need to change it so user can enter the file name instead of array index
 * or just make sure there's only one file in the folder and prevent user from using script if there's multiple files
 *
 * maybe get input with html form instead of terminal
 *     if html form, i don't need to get current directory, just drag and drop file then download the result
 */

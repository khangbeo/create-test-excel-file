#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const rl = require("readline-sync");

// __dirname is the current directory name /Users/aduong/Documents/projects/node-projects/create-new-folder
const currentDirectory = path.join(__dirname).replace("/bin", "");

// creates a folder if it doesn't exist already
createFolder(`${currentDirectory}/test`);

// grab all files with .xlsx extension
const files = fs
  .readdirSync(currentDirectory)
  .filter((fn) => fn.endsWith(".xlsx"));
console.log(`You have ${files.length} excel files`);
const fileIndex = rl.keyInSelect(files, "Which file do you want to use? ");
if (fileIndex === -1) {
  console.log("Exiting the program");
  return;
}
const foundFile = files[fileIndex];

let newFilename = "";
const oldFilename = foundFile.replace(".xlsx", "");
const changedFilename = cleanUpName(foundFile);

createWorkbook(foundFile);

function createWorkbook(foundFile) {
  // start extracting first row from workbook
  const workbook = XLSX.readFile(`${currentDirectory}/${foundFile}`);
  const worksheet = workbook.Sheets["Sheet1"];
  const jsonSheet = XLSX.utils.sheet_to_json(worksheet);
  const newSheet = XLSX.utils.json_to_sheet(new Array(jsonSheet[0]));

  console.log(
    `\nWhat do you want the new file name to be? (case doesn't matter). 
  Type same if you want to keep the old name.
  Type update if you want the old name to be updated like this "file-name-lol.xlsx"`
  );

  rl.promptLoop(askForName);

  // start new workbook and save in test directory
  const newWorkbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Sheet1");
  XLSX.writeFile(
    newWorkbook,
    `${currentDirectory}/test/${newFilename}-test.csv`
  );
  console.log(
    `\nYour new file "${newFilename}" is saved in this folder: ${currentDirectory}/test/${newFilename}.csv\n`
  );
  console.log("Process finished!");
}

function createFolder(name) {
  try {
    if (!fs.existsSync(name)) {
      console.group("Test folder does not exist");
      console.log(`Creating folder in ${currentDirectory}/test`);
      console.log("Folder successfully created");
      console.groupEnd();
      fs.mkdirSync(name);
    }
  } catch (err) {
    console.error(err);
  }
}

function askForName(input) {
  if (input.length === 0) {
    console.log("You need to enter something!");
  }
  switch (input) {
    case "same":
      newFilename = oldFilename;
      break;
    case "update":
      newFilename = changedFilename;
      break;
    default:
      newFilename = input.trim().toLowerCase();
  }
  return true;
}

function cleanUpName(name) {
  return name.replace(".xlsx", "").toLowerCase().split(" ").join("-");
}
/**
 * script works but currently very messy
 *     need to clean up functions and reorganize logic
 *
 * Features to add
 * check for existing file
 *     if exists then ask user to enter a new name
 *     keep looping until file name is unique
 * first prompt makes an array and asks user to choose, need to change it so user can enter the file name instead of array index
 * or just make sure there's only one file in the folder and prevent user from using script if there's multiple files
 *
 * add error handler for wrong input maybe with regex, case-insensitive input
 * add a prompt loop
 * maybe get input with html form instead of terminal
 *     if html form, i don't need to get current directory, just drag and drop file then download the result
 *
 */

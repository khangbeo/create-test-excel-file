#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const rl = require("readline-sync");

function main() {
  const currentDirectory = getCurrentDirectory();
  createTestFolder(`${currentDirectory}/test`);
  const foundFile = locateFiles(currentDirectory, "xlsx");
  if (!foundFile) return;
  const data = parseExcelFile(currentDirectory, foundFile);
  const newName = askForName(foundFile);
  writeToCsvFile(data, currentDirectory, newName);
}

function createTestFolder(currentDirectory) {
  try {
    if (!fs.existsSync(currentDirectory)) {
      console.group("Test folder does not exist");
      console.log(`Creating folder in ${currentDirectory}/test-csv-files`);
      console.log("Folder successfully created");
      console.groupEnd();
      fs.mkdirSync(currentDirectory);
    }
  } catch (e) {
    console.error(e);
  }
}

function parseExcelFile(currentDirectory, excelFile) {
  try {
    const workbook = XLSX.readFile(`${currentDirectory}/${excelFile}`);
    const worksheet = workbook.Sheets["Sheet1"];
    const jsonSheet = XLSX.utils.sheet_to_json(worksheet);
    const firstTwoRows = XLSX.utils.json_to_sheet(new Array(jsonSheet[0]));
    return firstTwoRows;
  } catch (e) {
    throw Error(e);
  }
}

function writeToCsvFile(newSheet, currentDirectory, newFilename) {
  try {
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
  } catch (e) {
    throw Error(e);
  }
}

function locateFiles(currentDirectory, extension) {
  try {
    const files = fs
      .readdirSync(currentDirectory)
      .filter((fn) => fn.endsWith(`.${extension}`));
    console.log(`You have ${files.length} ${extension} files`);
    const fileIndex = rl.keyInSelect(files, "Which file do you want to use? ");
    return files[fileIndex];
  } catch (err) {
    throw Error(err);
  }
}

function askForName(foundFile) {
  let newFilename = "";
  const oldFilename = foundFile.replace(".xlsx", "");
  const changedFilename = cleanUpName(foundFile);
  console.log(
    `\nWhat do you want the new file name to be? (case doesn't matter). 
      Type same if you want to keep the old name.
      Type update if you want the old name to be updated like this "file-name-lol.xlsx"`
  );

  rl.promptLoop((input) => {
    if (input.length === 0) {
      console.log("You need to enter something!");
      return;
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
  });
  return newFilename;
}

function cleanUpName(name) {
  return name.replace(".xlsx", "").toLowerCase().split(" ").join("-");
}

function getCurrentDirectory() {
  return path.join(__dirname).replace("/bin", "");
}

main();

/* script works but currently very messy
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
 *
 */

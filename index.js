// #!/usr/bin/env node

// const fs = require("fs");
// const path = require("path");
// const XLSX = require("xlsx");
// const rl = require("readline-sync");

// // __dirname is the current directory name /Users/aduong/Documents/projects/node-projects/create-new-folder
// const currentDirectory = path.join(__dirname).replace("/bin", "");

// // creates a folder if it doesn't exist already
// const folderName = `${currentDirectory}/test`;
// createFolder(folderName);

// // grab all files with .xlsx extension
// // returns an array
// const files = fs
//   .readdirSync(currentDirectory)
//   .filter((fn) => fn.endsWith(".xlsx"));

// console.log(`You have ${files.length} excel files\n`);
// console.log(files, "\n");
// const chosenFile = ask("Which file do you want to use? ");

// // start extracting first row from workbook
// const workbook = XLSX.readFile(files[chosenFile]);
// const worksheet = workbook.Sheets["Sheet1"];
// const jsonSheet = XLSX.utils.sheet_to_json(worksheet);
// const newSheet = XLSX.utils.json_to_sheet(new Array(jsonSheet[0]));
// const newFilename = ask("What do you want the new file name to be? ");

// // start new workbook and save in test directory
// const newWorkbook = XLSX.utils.book_new();
// XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Sheet1");
// XLSX.writeFile(newWorkbook, `${currentDirectory}/test/${newFilename}-test.csv`);
// console.log(
//   `Your new file "${newFilename}" is saved in this folder: ${currentDirectory}/test/${newFilename}.csv`
// );

// function createFolder(name) {
//   try {
//     if (!fs.existsSync(name)) {
//       console.group("Test folder does not exist");
//       console.log(`Creating folder in ${currentDirectory}/test`);
//       console.log("Folder successfully created");
//       console.groupEnd();
//       fs.mkdirSync(name);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// function ask(question) {
//   return rl.question(question, (answer) => {
//     rl.write(`Answer: ${answer}\n`);
//   });
// }
// /**
//  *
//  * Features to add
//  * check for existing file
//  *     if exists then ask user to enter a new name
//  *     keep looping until file name is unique
//  * first prompt makes an array and asks user to choose, need to change it so user can enter the file name instead of array index
//  * or just make sure there's only one file in the folder and prevent user from using script if there's multiple files
//  *
//  * maybe get input with html form instead of terminal
//  *     if html form, i don't need to get current directory, just drag and drop file then download the result
//  */
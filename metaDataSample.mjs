import { fileMetadata } from "file-metadata";
import fs from "fs";

async function fileRename(CurrentFileName) {
  const data = await fileMetadata(CurrentFileName);
  let fileName = data.description;
  if (fileName) {
    fileName = fileName.replace(":", "_");
    if (fileName.split(",").length > 1) {
      fileName = fileName.split(",")[1].trim();
      console.log(data.description);
      console.log(fileName);
      fs.rename(CurrentFileName, fileName+"_"+CurrentFileName, () => {
        console.log("\t\tFile Renamed!\n");
         
        
      });
    }
  }
}
//f1("Test.Mov");
function getCurrentFilenames() {
    console.log("Current filenames:");
    fs.readdirSync(".").forEach(file => {
        if (file.toUpperCase().indexOf(".MOV") >0) {
            console.log(file);
            fileRename(file);
        }
    });
  }
  getCurrentFilenames();
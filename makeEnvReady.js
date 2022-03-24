var fs = require("fs");

const modifyAppComponentFile = () => {
  let newFileContents = "";
  let oldCode = `sessionStorage.setItem("userId", cookies.get("PROFILE_ID"));
 sessionStorage.setItem(
   "userName",
   cookies
     .get("USER_NAME")
     .substring(
       cookies.get("USER_NAME").indexOf('"') + 1,
       cookies.get("USER_NAME").length - 1
     )
 );`;
  let newCode = `
        sessionStorage.setItem("userId", "PT02944");
        sessionStorage.setItem("userName", "Praveen T");

`;

  const allFileContents = fs.readFileSync("app.component.ts", "utf-8");
  let isCodeModified = false;
  allFileContents.split(/\r?\n/).forEach((line) => {
    if (!isCodeModified) {
      if (oldCode.indexOf(line.trim()) < 0) {
        if (
          line.trim() === 'if (sessionStorage.getItem("userName").length < 1) {'
        ) {
          newFileContents = newFileContents + newCode + "\n";
          isCodeModified = true;
        }
        newFileContents = newFileContents + line + "\n";
      } else if (line.trim().length === 0) {
        newFileContents = newFileContents + line + "\n";
      } else {
        newFileContents = newFileContents + "// " + line + "\n";
      }
    }
    else {
        newFileContents = newFileContents + line + "\n";
    }
  });
  fs.writeFile("app.component.ts", newFileContents, function (err) {
    if (err) throw err;
    console.log("app.component.ts modified");
  });
};
const modifygitIgnore = () => {
  fs.appendFile('.gitignore', '\n\n# Praveen Stuff \n\n makeEnvReady.js', function (err) {
    if (err) throw err;
    console.log('.gitignore Updated!');
  });
};


modifyAppComponentFile();
modifygitIgnore();

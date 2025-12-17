import fs from "fs";
import path from "path";

function listAll(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    console.log(fullPath); // print full path to file/folder

    if (entry.isDirectory()) {
      listAll(fullPath);
    }
  }
}

// run it for current folder
listAll(process.cwd());

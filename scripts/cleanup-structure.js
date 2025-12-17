// scripts/cleanup-structure.js
const fs = require("fs");
const path = require("path");

const backend = path.join(__dirname, "../casetrace-server/src");
const frontend = path.join(__dirname, "../ui/src");

// ---------- 1. Delete unnecessary frontend-like files in backend ----------
const filesToDelete = [
  path.join(backend, "main.jsx"),
  path.join(backend, "contexts/AuthContext.jsx"),
];

filesToDelete.forEach((file) => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Deleted: ${file}`);
  } else {
    console.log(`Not found (skip): ${file}`);
  }
});

// ---------- 2. Ensure backend has proper CORS in server.ts ----------
const serverFile = path.join(backend, "server.ts");
if (fs.existsSync(serverFile)) {
  let content = fs.readFileSync(serverFile, "utf8");

  if (!content.includes("cors")) {
    // Add import and app.use for CORS
    content = `import cors from "cors";\n` + content;
  }

  if (!content.includes("app.use(cors")) {
    content = content.replace(
      /(const app = express\(\);)/,
      `$1\napp.use(cors({ origin: "http://localhost:5173" }));`
    );
  }

  fs.writeFileSync(serverFile, content, "utf8");
  console.log("Updated server.ts with CORS settings.");
}

// ---------- 3. Confirm frontend AuthContext.tsx exists ----------
const authContextFile = path.join(frontend, "contexts/AuthContext.tsx");
if (fs.existsSync(authContextFile)) {
  console.log("Frontend AuthContext exists ✅");
} else {
  console.warn("Frontend AuthContext missing ❌");
}

// ---------- 4. Print summary ----------
console.log("\nCleanup complete. Review the changes above.");

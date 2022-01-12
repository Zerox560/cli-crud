const fs = require("fs");
const path = require("path");

const dbPath = path.join(process.cwd(), "src/db/data.json");

function saveFile(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data));
};

function readFile() {
    if (!fs.existsSync(dbPath)) {
        return null;
    };

    const info = fs.readFileSync(dbPath, { encoding: "utf-8" });
    return info;
};

module.exports = { saveFile, readFile };

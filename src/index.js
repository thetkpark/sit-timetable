const fs = require("fs")

const fileText = fs.readFileSync("data/2563.txt").toString()

console.log(fileText.replace(/CS\s?\d{1}\\n/gi, "").split("\\n"))

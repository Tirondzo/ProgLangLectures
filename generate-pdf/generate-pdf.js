var markdownpdf = require("markdown-pdf")
  , fs = require("fs")
  , glob = require("glob")

const LECTURES_PATH = "../Lectures/*.md"
const OUT_MERGED_MD = "./out/AllInOne.md"
const OUT_FINAL_PDF = "./out/AllInOne.pdf"

const options = {
  // Styles are taken from here: https://highlightjs.org/download/
  highlightCssPath:"./highlight_styles/ascetic.css",
  paperBorder:"1cm"
}

var getDirName = require('path').dirname
fs.mkdirSync(getDirName(OUT_MERGED_MD), { recursive: true })
fs.mkdirSync(getDirName(OUT_FINAL_PDF), { recursive: true })

async function mergeFiles(files, destination)
{
  var results = await Promise.all(files.map(async f => {
    return fs.readFileSync(f)
  }))
  fs.writeFileSync(destination, results.join("\n"))
}

var files2print = glob.sync(LECTURES_PATH)
console.log(files2print)

mergeFiles(files2print, OUT_MERGED_MD).then(()=>{
  markdownpdf(options).from(OUT_MERGED_MD).to(OUT_FINAL_PDF, function () {
    console.log("PDF Created")
  })
})
var markdownpdf = require("markdown-pdf")
  , fs = require("fs")
  , glob = require("glob")
  , pdfjam = require("pdfjam")

const LECTURES_PATH = "../Lectures/*.md"
const OUT_MERGED_MD = "./out/AllInOne.md"
const OUT_BLACK_PDF = "./out/AllInOne-grayscale.pdf"
const OUT_COLOR_PDF = "./out/AllInOne-colored.pdf"
const OUT_NUPED_PDF = "./out/AllInOne-gs-nup.pdf"
const OUT_FILES = [OUT_MERGED_MD, OUT_BLACK_PDF, OUT_COLOR_PDF, OUT_NUPED_PDF]

const options_black = {
  // Styles are taken from here: https://highlightjs.org/download/
  highlightCssPath:"./highlight_styles/grayscale.css",
  paperBorder:"1cm"
}

const options_color = Object.assign({}, options_black, {
  highlightCssPath:"./highlight_styles/xcode.css"
})

var getDirName = require('path').dirname
OUT_FILES.forEach((f)=>{
  fs.mkdirSync(getDirName(f), { recursive: true })
})

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
  markdownpdf(options_black).from(OUT_MERGED_MD).to(OUT_BLACK_PDF, async function () {
    console.log("PDF Grayscale Created")
    pdfjam.nup(OUT_BLACK_PDF, 4, 2,  {
        orientation: 'landscape',
        outfile: OUT_NUPED_PDF
    }).then(() => {
      console.log("PDF Nuped Created")
    })
  })
  markdownpdf(options_color).from(OUT_MERGED_MD).to(OUT_COLOR_PDF, async function () {
    console.log("PDF Colored Created")
  })
})
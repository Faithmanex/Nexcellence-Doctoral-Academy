const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const docsPath = path.join(__dirname);
const outPath = path.join(__dirname, 'extracted_docs');

if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath);
}

const docxFiles = fs.readdirSync(docsPath).filter(f => f.endsWith('.docx'));

async function processAll() {
  for (const file of docxFiles) {
    try {
      const result = await mammoth.extractRawText({ path: path.join(docsPath, file) });
      const text = result.value;
      const outFileName = file.replace('.docx', '.md');
      fs.writeFileSync(path.join(outPath, outFileName), text);
      console.log(`Extracted: ${outFileName}`);
    } catch (err) {
      console.error(`Failed on ${file}:`, err);
    }
  }
}

processAll();

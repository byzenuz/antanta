import { execFile } from 'child_process';
import path from 'path';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlPath = path.resolve('scripts/presentation-slides.html');
const pdfPath = path.resolve('public/files/presentation.pdf');

const args = [
  '--headless',
  '--disable-gpu',
  '--run-all-compositor-stages-before-draw',
  '--no-pdf-header-footer',
  `--print-to-pdf=${pdfPath}`,
  `file:///${htmlPath.replace(/\\/g, '/')}`
];

console.log('Generating PDF from:', htmlPath);
console.log('Output PDF:', pdfPath);

execFile(edgePath, args, (error, _stdout, _stderr) => {
  if (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    console.log(`SUCCESS: PDF created (${stats.size} bytes) at ${pdfPath}`);
  } else {
    console.error('PDF file was not found after execution');
    process.exit(1);
  }
});

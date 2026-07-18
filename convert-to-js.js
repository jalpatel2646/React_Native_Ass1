const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync(path.join(__dirname, 'app')).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Strip obvious TS
  content = content.replace(/useState<[^>]+>/g, 'useState');
  content = content.replace(/useRef<[^>]+>/g, 'useRef');
  content = content.replace(/\(item: any\)/g, '(item)');
  content = content.replace(/\({ item }: { item: Contacts.Contact }\)/g, '({ item })');
  content = content.replace(/\({ item }: any\)/g, '({ item })');
  content = content.replace(/\(id: string\)/g, '(id)');
  content = content.replace(/\(text: string, label: string\)/g, '(text, label)');
  content = content.replace(/\(number: string\)/g, '(number)');
  content = content.replace(/\(router as any\)/g, 'router');
  content = content.replace(/export default function (.+?)\(\) {/g, 'export default function $1() {');

  // Any other typescript specific stuff like imports for types?
  // We didn't import any types explicitly except Contacts.Contact usage.

  const newPath = file.replace(/\.tsx$/, '.jsx');
  fs.writeFileSync(newPath, content);
  fs.unlinkSync(file);
});
console.log('Conversion successful!');

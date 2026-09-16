const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'index.html');
const content = fs.readFileSync(source, 'utf8');

const target = path.join(__dirname, 'index.html');
fs.writeFileSync(target, content, 'utf8');
console.log('Arquivo criado com sucesso:', target);

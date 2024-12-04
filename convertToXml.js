const fs = require('fs');
const json2xml = require('json2xml'); // Importa o módulo correto

// Leia o arquivo JSON gerado pelo Artillery
const jsonData = JSON.parse(fs.readFileSync('resultados.json', 'utf8'));

// Converta o JSON para XML
const xmlData = json2xml(jsonData);

// Salve o XML em um arquivo
fs.writeFileSync('resultados.xml', xmlData);

console.log('Arquivo XML gerado com sucesso!');

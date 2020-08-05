'use strict';
const { parse } = require('papaparse');
// Парсим файл
var file = document.querySelector('.tableFile').files;
const parsedData = file.parse();
console.log(parsedData);

const fs = require('fs');

const plus = [48,93,107,356,580,717,817,983,1194,1215,1227,1234,1236,1237,1240,1409,1459,1461,1462,1464,1465,1483,1504,1505,1506,1507,1508,]
const respuesta = plus.map((item) =>`'${item}'`)
console.log(respuesta)
fs.writeFileSync( './salidas.txt', respuesta );
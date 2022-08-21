const axios = require('axios');
var fs= require('fs');
const readline = require('readline');

let lines = 0;
const oneGbNLines = 21675675;
const filePath = 'coding-test-data-large.txt';


async function write(filePath) {
    const writableStream = fs.createWriteStream(filePath);
    writableStream.on('error',  (error) => {
        console.log(`An error occured while writing to the file. Error: ${error.message}`);
    });
    
    while(lines<oneGbNLines) {
        writableStream.write(`${makeid(5)}, ${makeid(5)} -- ut\n`);
        writableStream.write('    Voluptatem ipsam et at.\n');
        lines++;
    }
}

write(filePath);

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
const fs = require('fs');
const icons = require('./icons');

const content = fs.readdirSync('./svg/src/');
const remove = [];

console.log(content);
content.forEach(icon => {
    const filename = icon.substr(0,icon.length - 4);
    if(JSON.stringify(icons).indexOf(filename) === -1) {
        remove.push(icon);
    }
})


console.log(remove);
console.log(content.length - remove.length);
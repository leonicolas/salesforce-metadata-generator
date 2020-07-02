const readline = require('readline');
const fs = require('fs');

const dataFile = './data-file.csv';
const templateFile = './metadata.template';
const destinationFile = './CustomMetadataFile.$LABEL.md-meta.xml';

const readInterface = readline.createInterface({
    input: fs.createReadStream(dataFile),
    console: false
});

const template = fs.readFileSync(templateFile).toString();
let header;

readInterface.on('line', function(line) {
    if(!header) {
        header = line.split(',');
        return;
    }
    
    let data = line.split(',');
    let fileData = template.slice();
    let destFile = destinationFile.slice();

    header.forEach((field, index) => {
        const placeHolder = `$${field.toUpperCase()}`;
        fileData = fileData.replace(placeHolder, data[index]);
        destFile = destFile.replace(placeHolder, data[index]);
    });
    fs.writeFileSync(destFile, fileData);
});

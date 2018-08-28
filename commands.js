const fs = require('fs');

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];

    switch (command) {
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head": 
            commandLibrary.head(userInputArray.slice(1));
            break;
        case "tail":
            commandLibrary.tail(userInputArray.slice(1));
            break;
        default:
            errorHandler(userInput);
    }
}

const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
    },
    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },
    "head": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            var fileAsString = data.toString();
            var lineArray = fileAsString.split('\n');
            done(lineArray.slice(0,5).join('\n'));
        });
    },
    "tail": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            var fileAsString = data.toString();
            var lineArray = fileAsString.split('\n');
            done(lineArray.slice(-5).join('\n'));
        });
    }
};

function errorHandler(userInput) {
    process.stdout.write(userInput + " is not a valid command");
    process.stdout.write('\nprompt > ');
}

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;

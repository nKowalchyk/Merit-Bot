require('dotenv').config({path: __dirname + '\\ENVIRONMENT.env'});
const fetch = require('node-fetch');

const commandLength = 3;
const printCommandLength = 2;

exports.addUser = function(username) {
    fetch('http://localhost:' + process.env.PORT + "/users/" + username, { method: 'POST' })
        .then((res) => {
            if(res.ok) {
                console.log('User Added Successfully');
                return;
            }
            throw new Error('request failed');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.updateMerits = function(username, target, meritOrDemerit, amt) {
    fetch(process.env.PORT + '/merits/' + username + '/' + target + '/' + amt + '/' + meritOrDemerit, { method: 'PUT' })
        .then((res) => {
            if(res.ok) {
                console.log('request success');
                return;
            }
            throw new Error('request failed');
        })
        .catch((err) => {
            console.log(err);
            return;
        });
};

exports.getMerits = function(username) {
    fetch(prcess.env.PORT + '/user/' + username, { method: 'GET' })
        .then((res) => {
            if(res.ok) {
                console.log('request success');
                return;
            }
            throw new Error('request failed');
        })
        .catch((err) => {
            console.log(err);
            return;
        });
};

exports.parse = function(commandString) {
    let result = {};
    commandString[0] = commandString[0].slice(1);
    if(commandString.length === printCommandLength) {
        result.username = commandString[0];
        result.meritOrDemerit = commandString[1];
    }
    else if(commandString === commandLength) {
        result.username = commandString[0];
        result.amt = commandString[1];
        result.meritOrDemerit = commandString[2];
    }
    /*if(!validateInput(result)) {
        result = null;
    }*/
    return result;
};

exports = {
    commandLength, printCommandLength
};

function validateInput(result) {
    if(result.meritOrDemerit) {
        if(result.meritOrDemerit != 'merits' || result.meritOrDemerit!= 'demerits') {
            return false;
        }
    }
    else {
        return false;
    }

    if(result.amt) {
        if(isNaN(result.amt)) {
            return false;
        }
    }
    else {
        return false;
    }

    return true;
};
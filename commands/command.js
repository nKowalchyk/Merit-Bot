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

exports.updateMerits = function(user, tar, meritDemerit, amount, callback) {
    const options = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            username: user,
            target: tar,
            meritOrDemerit: meritDemerit,
            amt: amount
        })
    };
    fetch('http://localhost:' + process.env.PORT + '/users/' + tar, options)
        .then((res) => {
            if(res.ok) {
                res.json()
                    .then((json) => {
                        callback(json.result);
                        return;
                    })
                    .catch((err) => {
                        console.log(err);
                        return;
                    });
                return;
            }
            throw new Error('request failed');
        })
        .catch((err) => {
            console.log(err);
            return;
        });
};

exports.getMerits = function(username, callback) {
    fetch('http://localhost:' + process.env.PORT + '/users/' + username, { method: 'GET' })
        .then((res) => {
            if(res.ok) {
                res.json()
                    .then(json => {
                        callback(json.result);
                        return;
                    })
                    .catch(err => {
                        console.log(err);                    
                    })
                }
            return;
            throw new Error('request failed');
        })
        .catch((err) => {
            console.log(err);
            return;
        });
};
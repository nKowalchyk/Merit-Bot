'use strict';
const mongoose = require('mongoose');
const UserModel = require('../models/botModel');

exports.listAllUsers = function(req, res) {
    User.find({}, (err, user) => {
        if (err) {
            res.send(err);
        }
        console.log(user[0].permissions);
        res.send(user[0].permissions);
    });
};

exports.addUser = function(req, res) {
    let newUser = new UserModel({
        username: req.params.username
    });
    newUser.save((err) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json();
    });
};

exports.getMerits = function(req, res) {
    UserModel.findOne({ username: req.params.username }, 'merits demerits', (err, user) => {
        if(err) {
            res.send(err);
            return;
        }
        if(user) {
            let results = req.params.username + ' Merits: ' + user.merits + ' Demerits: ' + user.demerits;
            res.send(JSON.stringify({ result: results}));
            return;
        }
        else {
            res.send('No user with that name ' + req.params.username);
            return;
        }
    });
};

exports.updateMerits = function(req, res) {
    let permission = true;
    const permissionMatrix = {
        merits: 0,
        demerits: 2,
        add: 0,
        sub: 1
    }
    let addOrSub = ((req.body.amt < 0) ? 'sub' : 'add');
    let permissionIndex = permissionMatrix[req.body.meritOrDemerit] + permissionMatrix[addOrSub];

    if(req.body.username === req.body.target) {
        permission = true;
    }
    if (permission) {
        UserModel.findOne({username: req.body.username}, 'permissions', (err, user) => {
            if(err) {
                res.send(JSON.stringify({result: 'failure'}));
                return;
            }
            else if(user) {
                let permission = (user.permissions.charAt(permissionIndex) === '1');
                let meritField = {};
                meritField[req.body.meritOrDemerit] = parseInt(req.body.amt, 10);
                if(permission) {
                    UserModel.findOneAndUpdate({username: req.body.target},{$inc: meritField}, {new: true, runValidators: true}, (err, doc) => {
                        if(err) {
                            res.send('Operation not valid');
                            return;
                        }
                        else {
                            res.send(JSON.stringify({ username: req.body.target, operation: req.body.meritOrDemerit, amt: req.body.amt}));
                            return;
                        }
                    });
                }
            }
        });
    }
}

exports.deleteUser = function(req, res) {
    User.remove({
        username: req.params.username
    }, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'User Deleted' })
    });
};
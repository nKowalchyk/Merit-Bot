'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('Users');
const permissionCheck = require('../utils/permissionChecker');

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
    console.log('calling user function');
    User.findOne({ username: req.params.username })
    let newUser = new User({
        username: req.params.username,
        merits: 0,
        demerits: 0,
        permissions: '1001'
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
    console.log('getting merits');
    User.findOne({ username: req.params.username }, 'merits demerits', (err, user) => {
        if(err) {
            res.send(err);
            return;
        }
        if(user) {
            let results = req.params.username + ' Merits: ' + user.merits + ' Demerits: ' + user.demerits;
            console.log(results);
            res.send(results);
        }
        else {
            res.send('No user with that name ' + req.params.username);
        }
    });
};

exports.updateMerits = function(req, res) {
    if(!permissionCheck.validatePermissions(req.params.username, req.params.target, req.params.meritOrDemerit, req.params.merits, User)) {
        res.send(req.params.username + ' Does not have permissions for this action!');
    }
    else {
        User.findOne({username: req.params.target}, (err, user) => {
            if(err) {
                res.send(err);
                return;
            }
            if(user) {
                let currentMerits = user[req.params.meritOrDemerit] + parseInt(req.params.merits, 10);
                user[req.params.meritOrDemerit] = currentMerits;                
                user.save(() => {
                    console.log('saving');
                });
                return;
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
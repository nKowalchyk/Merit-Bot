'use strict';
module.exports = function(app) {
    const bot = require('../controllers/botController');

    app.route('/')
        .get(bot.listAllUsers);
    app.route('/users/:username')
        .get(bot.getMerits)
        .post(bot.addUser)
        .delete(bot.deleteUser);
    app.route('/merits/:username/:target/:merits/:meritOrDemerit')
        .put(bot.updateMerits);
}
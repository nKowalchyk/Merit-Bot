exports.validatePermissions = function(name, target, meritOrDemerit, amt, model) {
    const permissionMatrix = {
        merits: 0,
        demerits: 2,
        add: 0,
        sub: 1
    }
    let addOrSub = ((amt < 0) ? 'sub' : 'add');
    let permissionIndex = permissionMatrix[meritOrDemerit] + permissionMatrix[addOrSub];
    model.findOne({username: name}, 'permissions', (err, user) => {
        if(err) {
            return false;
        }
        let permission = (user.permissions.charAt(permissionIndex) === '1');
        if(name === target) {
            permission = false;
        }
        console.log(permission);
        return permission;
    });
}
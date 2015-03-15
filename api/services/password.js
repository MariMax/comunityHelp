module.exports.password = {
    update: function(req, res, stringLength, next) {

        passport.update()
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        if (!stringLength > 0) {
            var stringLength = 8;
        }
        var randomString = '';
        for (var i = 0; i < stringLength; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomString += chars.substring(rnum, rnum + 1);
        }

        passport.update(req, res, randomString, next);
    }
}

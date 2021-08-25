const jwt = require('jsonwebtoken');

function createJWT(encodeData) {
const token = jwt.sign(encodeData, 'secret');
return token;
}

function validateJWT(token) {
    jwt.verify(token, 'secret', function(err, decodeData) {
        console.log(decodeData);
    });
}

module.exports = {
    createJWT,
    validateJWT
}
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const {createJwt, validateJWT, createJWT} = require('../utils/jwt');

router.post('/', async (req, res) => {
    console.log("login");
    const body = req.body;
    const users = await userController.getUserByQuery(body);
    if (users.length === 0) {
        return res.status(400).json({ message: 'User not Found, Please register'});
    }
    const token = createJWT({ id: users[0].id, name:users[0].uname });
    return res.status(200).json({ token });
});

module.exports = router;
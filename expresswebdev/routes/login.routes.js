const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');

router.post('/', async (req, res) => {
    console.log("login");
    const body = req.body;
    const users = await userController.getUserByQuery(body);
    if (users.length === 0) {
        return res.status(400).json({ message: 'User not Found, Please register'});
    }
    return res.status(200).json({ users });
});

module.exports = router;
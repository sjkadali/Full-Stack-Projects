const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');

router.get('/', async (req, res) => { 
    const users = await userController.getUsers();
    return res.status(200).json({ users });
}); 

router.post('/',async (req, res) => {
    let body = req.body;
    if (!body.lname) {
        return res.status(400).json({'message': 'lastname is required'});
    }
    try {
        const result= await userController.createUser(body);  
        return res.status(200).json({ message: "Created User", result: result });
    }   catch(e) {
        return res.status(400).json({error: e });
    }
 });

router.patch('/:id', async (req, res) => {
    const id = req.params.id;   
    const body = req.body;
    try {
        const result = await userController.updateUser(id, body); 
        return res.status(200).json({ message: "Updated User", result: result });
    }   catch(e) {
        return res.status(400).json({error: e });
    }    
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id: ', id);
    try {
        const deletedResult = await userController.deleteUser(id, body); 
        return res.status(200).json({ message: "Deleted User", result: deletedResult  });
    }   catch(e) {
        return res.status(400).json({error: e });
    }    
}); 

module.exports = router;
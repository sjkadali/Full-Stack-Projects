const express = require('express');
const router = express.Router();
const Users = require('../models/users.model');

const fs = require('fs');

router.get('/',  (req, res) => { 
    Users.find().exec()
        .then(result => {
            console.log(result);
            return res.status(200).json({ users: result });
        }).catch(e => {
            console.log(e);
            return res.status(400).json({ message: e});
        })    
}); 

router.post('/', (req, res) => {
    let body = req.body;
    const user = new Users(body);
    user.save()
        .then(result => {
            console.log(result);
            return res.status(200).json({ user: result });
        }).catch(e => {
            console.log(e);
            return res.status(400).json({ message: e});
    });    
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;   
    const body = req.body;
    Users.findByIdAndUpdate(id, body)
        .then(result => {
            console.log(result);
            return res.status(200).json({ message: "Updated User",user: result });
        }).catch(e => {
            console.log(e);
            return res.status(400).json({ message: e});
    });        
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log('id: ', id);
    Users.findByIdAndDelete(id)
        .then(result => {
            console.log(result);
            return res.status(200).json({ message: "Deleted User",user: result });
        }).catch(e => {
            console.log(e);
            return res.status(400).json({ message: e});
    });     
}); 

module.exports = router;
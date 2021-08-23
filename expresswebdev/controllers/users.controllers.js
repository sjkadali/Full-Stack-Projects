const { response } = require('express');
const Users = require('../models/users.model');

async function createUser(body) {
    const user = new Users(body);
    await user.save()
        .then(result => {
            console.log(result);
            return result;
        }).catch(e => {
            console.log(e);
            throw new Error(e);
    });
}

async function getUsers() {
    const users = await Users.find();
    return users;
}

async function updateUser(id, updateData) {
    Users.findByIdAndUpdate(id, updateData)
        .then(result => {
            console.log(result);
           return result;
        }).catch(e => {
            console.log(e);
           throw new Error(e);
    });        
}

async function deleteUser(id) {
    Users.findByIdAndDelete(id)
        .then(result => {
            console.log(result);
            return result;
        }).catch(e => {
            console.log(e);
        throw new Error(e);
    });        
}

async function login() {

}

async function getUserByQuery(query) {
    const users = await Users.find(query);
    return users;
}

module.exports = {
    createUser, 
    getUsers,    
    updateUser,
    deleteUser,
    getUserByQuery
};
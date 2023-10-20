import express from "express";
import cors from "cors";

import userService from "./model/user-service.js";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

// Query Users
app.get('/users', async (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    try{
        const result = await userService.getUsers(name, job);
        res.send({users_list:result})
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server. ");
    }
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
    const id = req.params['id'];
    let result = await userService.findUserById(id);
    if (result === undefined || result === null) {
        res.status(404).send('Resource not found.');
    } else {
        res.send({users_list:result});
    }
})


// Delete a user
app.delete('/users/:id', async (req, res) => {
    const id = req.params['id'];
    let result = await userService.deleteUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.status(204).send(result);
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Posting (Creating) User
app.post('/users', async (req, res) => {
    const userToAdd = req.body;
    // Add User to DB (controller)
    const savedUser = await userService.addUser(userToAdd);
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
})

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});
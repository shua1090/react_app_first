import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
};

// Find Users
const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] === name);
};

const findUserById = (id) => 
    users['users_list'].find( (user) => user['id'] === id);

const findUserByIdAndJob = (name, job) => {
    users['users_list'].find ( 
        (user) => {
            if (user['name'] === name && user['job'] == job)
                return user;
        }
    );
}

// Add user to our "Database"
const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

// Delete user from our "Database"
const deleteUserById = (id) => {
    const index = users['users_list'].findIndex( (user, ind) => {
        if (user.id === id){
            return ind;
        }
    });
    if (index === undefined){
        return undefined;
    } else {
        return users['users_list'].splice(index, 1);
    }
}

// Query Users
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    // To use double query, do: http.../users?name=Mac&job=Professor
    if (name != undefined && job != undefined){
        let result = findUserByIdAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    } else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    } else {
        res.send(users);
    }
});

// Get a user by ID
app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
})


// Delete a user
app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = deleteUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Posting (Creating) User
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    // Add ID
    let rand = Math.round (10000 * Math.random());
    userToAdd.id = rand;

    addUser(userToAdd);
    // Properly send status that user was created
    res.status(201).send();
})

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});
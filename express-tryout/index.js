const express = require('express');

const app = express();

app.use(express.json()) // Parsing the request.

let users = [
    {
        id: 1, 
        name: 'John',
        email: 'john@gmail.com',
        address: 'Chennai'
    },
    {
        id: 2, 
        name: 'Arjun',
        email: 'arjun@gmail.com',
        address: 'Bangalore'
    },
    {
        id: 3, 
        name: 'Priya',
        email: 'priya@gmail.com',
        address: 'Kochi'
    },
    {
        id: 4, 
        name: 'Rahul',
        email: 'rahul@gmail.com',
        address: 'Chennai'
    }
]

// Implementing first route

app.get('/hello', (req, res) => {
    console.log('Hitting my First API');
    res.status(200).send({message: 'Hello! How are you!'});
});

// Getting All Users
app.get('/users', (req, res) => {
    try{
        let address = req.query.address;
        // http://localhost:8123/users?address=Chennai
        let retrievedUsers = [];

        if(address){
            retrievedUsers = users.filter(user => user.address === address);
        }else{
            retrievedUsers = users;
        }


        res.status(200).send({
            message: "Users have been retrieved successfully.",
            data: retrievedUsers
        })
    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
})

app.post('/users', (req, res) => {
    try{
        let newUser = req.body;
        newUser.id = users.length + 1;
        users = [...users, newUser];
        res.status(201).send({
            message: "User has been added succesfully"
        })
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
})

app.put('/users/:userId', (req, res) => {
    try{
        let userId = parseInt(req.params.userId);
        let payload = req.body;
        // let userId = +req.params.userId;

        if(userId){
            let userFound = users.find(user => user.id === userId);
            if(userFound){
                let updatedUser = {...userFound, ...payload};
                let restOfTheUsers = users.filter(user => user.id !== userId);
                users = [...restOfTheUsers, updatedUser];
                return res.status(200).send({message: "User has been updated successfully."})
            }

            return res.status(400).send({message: "User does not exist."})

        }
        return res.status(400).send({message: "Invalid UserId"})
        
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
} )

app.delete('/users/:userId', (req, res) => {
    try{
        let userId = parseInt(req.params.userId);

        if(userId){
            let userFound = users.find(user => user.id === userId);
            if(userFound){
                users = users.filter(user => user.id !== userId);
                return res.status(200).send({message: `User with id ${userId} has been deleted successfully.`})
            }
            return res.status(400).send({message: "User does not exist."})

        }
        return res.status(400).send({message: "Invalid UserId"})

    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
})

app.listen(8123, () => {
    console.log('App is running on port 8123');
})

// http://localhost:8123/hello -> {message: 'Hello World'}



// import the express
// initiate the express function
// listen to the port.
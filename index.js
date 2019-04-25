// implement your API here
require('dotenv').config();

const express = require('express');
const db = require('./data/db.js');
const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

server.get('/', (req, res) => {
    res.send("Server setup in progress...");
});

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    db
        .insert(newUser)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        });
});

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json({users});
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        });
});

server.get('/api/users/:id', (req, res) => {
    userId = req.params.id
    db
     .findById(userId)
     .then(user => {
         if (user.length === 0) {
             res.status(404).json({ error: "User with that id is not found"});
             return;
         }
         res.status(200).json(user);
     })
     .catch(err => {
         res.status(500).json({ error: "The user information could not be retrieved." })
     });
});

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id
    db
        .remove(userId)
        .then(userId => {
            if (userId.length === 0) {
                res.status(404).json({ error: "User with that id is not found"});
                return;
            }
            res.status(200).json(userId);
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" })
        });
});

server.put('/api/users/:id', (req, res) => {
    const updateId = req.params.id
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    db
        .update(updateId, req.body)
        .then(user => {
            if (user.length === 0) {
                res.status(404).json({ error: "User with that id is not found"});
                return;
            }
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified." })
        });
});

server.listen (port, () => {
    console.log(`\n*** API running on port ${port} ***\n`);
});
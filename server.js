const express = require('express')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 3000;
app.use(express.json())
const users = [
    {
        "id": 1,
        "username": "anhquang1",
        "role": "admin"
    },
    {
        "id": 2,
        "username": "anhquang2",
        "role": "users"
    }, {
        "id": 3,
        "username": "anhquang3",
        "role": "users"
    }
]

app.get('/', authedToken, (req, res) => {
    res.json({status: "Success", data: users})
})
app.post('/login', (req, res) => {
    // const {id, username} = req.body;
    const data = req.body.username;
    console.log({ data });
    const accessToken = jwt.sign({data}, process.env.KEY,{ expiresIn: '1h' });
    res.json({status: "Success", accessToken: accessToken})
})

function authedToken(req, res, next) {
    const authorization = req.headers['authorization']
    const token = authorization.split(" ")[1];
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.KEY, (err, data) => {
        if (err) res.sendStatus(403);
        next();
    })
}

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})
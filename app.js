'use strict';

const expres = require("express")
const app = expres()

const MongoConection = require("./connectionDB")

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get("/", async (req, res) => {
    return res.send("Hola mundo!")
})

app.post("/hour", async (req, res) => {
    let hour = {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 59)
    }
    let conection = new MongoConection();
    await conection.inser("watch", hour)
    return res.json(hour)
})

app.get("/hours", async (req, res) => {
    let conection = new MongoConection();
    let listElements = await conection.getElements("watch")
    return res.json(listElements)
})

app.listen(3000, () => console.log("Listening port 3000"))

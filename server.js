const fs = require('fs');
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const { MongoClient } = require("mongodb");

app.use(cors())

const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

async function run() {
    try {
        const db = client.db('besancon-roads');
        const table = db.collection('roads');

        // let rawdata = fs.readFileSync('./src/data/roads.json');
        // let student = JSON.parse(rawdata);
        // console.log(student)

        // table.insertMany(student.features)

        // const cursor = await table.find();
        // const all = await cursor.toArray()
    } finally {

    }
}

async function getRoads() {
    try {
        const db = client.db('besancon-roads');
        const table = db.collection('roads');
        const cursor = await table.find();
        return await cursor.toArray()
    } finally {

    }
}


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/roads', async (req, res) => {
    const roads = await getRoads()
    res.json(roads)
})

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
    await run()
    // await client.close()
})

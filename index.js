const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.k05o9k1.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('watchResale').collection('reSale');
        const accsoriesCollection = client.db('watchResale').collection('accSories');
        
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        })
        // accsories
        app.get('/accsories', async (req, res) => {
            const query = {};
            const cursor = accsoriesCollection.find(query);
            const accsories = await cursor.toArray();
            res.send(accsories)
        })
    }
    finally {

    }
}
run().catch(err => console.err(err))



app.get('/', (req, res) => {
    res.send('Genious car is running')
})
app.listen(port, () => {
    console.log(`Genious car was running on ${port}`)
})
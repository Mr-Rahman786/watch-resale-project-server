const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const orderCollection = client.db('watchResale').collection('orders');

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query)
            res.send(service)
        })


        // accsories
        app.get('/accsories', async (req, res) => {
            const query = {};
            const cursor = accsoriesCollection.find(query);
            const accsories = await cursor.toArray();
            console.log(accsories)
            res.send(accsories)
        })
        app.get('/accsories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await accsoriesCollection.findOne(query)
            res.send(service)
        })


        // orders api

        app.get('/orders', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = orderCollection.find(query)
            const orders = await cursor.toArray();
            res.send(orders);
        })

        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order)
            res.send(result)
        })

        // delete the products will called there

        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query)
            res.send(result);
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
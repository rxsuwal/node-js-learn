// const mongodb = require('mongodb')

// const MongoClient = mongodb.MongoClient

// const connectionURL = 'mongodb://localhost:27017'

// const databaseName = 'task-manager'

// MongoClient.connect(connectionURL, (error, client) => {
//     if (error) {
//         return console.log("unable to connect to database")
//     }

//     const db = client.db(databaseName)

//     db.collection('users').insertOne({
//         name:'John Doe',
//         email:"johndoe@example.<EMAIL>",
//         passwordHash:'<PASSWORD>',
//     })

//     console.log('CONNECTION SUCCESSFUL!')
// })


const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// const id = new ObjectId()
// Replace the placeholder with your Atlas connection string
const uri = 'mongodb://127.0.0.1:27017';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");


        const db = client.db('task-manager')

        // INSERT TO USER
        // await db.collection('users').insertOne({
        //     name: 'John Doe',
        //     email: "johndoe@example.<EMAIL>",
        //     passwordHash: '<PASSWORD>',
        // }).then((res) => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log('ERROR', err)
        // })

        // INSERT TO TASK COLLECTION
        // await db.collection('tasks').insertOne([
        //     {
        //         name: 'Task 1',
        //         deadline: "1 month"
        //     },
        //     {
        //         name: 'Task 2',
        //         deadline: "2 month"
        //     },

        // ]).then((res) => {
        //     console.log(res)
        // }).catch(err=>{
        //     console.log('ERROR',err)
        // })

        // SEARCH
        // await db.collection('tasks').findOne({ _id: new ObjectId('64bf8f495e63be14ba5ceaa9') }).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log(err)
        // })

        // await db.collection('users').find({passwordHash:"<PASSWORD>"}).tryNext().then(res=>{
        //     console.log(res)
        // }).catch(err=>{
        //     console.log(err)
        // })

        // UPDATE
        // update one
        // await db.collection('tasks').updateOne({
        //     _id: new ObjectId('64bf8f495e63be14ba5ceaa9')
        // },{
        //     $set:{
        //         email:'tahmujilaikinachaiyo'
        //     },
        //     $inc:{
        //         deadline:-1
        //     }
        // }).then(res=>{
        //     console.log(res)
        // }).catch(err=>{
        //     console.log(err)
        // })

        // UPDATE MANY
        // await db.collection('tasks').updateMany({
        //    deadline:"2 month"
        // },{
        //     $set:{
        //         email:'nai@malai.thaxaina'
        //     }
        // }).then(res=>{
        //     console.log(res)
        // }).catch(err=>{
        //     console.log(err)
        // })


        // DELETE
        await db.collection('tasks').deleteOne({
           _id:new ObjectId('64bf8f495e63be14ba5ceaa9'),

        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })


    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);


const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' 





// MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error,client) => {
//     if(error){
//         return console.log('Cannot connect to server')
//     }
//     const db = client.db(databaseName)
//     db.collection('users').insertOne({
//         user: 'Gurashish',
//         age: 24,
//     }, (error, response) => {
//         if(error){
//             return console.log('Unable to insert data')
//         }
//         console.log(response)

//     })
//     //console.log('Connected')
// })

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log('Unable to connect')
    }
    const db = client.db(databaseName)
    db.collection('tasks').insertMany([{
        description: 'Study',
        completed: true,
    }, {
        description: 'Build Robot',
        completed: false,
    }], (error, response) => {
        if(error){
            return console.log('Unable to add data')
        }
        console.log('Data added')
    })
})

// In a similar way like above we can perform all CRUD operations
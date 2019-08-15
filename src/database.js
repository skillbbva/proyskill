const mongoose = require('mongoose');
//const URL_MYDB = 'https://api.mlab.com/api/1/databases/techu15db/collections/';
//const clienteMlab = requestJSON.createClient(URL_MYDB);
//require('dotenv').config();
//const mapiKey = 'apiKey=' + process.env.mapiKey;

mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@cluster0-40pd9.mongodb.net/test?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('db is connect'))
.catch(err => console.error(err));



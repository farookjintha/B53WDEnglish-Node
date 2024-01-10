const mongoose = require('mongoose');

const db = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/ecommerce');
        console.log('Database connection established.')
    }catch(error){
        console.log('Error while connecting DB: ', error)
    }
}

module.exports = db;
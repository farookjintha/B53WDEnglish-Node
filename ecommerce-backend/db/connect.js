const mongoose = require('mongoose');

const db = async () => {
    try{
        await mongoose.connect('mongodb+srv://farookjintha:Welcome123@ecommerce-db.p2sfdjs.mongodb.net/?retryWrites=true&w=majority');
        console.log('Database connection established.')
    }catch(error){
        console.log('Error while connecting DB: ', error)
    }
}

module.exports = db;
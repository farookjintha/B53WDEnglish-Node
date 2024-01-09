const express = require('express');
var fs = require('fs');  // imports File System Module




const app = express();

app.use(express.json());


// Create a file
app.post('/create-file', (req, res) => {
    try{
        let currentTimestamp = new Date();
        let fileName = `${currentTimestamp.getDate()}-${currentTimestamp.getHours()}${currentTimestamp.getMinutes()}${currentTimestamp.getSeconds()}.txt`
        fs.writeFile(`files/${fileName}`, currentTimestamp, (error) => {
            if (error) throw error;
            res.status(200).send({
                message: 'File has been created successfully.'
            })
          });
    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});


// Retrieve all files


app.listen(4001, () => {
    console.log('App is running on port 4001')
});
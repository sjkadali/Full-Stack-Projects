const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

const fs = require('fs');

const excelToJson = require('convert-excel-to-json');

const fileStorage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname+ '_'+ Date.now()+
        path.extname(file.originalname));
    },
});

const upload = multer({ storage: fileStorage });

let uploadFile = '';
app.post('/single', upload.single('uploadFile'), (req, res) => {
    console.log(req.file);
    if(res) {
        uploadFile= req.file.filename;
        let jsonFile = excelToJson({
            sourceFile: 'uploads/'+uploadFile   ,
            header: {
                rows: 1
            } ,
            columnToKey: {
                '*': '{{columnHeader}}'
            }
        });    
        jsonFile ? res.status(200).send(jsonFile) : '';
        res.status(200).send("File uploaded and converted to json format is: ", jsonFile);   
    }
});


app.listen(3000, ()=> console.log('Server started on port 3000'));
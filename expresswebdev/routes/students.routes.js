const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const fs = require('fs');

router.get('/',  (req, res) => { 
    console.log("Getting /student");     
    fs.readFile('./students.json',  'utf-8',(err,result) => {
        if (err) throw err
            else {
                result = JSON.parse(result);
                console.log("result: ",result);
                return res.send({result});
            }
    });       
}); 

router.post('/', jsonParser, (req, res) => {
    let body = req.body;
    console.log(req, JSON.stringify(body), '*******');
    let data = [];
    
        fs.readFile('./students.json',  'utf-8',(err,result) => {
            if (err) throw err
                else {
                console.log("result: ",result);
                data = JSON.parse(result);
                console.log('data: ',data, typeof(data), data[data.length-1].id);
            
                body.id = data[data.length-1].id+1;
                data.push(body);
                data= JSON.stringify(data);
                fs.writeFile('./students.json', data, (err, result) => {
                    if(!err) {
                        console.log(err, result, "Wrote students to file *********");
                        return res.send(data);
                    }
                    console.log(err, result, ' Error');
                });
            }
        });            
});

router.patch('/:id', jsonParser,(req, res) => {
    const id = parseInt(req.params.id);   
    const body = req.body;
    console.log('body, id: ',  JSON.stringify(body), id);
    fs.readFile('./students.json',  'utf-8',(err,result) => {
        if (err) throw err
            else {
                result = JSON.parse(result);
                console.log("result: ",result);
                const studentIndex = result.findIndex(student => student.id === id);
                console.log('student: ', studentIndex);
                if (studentIndex) {
                    Object.keys(body).forEach(key => {
                        result[studentIndex][key] = body[key];
                    });
                    let data= JSON.stringify(result);
                    fs.writeFile('students.json', data, (err, result) => {
                        if(!err) {
                            console.log(err, result, "Updated Students *********");
                            return res.send(data);
                        }
                        console.log(err, result, ' Error');
                    });                
                } else return console.log('student record could not be updated');
            }
    });    
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log('id: ', id);
    fs.readFile('./students.json',  'utf-8',(err,result) => {
        if (err) throw err
            else {
                result = JSON.parse(result);
                console.log("result: ",result);
                let data = JSON.stringify(result.filter(student => student.id !== id));               
                fs.writeFile('students.json', data, (err, result) => {
                    if(!err) {
                        console.log(err, result, "Deleted Student *********");
                        return res.send(data);
                    }
                    console.log(err, result, 'DElete Error');
                });                
            }
    });     
}); 

module.exports = router;
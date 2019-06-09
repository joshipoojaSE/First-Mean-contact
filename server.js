const express = require('express');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyparser = require('body-parser');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());
const port = 3000;

app.get('/contactlist', (req, res) => {
    db.contactlist.find((err, docs) => {
        res.json(docs);
    })
    
})

app.post('/contactlist', (req, res) => {
    db.contactlist.insert(req.body, (err, docs) => {
        res.json(docs);
    })
})

app.delete('/contactlist/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({ _id: mongojs.ObjectId(id)}, (err, docs) => {
        console.log(err);
        console.log(docs);
        res.json(docs);
    });
})

app.get('/contactlist/:id', (req, res) => {
    var id = req.params.id;
    db.contactlist.findOne({ _id: mongojs.ObjectId(id)}, (err, docs) => {
        res.json(docs);
    });
})


app.put('/contactlist/:id', (req, res) => {
    var id = req.params.id;
    // console.log(req.body);
    db.contactlist.findAndModify({
        query: { _id: mongojs.ObjectId(id)}, 
        update: {
            $set: {
                name: req.body.name,
                email: req.body.email,
                number: req.body.number
            }
        },
        new: true
    },
    (err, doc) => {
        res.json(doc);
    });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
var express = require('express');
var time = require('./Time/time');
var api = require('./API/library');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(process.env.PORT || 3000, function () {
    console.log('Server started!')
});

router.get('/time', function (req, res) {
    res.json({
        timeNow: time.ntime()
    });
});

router.get('/v1/book', function(req, res) {
    api.getbooks().then(function (data){
        // console.log(data);
        res.json(data);
    });
});

router.get('/v1/book/:id', function (req, res) {
    api.getonebook(req.params.id).then(function (data) {
        res.json(data);
    })
});

router.post('/v1/book', function (req, res) {
    var book = req.body;
    api.addbook(book).then(function (data) {
        res.status(201).json(data);
    });
});

router.delete('/v1/book/:id', function (req, res) {
    var id = req.params.id;
    api.deletebook(id).then(function (data) {
        res.json(data);
    });
});

router.put('/v1/book/:id', function (req, res) {
    var id = req.params.id;
    var book = req.body;
    api.updatebook(id, book).then(function (data) {
        res.json(data);
    });
});
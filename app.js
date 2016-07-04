/**
 * Created by samsung np on 16.06.2016.
 */
/**
 * Created by samsung np on 14.06.2016.
 */
var express = require('express');
var bodyParser = require("body-parser");
var formidable = require('formidable');
var path = require('path');
var parser = require("./parser");
var writer = require("./writer");

var app = express();

var i=1;


app.use(bodyParser.urlencoded({extended: true }));


app.use(express.static(__dirname + '/public'));

app.get('/login', function (req, res){
    res.sendFile(__dirname + '/login.html');

});

app.post('/login', function (req, res){
    console.log(req.body);
    res.sendFile(__dirname + '/index.html');

});

app.get('/', function (req, res){
 res.sendFile(__dirname + '/index.html');
   /* res.sendFile(__dirname + '/static/public/logo1.png');*/
});

app.post('/', function (req, res){

    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        parser.fileNameParser(file.name)
    });
    res.sendFile(__dirname + '/index.html');

});

app.post('/writer', function (req, res){
    console.log("запрос успешно получен");
    var username = req.body.user;

    var usedReport="lostIncome";
    var company=' Открытое акционерное общество "УК "Городская"';
    var houseList=['Лермонтовский просп. 12'];
    var usedYears=[2015,2016];
    var usedMonths=[1,2,3,4,5,6,7,8,9,10,11,12];

    writer.reportSelector(usedReport,company,houseList,usedYears,usedMonths,res);


});

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Express server listening on port %s", port);
});
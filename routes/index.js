var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/test', function (req, res, next) {
    var option = {
        url: 'https://api.github.com/repos/joyent/node/commits',
        headers: {
            'User-Agent': 'request'
        }
    };
    request(option, function (error, response, body) {
        var data = JSON.parse(body);
        console.log(data);

        res.render('index', {title: 'Express',data:data});
    });
});

//var requestAsync=function(data,callback){
//    var option={
//        headers: {
//            'User-Agent': 'request'
//        }
//    };
//    for(var i=0;i<data.length;i++){
//        option.url=data[i].object.sha;
//        var n=0;
//        request(option, function (error, response, body){
//        });
//    }
//}

module.exports = router;

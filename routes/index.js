var express = require('express');
var process = require("process");
var config = require("../config");
var rule = require("../ex/rule");
var chk = require("../ex/chk");
var restler = require('restler');

var router = express.Router();

var argv = process.argv;
var javaArgs, nodeArgs, htt;
var originalUrl = "",javaPath;

argv && argv.forEach(function (item, i) {
    if (item.split("=")[0] == "java") {
        javaArgs = item.split("=")[1];
        getHtt(javaArgs);
    } else if (item.split("=")[0] == "node") {
        nodeArgs = item.split("=")[1];
    } else {
        javaArgs = "test";
        nodeArgs = "local";
        getHtt(javaArgs);
    }
});

//识别是http还是https请求.
function getHtt(args) {
    var o = config[args].http == "true" && (htt = "http://") || (htt = "https://");
    return o;
}

/* 获取所有请求头 */
router.all('*', function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ,userId,sessionId');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Content-Type','text/html;charset=utf-8');

    console.log(req.headers);
    if (req.method == 'OPTIONS') {
        /*让options请求快速返回*/
        res.send(200);
    } else {
        try{
            originalUrl = req.originalUrl;
            var IP = config[javaArgs].java.ip + ":" + config[javaArgs].java.port;
            javaPath = htt + IP + originalUrl;

            console.log("\n=============== Service Info ================");
            console.log("TIME: " + req._startTime);
            console.log("TYPE: " + req.method);
            console.log("IP: " + IP);
            console.log("PATH: " + req.path);
            console.log("DATA:" , req.body);
            chk.verify(req,res,function(rs){
                //console.log("====",rs);
                next();
            });
            //next();
        }catch(e){
            res.status(500);
            console.log(e);
            res.end();
        }
    }
});

//转发java处理
router.use(originalUrl, function (req, res, next) {
    try{
        if(req.method == "GET"){
            restler.get(javaPath).on('complete', function(result) {
                if (result instanceof Error) {
                    console.log('Error:', result.message);
                    this.retry(5000);               // try again after 5 sec
                } else {
                    res.end(result);
                }
            })
        }else if(req.method == "POST"){
            restler.postJson(javaPath).on('complete', function (data, response) {
                console.log(data);
                res.end(data)
            });
        }
    }catch(e){
        console.log(e);
    }
});

module.exports = router;

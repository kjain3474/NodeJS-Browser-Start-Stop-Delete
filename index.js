const exec = require('child_process').exec;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var url = require("url");
var fs = require('fs')

const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {

        //returning true if service is running or false if not
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

app.get("/start", function(req, res) {
    const queryObject = url.parse(req.url,true).query;

    isRunning(queryObject["browser"]+".exe", (status) => {
        if(!status){
        exec(`start ${queryObject["browser"]} ${queryObject["url"]}` , function(err) {
            if(err){ 
                console.log(err)
            }
            
            else{ console.log("success open")
            }
            
            })
         }
    })
    
})


app.get("/stop", function(req, res) {
    const queryObject = url.parse(req.url,true).query;

    isRunning(queryObject["browser"]+".exe", (status) => {
        if(status){
        exec(`taskkill /F /IM ${queryObject["browser"]}.exe` , function(err) {
            if(err){
                console.log(err)
            }
            
            else{ console.log("success stop")
            }
            
            })
         }
    })
    
})


app.get("/geturl", function(req, res) {
    const queryObject = url.parse(req.url,true).query;

    const browser = queryObject["browser"];

    if(browser == 'firefox')
    {
        var file = "C:/Users/kmj/AppData/Roaming/Mozilla/Profiles/mrh67230.default-release/sessionstore-backups/recovery.jsonlz4"
        fs.open(file, 'r', function(err, fd) {
            if (err) {
                console.error(err)
                return
              }
              console.log(data)
            
          });
    }else if (browser == 'chrome')
    {
        var file = "C:/Users/kmj/AppData/Local/Google/Chrome/User Data/Default/Current Tabs";
        fs.stat(file, function(err, stat)
        {
                if(err) {
                    console.log(err);
                    return;
                }
          
          var stream = fs.createReadStream(file,{start:0, end:stat.size});
        
          stream.addListener("data", function(filedata){
                    filedata = filedata.toString('utf-8').trim();

                    console.log(filedata);

                    stream.close();
    
                });
        });

    }
    
})

app.get("/cleanup", function(req, res) {
    const queryObject = url.parse(req.url,true).query;

    const browser = queryObject["browser"];

    isRunning(browser+".exe", (status) => {
        if(!status){

            if(browser == 'firefox'){
                exec(`removeFirefoxData.bat`, {maxBuffer: 1024 * 500} , function(err) {
                    if(err){ //process error
                        console.log(err)
                    }
                    
                    else{ console.log("success cleanup")
                    }
                    
                    })
            }else if(browser == 'chrome')
            {
                exec(`removeChromeData.bat`, {maxBuffer: 1024 * 500} , function(err) {
                    if(err){ //process error
                        console.log(err)
                    }
                    
                    else{ console.log("success cleanup")
                    }
                    
                    })
            }
         }else{
             console.log("Stop Browser before cleaning")
         }
    })
    
})

server.listen(3000, function () {
    console.log('listening on port 3000!');
  });
  
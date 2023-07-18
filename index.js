var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write(" Noofvariables=3 \n\
hello\n\
dear");
    
    res.end();
}).listen(process.env.PORT || 3000);

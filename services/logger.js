var fs = require('fs')
var winston = require('winston')

if(!fs.existsSync('logs'))
{
  fs.mkdirSync("logs")
}

var logger= new winston.Logger({
    transports:[
        new winston.transports.File({
          level:"info",
          filename:"./logs/app.log",
          json:true
        }),
        new winston.transports.Console({
          level:'debug',
          handleExceptions: true,
          colorize: true
        })
    ],
    exitOnError: false
});

module.exports=logger

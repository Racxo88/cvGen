var fs = require('fs')
var winston = require('winston')

if(!fs.existsSync('logs'))
{
  fs.mkdirSync("logs")
}

var logger= new winston.Logger({
    transports:[
        new winston.transports.File({
          level:"warning",
          filename:"./logs/app.log",
          maxsize:104857,
          maxFiles:10,
          colorize:false,
          json:true
        }),
        new winston.transports.Console({
          level:'debug',
          handleExceptions: true,
          json: false,
          colorize: true,
          silent: true
        })
    ],
    exitOnError: false
});

module.exports=logger

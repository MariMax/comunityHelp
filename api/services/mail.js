var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');
var hbs = require('nodemailer-express-handlebars');

var transport = nodemailer.createTransport(sesTransport({
    accessKeyId: process.env.AWSACCESSKEY,
    secretAccessKey: process.env.AWSSECRETKEY,
    rateLimit: 1 // do not send more than 1 message in a second
}));

 var options = {
     viewEngine: {
         extname: '.handlebars',
         partialsDir : 'views/mails/'
     },
     viewPath: 'views/mails/',
     extName: '.handlebars'
 };

transport.use('compile', hbs(options));

module.exports.mail = {
    send: function(context, template, to, next) {
        transport.sendMail({
            from: process.env.FROM,
            to: to,
            subject: context.subject,
            template: template,
            context: context.body
        });
        next();
    }
}

const nodemailer = require('nodemailer')


function serverMailer(req, res){
    console.log('server mailer', req.body)

    const { name, email, message, emailTo } = req.body

    console.log(name, email)

    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'workingforfamiliesnz@gmail.com',
          pass: '84people6'
        }
    });

    var mailOptions = {
        to: emailTo,
        from: email,
        subject: `Contact request from ${name}`, 
        html: `
            <h2>Contact Us Request</h2>
            <h5>You have a contact request from ${name} at ${email}</h5>
            <h5>Message:</h5>
            <p>${message}</p>
            `
    };

    smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          throw new Error('There was an issue with sending the email - please try again later'); 
        } else {
          console.log('Email sent: ' + info.response);
          res.send(info.response)
        }
    });
    
}

module.exports = serverMailer
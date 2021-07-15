


const generateEmail = (subject, type, data) => {
    const mailgun = new Mailgun({ apiKey: process.env.apiKey, domain: process.env.domain });
    let html
    switch (type) {
        case "Reset Password":
            html = '<h1>Click on the link below to reset password</h1> <a href="http://localhost:3000/auth/resetPassword/valid?token=' + data.token + '">Im Clickable!</a>'
            break;
        case "Invite Employee":
            html = '<h1>Click on the link below to register</h1> <a href="http://localhost:3000/auth/newEmployee/valid?email=' + data.email + '&buisnessID=' + data.buisnessID + '">Im Clickable!</a>'
            break
        case "Verification Email":
            html = '<h1>Click on the link below to finish Regisration</h1> <a href="http://localhost:3000/verification/valid?token=' + data.token + '">Im Clickable!</a>'
        default:
            break;
    }
    const msgData = {
        from: process.env.email,
        to: req.body.email,
        subject: subject,
        html: html
    }
    mailgun.messages().send(msgData, function (err, body) {
        if (err) {
            return res.sendStatus(400)
        }
        return res.sendStatus(200)
    });
}

module.exports = generateEmail
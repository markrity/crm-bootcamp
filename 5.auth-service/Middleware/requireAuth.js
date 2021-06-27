var url = require("url");
const jwt = require("jsonwebtoken")

const requireAuth = (req, res, next) => {
    console.log("In Middleware")
    const parsedUrl = url.parse(req.originalUrl);
    const split = parsedUrl.href.split('/')
    console.log(split)
    if (split.length > 1 && (split[1] === 'auth')) {
        console.log("Skip Middleware ")
        next()
    } else {
        console.log("Not Out")
        const token = req.cookies.token;

        if (!token) {
            console.log("No Token")
            return res.sendStatus(430);
        }
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            console.log(data)
            req.user = {
                id: data.id,
                firstName: data.firstName
            }
            next();
        } catch {
            return res.sendStatus(403);
        }
    }
};

module.exports = requireAuth
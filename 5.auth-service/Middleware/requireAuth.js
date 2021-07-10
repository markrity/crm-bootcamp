const url = require("url");
const jwt = require("jsonwebtoken")

const requireAuth = (req, res, next) => {
    const parsedUrl = url.parse(req.originalUrl);
    const split = parsedUrl.href.split('/')
    if (split.length > 1 && (split[1] === 'auth')) {
        next()
    } else {
        const token = req.cookies.token;

        if (!token) {
            return res.sendStatus(430);
        }
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
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
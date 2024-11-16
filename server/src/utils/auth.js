const jwt = require("jsonwebtoken");

const signInToken = (userId) => {
    return jwt.sign(
        {
            userId
        },
        "secret",
    );
}

const isAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).send({
                message: "Authorization required",
                status: 401,
                data: null
            });
        }
        const token = authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                message: "Authorization required",
                status: 401,
                data: null
            });
        }
        const decoded = jwt.verify(token, "secret");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).send({ status: 400, message: error.message, data: null });
    }
}

module.exports = {
    signInToken,
    isAuth
} 

const jwt = require("jsonwebtoken");
const config = require('../constants/config');
const prisma = require('../constants/db');

const authMiddleWare = async (req, res, next) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            message: 'No token provided',
        });
    }

    try {
        const decoded = jwt.verify(token, config.accessToken);
        const user = await prisma.user.findUnique({
            where: {
                email: decoded.userEmail,
            }
        });
        if (!user) {
            return res.status(401).json({ status: "fail", message: "User not found" });
        }
        req.user = {
            name: user.name,
            role: user.role,
        };
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ status: "fail", message: "Invalid token" });
    }
};

module.exports = authMiddleWare;

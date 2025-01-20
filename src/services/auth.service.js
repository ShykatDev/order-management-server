const prisma = require('../constants/db')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const config = require('../constants/config')

exports.createAccount = async function (data) {
//     verify existing user
        const findUser = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if(findUser) {
            throw new Error("User already exists")
        }

//     hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);
//     create user
       return prisma.user.create({
           data: {
               name: data.name,
               email: data.email,
               password: hashedPassword,
           }
       });
}

exports.loginAccount = async function(data) {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if(!user) {
        throw new Error("Incorrect email or password")
    }

    const isPassValid = await bcrypt.compare(data.password, user?.password);

    if(!isPassValid) {
        throw new Error("Incorrect password")
    }

    const accessToken = jwt.sign(
        {userEmail: `${user.email}`},
        config.accessToken,
        {expiresIn: "1d"}
    );

    const refreshToken = jwt.sign(
        {userEmail: `${user.email}`},
        config.refreshToken,
        {expiresIn: "7d"}
    );

    return {accessToken, refreshToken};
}
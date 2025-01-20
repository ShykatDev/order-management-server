const catchError = require('../utils/catchErrors')
const {z} = require("zod")
const prisma = require("../constants/db");

const {createAccount, loginAccount} = require("../services/auth.service");

const registerSchema = z.object({
    name: z.string(),
    email: z.string().email().min(6).max(255),
    password: z.string().min(6).max(255),
})

exports.Register = catchError(
    async (req, res) => {
        // validate data
        const request = registerSchema.parse({
            ...req.body,
        })

        // service
        await createAccount(request)

        return res.status(201).json({
            message: "Account created successfully",
        })
    }
)

exports.SignIn = catchError(
    async (req, res) => {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and Password is required",
            })
        }

    //     service
        const {accessToken, refreshToken} =  await loginAccount(req.body);

        return res.status(200).json({
            accessToken,
            refreshToken,
        })
    }
)

exports.GetAccount = catchError(
    async (req, res) => {
        const email = req.query.email;

        if (!email) {
            return res.status(400).json({
                message: "Email query parameter is required",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }

        const data = {
            message: "Account retrieved successfully",
            user: {
                name: user.name,
                email: user.email,
            },
        };

        return res.status(200).json(data);
    }
);

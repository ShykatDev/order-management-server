const catchError = require('../utils/catchErrors')
const {z} = require("zod");
const prisma = require('../constants/db')

exports.GetPromoTypes = catchError(
    async (req, res) => {
        const types = await prisma.promotionType.findMany()
        return res.status(200).json({
            data: types,
        })
    }
)

exports.CreatePromoTypes = catchError(
    async (req, res) => {
        // create product
        await prisma.promotionType.create({
            data: {
                ...req.body,
            }
        })

        res.status(200).json({
            status: "Promotion Type Create",
        })
    }
)
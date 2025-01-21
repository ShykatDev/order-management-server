const catchError = require('../utils/catchErrors')
const {z} = require("zod");
const prisma = require('../constants/db')

const promotionSchema = z.object({
    title: z.string(),
    start_date: z.string().optional(),
    end_date: z.string(),
    is_enabled: z.boolean().optional(),
    discount_amount: z.number(),
    products: z.array(z.number()),
    promotion_type_id: z.number(),
})

exports.GetPromotions = catchError(
    async (req, res) => {
        const data = await prisma.promotion.findMany({
            include: {
                promotion_type: true
            }
        })
        res.status(200).json(data)
    }
)

exports.CreatePromotions = catchError(
    async (req, res) => {
        // validate
        const promotion = promotionSchema.parse({
            ...req.body,
        })

        // create product
        await prisma.promotion.create({
            data: {
                ...promotion,
                title: promotion.title,
                end_date: new Date(promotion.end_date),
                discount_amount: promotion.discount_amount,
                products: {
                    connect: promotion.products.map((productId) => ({ id: productId })), // Use 'connect' for existing products
                },
                promotion_type_id: promotion.promotion_type_id
            },
        })

        res.status(201).json({
            status: "Promotion Create",
        })
    }
)

exports.EditPromotions = catchError(
    async (req, res) => {
        const product = await prisma.promotion.findUnique({
            where: {
                id: Number(req.params.id),
            }
        })

        if(!product) {
            res.status(404).json({
                status: "Promotion Not Found",
            })
        }

        const updatedData = {
            title: req.body.title,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            is_enabled: req.body.is_enabled,
        };

        if (req.body.start_date) {
            updatedData.start_date = new Date(req.body.start_date);
        }
        if (req.body.end_date) {
            updatedData.end_date = new Date(req.body.end_date);
        }


        await prisma.promotion.update({
            where: {
                id: Number(req.params.id)
            },
            data: {...updatedData},

        })

        res.status(200).json({
            status: "Promotion Edit",
        })
    }
)

exports.DeletePromotions = catchError(
    async (req, res) => {
        await prisma.promotion.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(201).json({
            status: "Promotion Deleted",
        })
    }
)
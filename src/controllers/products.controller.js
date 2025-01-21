const catchError = require('../utils/catchErrors')
const {z} = require("zod");
const prisma = require('../constants/db')

const productSchema = z.object({
    name: z.string(),
    price: z.string(),
    description: z.string(),
    weight: z.string(),
    promotion_id: z.number().optional(),
})

exports.GetProducts = catchError(
    async (req, res) => {
        const data = await prisma.product.findMany()

        const filteredData = data.map((product) => ({
            ...product,
            promotion: product?.promotion?.is_enabled ? product?.promotion : null,
        }));

        res.status(200).json(filteredData)
    }
)

exports.CreateProduct = catchError(
    async (req, res) => {
        // validate
        const product = productSchema.parse({
            ...req.body,
        })

        // create product
        await prisma.product.create({
            data: {
                ...product
            }
        })

        res.status(200).json({
            status: "Products Create",
        })
    }
)

exports.EditProduct = catchError(
    async (req, res) => {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(req.params.id),
            }
        })

        if(!product) {
            res.status(404).json({
                status: "Product Not Found",
            })
        }

        await prisma.product.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                ...req.body,
            }
        })

        res.status(200).json({
            status: "Products Edit",
        })
    }
)

exports.DeleteProduct = catchError(
    async (req, res) => {
        await prisma.product.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(201).json({
            status: "Products Deleted",
        })
    }
)
const catchError = require('../utils/catchErrors')
const prisma = require('../constants/db')

exports.GetCarts = catchError(
    async (req, res) => {
        const cart = await prisma.cart.findMany()
        return res.status(200).json({
            data: cart,
        })
    }
)

exports.CreateCart = catchError(
    async (req, res) => {
        const { user_id, products } = req.body;
            await prisma.cart.create({
                data: {
                    user_id,
                    products: {
                        create: products.map(product => ({
                            product_id: product.product_id,
                            quantity: product.quantity,
                        })),
                    },
            },
            include: {
                products: true,
            },
        });
        return res.status(201).json({
            message: 'Successfully created cart',
        })
    }
)
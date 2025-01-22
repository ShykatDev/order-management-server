const catchError = require('../utils/catchErrors')
const prisma = require('../constants/db')

exports.GetOrders = catchError(
    async (req, res) => {
        const orders = await prisma.orders.findMany({
            include: {
                products: {
                    select: {
                        product:true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                weight_slab:{
                    select: {
                        created_at: false,
                        promotion_type: true
                    }
                }
            }
        });
        return res.status(200).json({
            data: orders,
        });
    }
);


exports.CreateOrder = catchError(async (req, res) => {
    const { quantity, user_id, total_order_price, products, slab_id, weight } = req.body;

    await prisma.orders.create({
        data: {
            quantity,
            user_id,
            total_order_price,
            slab_id,
            weight,
            products: {
                create: products.map(product => ({
                    product_id: product.product_id,
                    quantity: product.quantity
                })),
            },
        },
    });

    res.status(201).json({
        status: "Order Created",
    });
});


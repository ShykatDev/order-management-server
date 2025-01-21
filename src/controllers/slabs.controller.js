const catchError = require('../utils/catchErrors')
const prisma = require('../constants/db')

exports.GetSlabs = catchError(
    async (req, res) => {
        const slabs = await prisma.weightSlab.findMany({
            include: {
                promotion_type: true
            }
        })
        return res.status(200).json({
            data: slabs,
        })
    }
)

exports.CreateSlabs = catchError(
    async (req, res) => {
        // verify same slab exist or not
        const findSlab = await prisma.weightSlab.findFirst({
            where: {
                min: req.body.min,
                max: req.body.max,
            }
        })

        if(findSlab){
            return res.status(400).json({
                message: 'Slab already exists with this min and max',
            })
        }

        const weightPromoType = await prisma.promotionType.findUnique({
            where: {
                type: "weighted"
            }
        })

        const payload = weightPromoType ? {
                ...req.body,
                promotion_type_id: weightPromoType?.id
            } : {...req.body}

        if(weightPromoType) {
            await prisma.weightSlab.updateMany({
                where: {
                    promotion_type_id: null
                },
                data: {
                    promotion_type_id: weightPromoType?.id
                }
            })
        }
        // create product
        await prisma.weightSlab.create({
            data: {
                ...payload,
            }
        })

        res.status(201).json({
            status: "Slab Create",
        })
    }
)
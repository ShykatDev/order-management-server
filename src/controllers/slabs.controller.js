const catchError = require('../utils/catchErrors')
const prisma = require('../constants/db')

exports.GetSlabs = catchError(
    async (req, res) => {
        const slabs = await prisma.weightSlab.findMany()
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

        // create product
        await prisma.weightSlab.create({
            data: {
                ...req.body,
            }
        })

        res.status(201).json({
            status: "Slab Create",
        })
    }
)
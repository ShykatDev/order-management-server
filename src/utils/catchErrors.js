const catchErrors = (controller) => {
    return async(req, res, next) => {
        try{
            await controller(req, res);
        }catch(e){
            return next(e);
        }
    }
}

module.exports = catchErrors;
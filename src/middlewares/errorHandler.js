const errorHandler = (err, req, res, next) => {
    console.log(`Path: ${req.path}`,err);
    res.status(500).json({
        status: "Internal Server Error",
        message: err.toString(),
    })
}

module.exports = errorHandler;
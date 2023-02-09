const errorManager = (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
        error: err
    })
}

module.exports = errorManager;
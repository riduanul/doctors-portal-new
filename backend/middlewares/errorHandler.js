function errorHandler (err, req, res, next) {
    if (res.headersSent) return next(err)
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went Wrong!"
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {}
  })
}
  
  module.exports = errorHandler
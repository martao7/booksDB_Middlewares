export const errorHandler = (err, req, res, next) => {
    console.error(er.stack);
    return res.status(500).json({error: err.message});
    next();
};
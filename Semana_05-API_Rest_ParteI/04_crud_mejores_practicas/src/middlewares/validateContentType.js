// Valida que el Content-Type sea application/json
const validateContentType = (req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.headers['content-type'] !== 'application/json') {
        return res.status(400).send('Content-Type debe ser application/json');
    }
    next();
};

export default validateContentType;
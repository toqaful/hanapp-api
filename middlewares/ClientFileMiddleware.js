const ClientFileMiddleware = async (req, res, next) => {
    console.log(req.body.pic);
    if (req.hasOwnProperty('file') && req.file['pic']) {
        next();
    } else {
        return res.status(401).json({ status: 'error', message: 'invalid request' });
    }
};

module.exports = ClientFileMiddleware;

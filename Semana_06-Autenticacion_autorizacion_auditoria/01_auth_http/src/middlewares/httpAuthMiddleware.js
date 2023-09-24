const service = require('../services/usersService');

function httpAuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).setHeader('WWW-Authenticate', 'Basic realm="Authentication required"').send('Unauthorized');
        return;
    }

    // Decode the base64-encoded username and password
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    const user = service.find(username, password);
    if (!user) {
        // Authentication failed
        res.status(401).setHeader('WWW-Authenticate', 'Basic realm="Authentication required"').send('Unauthorized');
        return;
    }

    next();
}

module.exports = { httpAuthMiddleware };
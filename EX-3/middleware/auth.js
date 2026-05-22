// middleware/auth.js

const auth = (req, res, next) => {
    const { token } = req.query;

    // The assignment suggests checking for 'xyz123'
    if (token === 'xyz123') {
        // If the token matches, move to the next middleware or route handler
        next();
    } else {
        // If missing or incorrect, stop the request here
        res.status(401).send("Unauthorized: A valid token is required to access this resource.");
    }
};

export default auth;
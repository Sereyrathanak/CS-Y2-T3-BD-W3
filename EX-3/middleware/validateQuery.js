const validateQuery = (req, res, next) => {
    const { minCredits, maxCredits } = req.query;

    if ((minCredits && isNaN(minCredits)) || (maxCredits && isNaN(maxCredits))) {
        return res.status(400).send("Error: Credits must be numbers.");
    }

    if (minCredits && maxCredits && parseInt(minCredits) > parseInt(maxCredits)) {
        return res.status(400).send("Error: minCredits cannot be greater than maxCredits.");
    }

    next();
};
export default validateQuery;
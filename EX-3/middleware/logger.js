import { timeStamp } from "node:console"

const logger = (req, res, next) => {
    console.log({
        method: req.method, 
        path: req.path,
        query: req.query,
        timeStamp: new DataTransfer().toISOString()
    });
    next(); 
}
export default logger; 
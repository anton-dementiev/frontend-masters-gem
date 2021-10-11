const crypto = require('crypto');

const checkSecret = (req, res, next) => {
    
    const temp = "0e8875debb9cbe4f5c2ac1a625b030665ae32e0ac2c4f03827d6d69441a91743";
    const authHeader = req.headers.authorization ? req.headers.authorization.split(' ')[1] : false;
    console.log(authHeader);
    const secret = process.env.API_KEY;
    const message = process.env.MESSAGE;
    console.log(secret);
    const cipher = crypto.createHmac("sha256", secret).update(message).digest('hex');
    console.log(cipher);

    if (!authHeader | cipher !== authHeader) {
        res.status(403).json({message: "No credentials provided. Fuck off, Oleg!"})
    } else {
        next();
    }

}


module.exports = checkSecret;
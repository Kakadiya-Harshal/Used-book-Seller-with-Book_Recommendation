const { verify } = require('jsonwebtoken');

function decodeJWTtoken(req, res) {

    const { authorization } = req.headers;
    console.log(authorization);
    if ('Bearer undefined' !== authorization) {
        const token = authorization.split(' ')[1];
        if ('undefined' !== token) {
            try {
                const decoded = verify(token, process.env.JWTPRIVATEKEY);
                if (decoded === undefined) {
                    res.status(401).json({
                        error: {
                            errorMessage: ['you are not authorized for this page']
                        }
                    });
                }
                else {
                    return decoded;
                }
            } catch (error) {
                return res.status(404).json({
                    error: {
                        errorMessage: ['Token is not valid']
                    }
                })
            }
        } else {
            res.status(401).json({
                error: {
                    errorMessage: ['you are not authorized for this page']
                }
            });
        }
    } else {
        console.log('baread header is not exists')
        res.status(401).json({
            error: {
                errorMessage: ['you are not authorized for this page']
            }
        });
    }
}

module.exports = {
    decodeJWTtoken
}
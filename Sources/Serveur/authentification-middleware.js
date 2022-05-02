import jwt from 'jsonwebtoken';

export default function authMiddleware (req, res, next)  {
    console.log(req.headers);
    if(!req.headers.authorization) {
        return next(401);
    }
    const token = req.headers.authorization.split(' ')[1];
    
    jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                return next({
                    name: 'JsonWebTokenError',
                    message: 'jwt malformed'
                })
            }
            req.app.locals.user = decoded;
            return next();
        }
    )
}
   

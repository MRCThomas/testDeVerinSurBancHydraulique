import jwt from 'jsonwebtoken';

export default function authMiddleware (req, res, next)  {
    if(!req.header.authorization) {
        return next(401);
    }
    
    jwt.verify(req.header.authorization, 'secret', function (err, decoded) {
            if (err) {
                return next({
                    name: 'JsonWebTokenError',
                    message: 'jwt malformed'
                })
            }
            req.app.locals.user = decoded;
        }
    )
}
   

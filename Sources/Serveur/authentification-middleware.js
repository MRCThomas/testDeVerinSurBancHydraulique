import jwt from 'jsonwebtoken';

export default function authMiddleware (req, res, next)  {
    if(req.url == "/" || req.url.match("login")){
        return next();
    }
    if(!req.headers.authorization) {
        return next(401);
    }
    const token = req.headers.authorization.split(' ')[1];  //Séparation entre le bearer et le token
    
    jwt.verify(token, 'secret', function (err, decoded) {   //Vérification du token
            if (err) {
                return next({   //Retourne une erreur
                    name: 'JsonWebTokenError',
                    message: 'jwt malformed'
                })
            }
            req.app.locals.user = decoded.user;  //Token validé
            return next();  //Passe à l'étape suivante
        }
    )
}
   

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

// console.log(authConfig);

// nota-se que:
// 401 e 403 tem diferença:
// 401 é que falta informação -> unauthorized
// 403 é que não há informações adequadas para ter acesso (mal formação)
// ->forbidden
const withAuth = function (req, res, next) {
     const token = req.cookies.token; 
     if (!token) {
          res.status(401).send('Não autorizado: Hash não fornecido.');
     } else {
          jwt.verify(token, authConfig.secret, function (err, decoded) {
               if (err) {
                    res.status(403).send('Não autorizado: Hash inválido.');
               } else {
                    req.email = decoded.email;
                    next();
               }
          });
     }
}
module.exports = withAuth;
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

// console.log(authConfig);

// nota-se que:
// 401 e 403 tem diferença:
// 401 é que falta informação -> unauthorized
// 403 é que não há informações adequadas para ter acesso (mal formação)
// ->forbidden
const withAuth = function (req, res, next) {

     let token = req.headers['x-access-token'];
     if (!token) {
          return res.status(401).send({ message: 'Não autorizado: Hash não fornecido.', status: 401 });
     } else {

          jwt.verify(token, authConfig.secret, function (err, decoded) {
               if (err) {
                    return res.status(403).send({ message: 'Não autorizado: Hash inválido.', status: 403 });
               } else {
                    req.id = decoded.id;
                    next();
               }
          });
     }
}
module.exports = withAuth;
const db = require("../models").db;
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/index").envConfig;

const findEmail = (email, password) => {
  return User.findOne({ where: { email: email } });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: `Faltou enviar o email ou o hash da senha`,
    });

    return;
  }

  findEmail(email, password)
    .then((userCredentials) => {
      if (!userCredentials.email) {
        res.status(404).send({
          message: `Usuário não encontrado: ${email}`,
        });
        return;
      } else if (bcrypt.compareSync(password, userCredentials.hash)) {
        const id = userCredentials.id;
        const token = jwt.sign({ id }, config.TOKEN_HASH, {
          expiresIn: config.TOKEN_EXPIRATION,
        });
        req.session.data = token;
        res.status(200).send({
          logado: true,
          email: `${email}`,
          token: token,
          id: id,
        });
        return;
      } else {
        res.status(404).send({
          message: `Senha inválida`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `E-mail inválido`,
      });
    });
};

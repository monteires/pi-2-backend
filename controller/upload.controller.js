// const db = require('../models').db
// const Categoria = db.categories
// const Op = db.Sequelize.Op

// exports.create = (req, res) => {
// };


const multer = require('multer');
const parser = multer({ dest: 'public/uploads/' })


exports.upload = async (req, res) => {
    parser.single('foto')(req, res, err => {
        if (err)
            res.status(500).json({ error: 1, payload: err });
        else {
            const image = {};
            image.id = req.file.filename;
            image.url = `/uploads/${image.id}`;
            res.status(200).json({ error: 0, payload: { id: image.id, url: image.url } });
            //implementar aqui em baixo o ID e a URL serem salvas no banco de dados.
            // fonte: https://medium.com/desenvolvimento-com-node-js/upload-de-imagem-com-o-node-js-3c0fff6c6c61
        }
    });
}
const db = require('../models').db;
const authenticateMiddleware = require('../middleware/authenticate.middleware')

const Product = db.products
const Op = db.Sequelize.Op
const multer = require('multer');
// const parser = multer({ dest: 'public/uploads/' })


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const uploadPhotos = (typePhoto) => async (req, res) => {
    const idProduct = req.params.id

    Product.findByPk(idProduct).then(data => {
        if (data) {
            if (data.userId != req.id) {
                res.send(401).json({ error: 1, payload: 'Usuário não tem permissão' });
                return
            }


            upload.single('foto')(req, res, err => {
                if (err)
                    res.status(500).json({ error: 1, payload: err });
                else {
                    const image = {};
                    image.id = req.file.filename;
                    image.url = `https://backend-univesp.herokuapp.com/public/uploads/${image.id}`;
                    // console.log(`id do produto: ${req.params.id}`)

                    Product.update({
                        [`photo${typePhoto}`]: image.url
                    },
                        {
                            where: {
                                id: idProduct
                            }
                        }
                    )
                    res.status(200).json({ error: 0, payload: { id: image.id, url: image.url } });
                }
            });

        } else {
            res.status(404).send({
                message: `Carragamento da foto não realizado`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: `Carragamento da foto não realizado`
        })
    })

}
exports.upload1 = uploadPhotos(1)
exports.upload2 = uploadPhotos(2)
exports.upload3 = uploadPhotos(3)
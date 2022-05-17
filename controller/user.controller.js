const db = require('../models')
const User = db.users
const Op = db.Sequelize.Op

const isValid = async (userData) => {
    const missingData = []
    if(!userData.name) 
        missingData.push('name')
    if(!userData.email)
        missingData.push('email')
    if(!userData.password)
        missingData.push('password')
    
    return {
        valid: missingData.length == 0,
        missing: missingData
    }
}


const encrypt = (password) => {
    return `encrypted password here ${password}`
}

const findHashByEmail = (email) => {
    return User.findOne({
        attributes: ['email', 'hash'],
        where: {
            email: email
        }
    })
}

exports.login = (req, res) => {
    const { email, password } = req.body
    const passwordHash = encrypt(password)

    if(!email || !password) {
        res.status(400).send({
            message: `Missing parameters`
        })

        return;
    }

    findHashByEmail(email).then(userCredentials => {
        if(!userCredentials.email) {
            res.status(404).send({
                message: `User not found: ${email}`
            })

            return;
        } else if(userCredentials.hash != passwordHash) {
            res.status(401).send({
                message: `Invalid credentials`
            })

            return;
        } else {
            console.log('session initiated')
            /** implement session */
        }
    })


}

exports.create = (req, res) => {
    isValid(req.body).then(data => {
        if(!data.valid) {
            res.status(400).send({
                message: `Missing parameters=${data.missing.join(',')}`
            })
            return;
        } 

        const { name, socialName, cpf, email, phone, password } = req.body
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}`
        const hash = encrypt(password)

        User.create({
            name,
            socialName,
            cpf,
            email,
            phone,
            whatsappLink,
            hash
        }).then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: `Could not create resource (user=${name},email=${email}): ${err.message}`
            })
        })

    }).catch(err => {
        res.status(500).send({
            message: `Could not parse user data: ${err.message}`
        })
    })

    
};

exports.findAll = (req, res) => {
  
};

exports.findOne = (req, res) => {
    const id = req.params.id
    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send(
                    {
                        message: `Resource not found (id=${id})`
                    }
                )
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).send({
                message: 'Internal server error'
            })
        })

};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};
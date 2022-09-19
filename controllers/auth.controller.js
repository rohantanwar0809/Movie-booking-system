const User = require('../models/user.model');


const validateLoginBody = (body) => {
    if (!body.email || !body.password) {
        return false;
    }
    return true;
}

class AuthController {
    async login(req, res) {
        if (!validateLoginBody(req.body)) {
            return res.status(400).send({ message: 'Invalid request' });
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).send({ message: 'Invalid email or password' });
            }
            if (!user.validPassword(req.body.password)) {
                return res.status(401).send({ message: 'Invalid email or password' });
            }
            return res.status(200).send({ token: user.generateJwt() });

        } catch (error) {
            return res.status(500).send({ message: error.message });

        }
    }

    async register(req, res) {
        if (!validateLoginBody(req.body)) {
            return res.status(400).send({ message: 'Invalid request' });
        }

        if (!req.body.role) {
            req.body.role = 'user';
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).send({ message: 'User already exists' });
            }
            const newUser = new User({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            });
            newUser.password = newUser.hashPassword(newUser.password);
            await newUser.save();
            return res.status(200).send({ token: newUser.generateJwt() });

        } catch (error) {
            return res.status(500).send({ message: error.message });
        }

    }
}

const authController = new AuthController();

module.exports = { authController }
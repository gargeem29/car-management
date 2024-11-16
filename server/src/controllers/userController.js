const bcrypt = require('bcrypt');
const User = require('../models/User');
const { signInToken } = require('../utils/auth');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).send({ message: "User created successfully", userId: user._id });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: "Invalid email or password" });
        }
        const token = signInToken(user._id);
        res.status(200).send({ token });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = { signup, login };

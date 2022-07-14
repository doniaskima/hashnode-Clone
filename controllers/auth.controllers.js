const userModels = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isEmail = require("validator/lib/isEmail");
const register = async (req, res) => {
	try {
		const existEmail = await userModels.findOne({ email: req.body.email });

		if (existEmail) {
			return res.status(422).json("Email already exist");
		}
		const salt = await bcrypt.genSalt(16);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = new userModels({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();
		return res.status(200).json(savedUser);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const login = async (req, res) => {
	let existUser = null;
	try {
		if (isEmail(req.body.loginInfo)) {
			existUser = await userModels.findOne({ email: req.body.loginInfo });
		} else {
			existUser = await userModels.findOne({ username: req.body.loginInfo });
		}

		if (!existUser) {
			return res.status(401).json("Wrong Email/Password");
		}

		const validPassword = await bcrypt.compare(
			req.body.password,
			existUser.password
		);

		if (!validPassword) {
			return res.status(401).json("Wrong Email/Password");
		}
		const token = jwt.sign(
			{
				_id: existUser._id,
				email: existUser.email,
				username: existUser.username,
				isAdmin: existUser.isAdmin,
			},
			process.env.TOKEN_KEY,
			{ expiresIn: "2 days" }
		);
		existUser.lastLogin = Date.now();
		await existUser.save();
		return res.status(200).json({ user: existUser, token: token });
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports.register = register;
module.exports.login = login;

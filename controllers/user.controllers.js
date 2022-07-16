const userModels = require("../models/user.models");

const createUser = async (req, res) => {
	const newUser = new userModels({
		// name: req.body.name,
		// owners: req.verifiedUser._id
	});
	try {
		const savedUser = await newUser.save();
		return res.status(200).json(savedUser);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getUsers = async (req, res) => {
	try {
		const users = await userModels.find();
		return res.status(200).json(users);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getUser = async (req, res) => {
	const id = req.params.userId;

	try {
		const user = await userModels.findById(id);
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const deleteUser = async (req, res) => {
	const id = req.params.userId;
	try {
		const user = await userModels.findByIdAndDelete(id);
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const updateUser = async (req, res) => {
	const id = req.params.userId;
	try {
		const user = await userModels.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;

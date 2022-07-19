require("dotenv").config();
const userModels = require("../../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { emailQueue } = require("../../queues");
const { SEND_REGISTER_EMAIL_VERIFICATION } = require("../../constants");
const mongoose = require("mongoose");
module.exports.createAsyncUser = (userdata) => {
	try {
		mongoose.connect(process.env.MONGO_DB_URI);
		mongoose.connection.on("connected", async () => {
			const salt = await bcrypt.genSalt(16);
			const hashedPassword = await bcrypt.hash(userdata.password, salt);

			const newUser = new userModels({
				firstName: userdata.firstName,
				lastName: userdata.lastName,
				username: userdata.username,
				email: userdata.email,
				password: hashedPassword,
			});

			const savedUser = await newUser.save();
			const token = jwt.sign(
				{
					_id: savedUser._id,
					email: savedUser.email,
					username: savedUser.username,
				},
				process.env.EMAIL_TOKEN_KEY,
				{ expiresIn: "1h" }
			);

			await emailQueue.add(SEND_REGISTER_EMAIL_VERIFICATION, {
				form: "test@hashnode.com",
				email: savedUser.email,
				subject: "verify email",
				body: `this is your token: ${token}`,
			});
		});
	} catch (err) {
		console.log(err);
	}
};

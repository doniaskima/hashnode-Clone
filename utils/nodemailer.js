const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.TRANSPORTER_USER,
		pass: process.env.TRANSPORTER_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
	},
});

module.exports = transporter;

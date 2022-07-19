const transporter = require("../../utils/nodemailer");

module.exports.sendEmail = async (data) => {
	await transporter.sendMail({
		from: data.from, // sender address
		to: data.email, // list of receivers
		subject: data.subject, // Subject line
		html: data.body, // html body
	});
};

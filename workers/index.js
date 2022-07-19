const { Worker } = require("bullmq");
const {
	EMAIL_QUEUE,
	SEND_REGISTER_EMAIL_VERIFICATION,
	REGISTER_ASYNC_USER,
} = require("../constants");
const { sendEmail } = require("../jobs/email");
const { createAsyncUser } = require("../jobs/user");

const emailWorker = new Worker(
	EMAIL_QUEUE,
	async (job) => {
		switch (job.name) {
			case SEND_REGISTER_EMAIL_VERIFICATION:
				await sendEmail(job.data);
				break;
			case REGISTER_ASYNC_USER:
				await createAsyncUser(job.data);
			default:
				break;
		}
	},
	{
		connection: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
	}
);

emailWorker.on("completed", (job) => {
	console.log(`${job.name} is completed`);
});
emailWorker.on("error", (err) => {
	console.log(err);
});
emailWorker.on("failed", (job, err) => {
	console.log(err);
});

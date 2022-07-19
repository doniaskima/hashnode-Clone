const { Queue } = require("bullmq");
const { EMAIL_QUEUE } = require("../constants/index");
module.exports.emailQueue = new Queue(EMAIL_QUEUE, {
	connection: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
	defaultJobOptions: { removeOnComplete: true, removeOnFail: true },
});

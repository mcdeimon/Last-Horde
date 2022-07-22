const rfs = require("rotating-file-stream");
const logStream = rfs.createStream("./loggsFile.log", { interval: "1d" });

const logger = (msg) => logStream.write(`${msg}\n`);

module.exports = logger;

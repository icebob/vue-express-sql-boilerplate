"use strict";

let logger 			= require("./logger");
let chalk 			= require("chalk");
let fs				= require("fs");
let path			= require("path");
let secretUtils		= require("secret-utils");

let fName = path.join(__dirname, "..", "secrets.json");
if (!fs.existsSync(fName)) {

	let json = {
		hashSecret: secretUtils.url64(32),
		sessionSecret: secretUtils.url64(32)
	};
	fs.writeFileSync(fName, JSON.stringify(json, null, 2));
	
	logger.info(chalk.green.bold("Secret file created!"));
}

module.exports = require("../secrets.json");

"use strict";

let logger 			= require("./logger");
let config 			= require("../config");

let chalk 			= require("chalk");
let mongoose 		= require("mongoose");
let autoIncrement 	= require("mongoose-auto-increment");

module.exports = function() {
	let db;

	logger.info();

	if (mongoose.connection.readyState !== 1) {
		logger.info("Connecting to Mongo " + config.db.uri + "...");
		db = mongoose.connect(config.db.uri, config.db.options, function(err) {
			if (err) {
				logger.error("Could not connect to MongoDB!");
				return logger.error(err);
			}

			mongoose.set("debug", config.isDevMode());
		});

		mongoose.connection.on("error", function(err) {
			logger.error("Could not connect to MongoDB!");
			return logger.error(err);
		});

		autoIncrement.initialize(db);		

		mongoose.connection.once("open", function() {
			logger.info(chalk.yellow.bold("Mongo DB connected."));
			logger.info();

			if (process.env.NODE_ENV === "development") {
				require("./seed")();
			}
		});

		
	} else {
		logger.info("Mongo already connected.");
		db = mongoose;
	}
	
	return db;
};

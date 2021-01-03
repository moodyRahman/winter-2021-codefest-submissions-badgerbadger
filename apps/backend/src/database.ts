import Mongoose from "mongoose";

let database: Mongoose.Connection;

const dbconnect = (uri:string) => {

	if (database){
		return true;
	}

	Mongoose.connect(uri, {
		useNewUrlParser: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});

	database = Mongoose.connection;

	database.once("open", async () => {
		console.log("Connected to database");
	});

	database.on("error", () => {
		console.log("Error connecting to database");
	});
}

export default dbconnect;

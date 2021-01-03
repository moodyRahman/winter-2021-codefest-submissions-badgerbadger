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
		console.log(
			`🐵[database][${new Date().toLocaleTimeString()}]: connected to remote`
		);
	});

	database.on("error", () => {
		console.log(`🐵[database][${new Date().toLocaleTimeString()}]: connection failed`);
	});
}

export default dbconnect;

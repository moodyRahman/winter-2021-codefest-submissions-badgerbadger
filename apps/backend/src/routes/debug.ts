import { Router } from "express";
import {User, IUser} from "../database/models"
// import { IUser } from "../database/user/user.schema";
const route = Router();

route.post("/debug", (req, res) => {	
	console.log(req.body);

	const moody:IUser = new User(req.body);

	moody.save( (err, moody) => {
		if (err){
			return console.log(err);
		}
	});
	
	res.send(req.body);
});

route.get("/debug", (_req, res) => {
	User.find({}, (err, docs) => {
		res.send(docs)
	})
});

export default route;

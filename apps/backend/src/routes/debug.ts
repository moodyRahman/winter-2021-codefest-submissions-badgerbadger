import { Router } from "express";
import {User} from "../database/models/models"
const route = Router();

route.post("/debug", (req, res) => {	
	console.log(req.body);

	const moody = new User(req.body);

	moody.save( (err, moody) => {
		if (err){
			return console.log(err);
		}
	});
	
	res.send(req.body);
});

route.get("/debug", (_req, res) => {
	res.send("aye this route is alive and well");
});

export default route;

import { Router } from "express";
import {User, IUser} from "../../database/models"

const route = Router();

route.post("/login", (req, res) => {

	User.find({username:req.body.username}, (err, docs) => {
		if (docs.length == 0) {
			return res.send({status:404, message:"user was not found"})
		}

		// TODO: implement hash calculation 
		if (req.body.password != docs[0].hashed_password) {
			return res.send({ status: 403, message: "bad password" });
		}

		// TODO: calculate JWT and return here
		res.send({ status: 200, token: "sjkdfnhskjfsd" });

	})

});

route.get("/login", (req, res) => {

	res.send("found /login");

});

export default route;

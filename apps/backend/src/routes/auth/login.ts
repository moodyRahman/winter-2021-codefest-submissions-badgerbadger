import { Router } from "express";
import {User, IUser} from "../../database/models"
// TODO: fix the relative import, @shared/enums/httpcodes does not work
import { HTTP_CODE } from "../../../../shared/enums/httpcodes";

const route = Router();

route.post("/login", (req, res) => {

	User.find({username:req.body.username}, (err, docs) => {
		if (docs.length == 0) {   // it could be !doc.length, but isn't this so much readable?
			return res.send({status:HTTP_CODE.NOT_FOUND, message:"user was not found"})
		}

		// TODO: implement hash calculation 
		if (req.body.password != docs[0].hashed_password) {
			return res.send({ status: HTTP_CODE.FORBIDDEN, message: "bad password" });
		}

		// TODO: calculate JWT and return here
		res.send({ status: HTTP_CODE.OK, token: "sjkdfnhskjfsd" });

	})

});

route.get("/login", (req, res) => {

	res.send("found /login");

});

export default route;

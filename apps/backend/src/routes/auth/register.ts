import { Router } from "express";
import { User, IUser } from "../../database/models"
import { HTTP_CODE } from "../../../../shared/enums/httpcodes";
const route = Router();

route.post("/register", (req, res) => {
	User.find({ username: req.body.username }, (err, docs) => {
		
		if (docs.length != 0) {
			return res.send({ status: HTTP_CODE.FORBIDDEN, message: "user already exists" })
		}

		return res.send({status:HTTP_CODE.OK, message:"temp message"});

	})
});

export default route;

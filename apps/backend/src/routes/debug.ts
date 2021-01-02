import { Router } from "express";

const route = Router();

route.post("/debug", (req, res) => {	
	console.log(req.body);
	res.send(req.body);
});

route.get("/debug", (_req, res) => {

	res.send("aye this route is alive and well");
});

export default route;

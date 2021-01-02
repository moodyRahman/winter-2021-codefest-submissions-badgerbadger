import { Router } from "express";

const route = Router();

route.post("/debug", (_req, res) => {	
	res.send(_req.body);
});

route.get("/debug", (_req, res) => {

	res.send("aye this route is alive and well");
});

export default route;

import express from 'express';
import cors from 'cors'
const app = express();
const PORT = 8080;

app.use(cors())


app.get('/', (req, res) => 
	res.send('Express + TypeScript Server')
);

app.get('/rawdata', (req, res) => {
	const rawdata = {
		pluralism_and_diversity:["mood101, mood102", "mood103"],
		writing_intensive:["alex101", "mood103", "tanmoy203"],
		stem:["alex101", "monique202"],
		major:["monique202"]
	}
	res.send(rawdata)
});


app.listen(PORT, () => {
	var d = new Date();
	console.log(`⚡️[server][${d.toLocaleTimeString()}]: Server is running at https://localhost:${PORT}`);
});
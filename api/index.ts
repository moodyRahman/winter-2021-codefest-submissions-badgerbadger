import express from 'express';
// rest of the code remains same
const app = express();
const PORT = 8080;

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
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
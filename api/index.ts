import express from 'express';
import cors from 'cors'
const app = express();
const PORT = 8080;

app.use(cors())


app.get('/', (req, res) =>
	res.send('Express + TypeScript Server')
);

interface ReqData {
	requirement: string;
	fulfilling_classes: string[];
}


app.get('/rawdata', (req, res) => {

	const rawdata: ReqData[] = [
		{
			requirement: "pluralism_and_diversity",
			fulfilling_classes: ["mood101, mood102", "mood103"]
		},
		{
			requirement: "writing_intensive",
			fulfilling_classes: ["alex101", "mood103", "tanmoy203"]
		},
		{
			requirement: "stem",
			fulfilling_classes: ["alex101", "monique202"]
		},
		{
			requirement: "major",
			fulfilling_classes: ["monique202"]
		}
	]
	res.send(rawdata)
});


app.listen(PORT, () => {
	console.log(`⚡️[server][${new Date().toLocaleTimeString()}]: Server is running at https://localhost:${PORT}`);
});
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

// given an array of ReqData
// which class fulfills multiple req's?
// returns a JSON containing {classname:occurences}
const getMultiReqClasses = (classes: ReqData[]) => {
	let out: any = {}
	for (let x of classes) {
		for (let y of x.fulfilling_classes) {
			// if the class has not been seen before
			if (!out.hasOwnProperty(y)) {
				// set it to 0
				out[y] = 0;
				continue;
			}
			// increment it otherwise
			out[y]++;
		}
	}

	let formatted_out = []
	for (var i in out) {
		formatted_out.push([i, out[i]]);
	}
	return formatted_out;
}

app.get('/rawdata', (req, res) => {

	const rawdata: ReqData[] = [
		{
			requirement: "pluralism_and_diversity",
			fulfilling_classes: ["mood101", "mood102", "mood103"]
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

	console.log(
		getMultiReqClasses(rawdata)
	);
	res.send(rawdata)
});

interface filterData {
	category: string;
	requirements: string[];
}

app.get('/filters', (req, res) => {

	const filters: filterData[] = [
		{
			category: "requiredCore",
			requirements: [
				"English Composition 1",
				"English Composition 2",
				"Mathematical and Quantitative Reasoning",
				"Life and Physical Sciences"
			]
		},
		{
			category: "flexibleCommonCore",
			requirements: [
				"World Cultures and Global Issues",
				"US Experiences in Its Diversity",
				"Creative Expression",
				"Individual and Society",
				"Scientific World"
			]
		},
		{
			category: "Pluralsim and Diversity",
			requirements: [
				"Group A: Non-European Societies",
				"Group B: Groups in the USA",
				"Group C: Women, Gender and Sexual Orientation",
				"Group D: European Societies"
			]
		},

	]
	res.send(filters)
});


app.listen(PORT, () => {
	console.log(`⚡️[server][${new Date().toLocaleTimeString()}]: Server is running at https://localhost:${PORT}`);
});
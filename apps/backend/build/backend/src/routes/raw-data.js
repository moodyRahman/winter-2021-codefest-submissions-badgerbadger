"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
// given an array of ReqData
// which class fulfills multiple req's?
// returns a JSON containing {classname:occurences}
// const getMultiReqClasses = (classes: Class[]) => {
//   let out: any = {};
//   for (let x of classes) {
//     for (let y of x.fulfilling_classes) {
//       // if the class has not been seen before
//       if (!out.hasOwnProperty(y)) {
//         // set it to 0
//         out[y] = 0;
//         continue;
//       }
//       // increment it otherwise
//       out[y]++;
//     }
//   }
//   let formatted_out = [];
//   for (var i in out) {
//     formatted_out.push([i, out[i]]);
//   }
//   return formatted_out;
// };
route.get("/raw-data", (_req, res) => {
    // const rawdata: Class[] = [
    //   {
    //     fulfills: ["pluralism_and_diversity"],
    //     prereqs: ["mood101", "mood102", "mood103"],
    //   },
    //   {
    //     fulfills: ["writing_intensive"],
    //     prereqs: ["alex101", "mood103", "tanmoy203"],
    //   },
    //   {
    //     fulfills: ["stem"],
    //     prereqs: ["alex101", "monique202"],
    //   },
    //   {
    //     fulfills: ["major"],
    //     prereqs: ["monique202"],
    //   },
    // ];
    // console.log(getMultiReqClasses(rawdata));
    // res.send(rawdata);
});
exports.default = route;

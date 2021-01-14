"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
route.get("/filters", (_req, res) => {
    const filters = [
        {
            category: "Required Core",
            requirements: [
                "English Composition 1",
                "English Composition 2",
                "Mathematical and Quantitative Reasoning",
                "Life and Physical Sciences",
            ],
        },
        {
            category: "Flexible Common Core",
            requirements: [
                "World Cultures and Global Issues",
                "US Experiences in Its Diversity",
                "Creative Expression",
                "Individual and Society",
                "Scientific World",
            ],
        },
        {
            category: "Pluralism and Diversity",
            requirements: [
                "Group A: Non-European Societies",
                "Group B: Groups in the USA",
                "Group C: Women, Gender and Sexual Orientation",
                "Group D: European Societies",
            ],
        },
    ];
    res.send(filters);
});
exports.default = route;

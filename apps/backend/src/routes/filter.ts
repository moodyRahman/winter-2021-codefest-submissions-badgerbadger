import { Router } from "express";

import { FilterData } from "@shared/interfaces/filter-data";

const route = Router();

route.get("/filters", (_req, res) => {
  const filters: FilterData[] = [
    {
      category: "requiredCore",
      requirements: [
        "English Composition 1",
        "English Composition 2",
        "Mathematical and Quantitative Reasoning",
        "Life and Physical Sciences",
      ],
    },
    {
      category: "flexibleCommonCore",
      requirements: [
        "World Cultures and Global Issues",
        "US Experiences in Its Diversity",
        "Creative Expression",
        "Individual and Society",
        "Scientific World",
      ],
    },
    {
      category: "Pluralsim and Diversity",
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

export default route;

export const INPUT_CONFIGS = [
  {
    id: "energy_supply",
    heading: "Energy Supply",
    sliders: [
      {
        id: "coal",
        label: "Coal",
        min: -15,
        max: 100,
        unit: "$/ton",
        stateConfig: {
          "-15": "subsidized",
          "-5": "status quo",
          5: "taxed",
          15: "highly taxed",
          30: "very highy taxed",
        },
      },
      {
        id: "renewabled",
        label: "Renewabled",
        min: -0.05,
        step: 0.01,
        max: 0.02,
        unit: "$/kWh",
        stateConfig: {
          "-0.05": "highly subsidized",
          "-0.02": "subsidized",
          "-0.01": "status quo",
          0.01: "taxed",
        },
      },
      {
        id: "oil",
        label: "Oil",
        min: -15,
        max: 85,
        unit: "$/barrel",
        stateConfig: {
          "-15": "subsidized",
          "-5": "status quo",
          5: "taxed",
          15: "highly taxed",
          30: "very highy taxed",
        },
      },
      {
        id: "nuclear",
        label: "Nuclear",
        min: -0.07,
        step: 0.01,
        max: 0.07,
        unit: "$/kWh",
        stateConfig: {
          "-0.07": "highly subsidized",
          "-0.04": "subsidized",
          "-0.01": "status quo",
          0: "taxed",
          0.03: "highly taxed",
        },
      },
      {
        id: "natural_gas",
        label: "Natural Gas",
        min: -0.7,
        step: 0.1,
        max: 5,
        unit: "$/MCF",
        stateConfig: {
          "-0.7": "subsidized",
          "-0.2": "status quo",
          0.2: "taxed",
          0: "taxed",
          0.7: "highly taxed",
          1.4: "very highly taxed",
        },
      },
      {
        id: "new_zero_carbon_breakthrough",
        label: "New Zero-Carbon",
        min: 0,
        step: 1,
        max: 2,
        unit: "",
        stateConfig: {
          0: "status quo",
          1: "breakthrough",
          2: "huge breakthrough",
        },
      },
      {
        id: "bioenergy",
        label: "Bioenergy",
        min: -25,
        step: 1,
        max: 25,
        unit: "$/boe",
        stateConfig: {
          "-25": "highly subsidized",
          "-15": "subsidized",
          "-5": "status quo",
          5: "taxed",
          15: "highly taxed",
        },
      },
      {
        id: "carbon_price",
        label: "Carbon Price",
        min: 0,
        step: 1,
        max: 250,
        unit: "$/ton CO2",
        stateConfig: {
          0: "status quo",
          5: "low",
          20: "medium",
          60: "high",
          100: "very high",
        },
      },
    ],
  },
  {
    id: "transport",
    heading: "Transport",
    sliders: [
      {
        id: "enery_efficiency",
        label: "Enery Efficiency",
        min: -1,
        step: 0.1,
        max: 5,
        unit: "%/year",
        stateConfig: {
          "-1": "discouraged",
          0: "status quo",
          1: "increased",
          3: "highly increased",
        },
      },
      {
        id: "electrification",
        label: "Electrification",
        min: 0,
        step: 5,
        max: 50,
        unit: "% of purchase cost",
        stateConfig: {
          0: "status quo",
          10: "subsidized",
          25: "highly subsidized",
        },
      },
    ],
  },
  {
    id: "building_industry",
    heading: "Building and Industry",
    sliders: [
      {
        id: "enery_efficiency",
        label: "Enery Efficiency",
        min: -1,
        step: 0.1,
        max: 5,
        unit: "%/year",
        stateConfig: {
          "-1": "discouraged",
          0: "status quo",
          1.5: "increased",
          3: "highly increased",
        },
      },
      {
        id: "electrification",
        label: "Electrification",
        min: 0,
        step: 5,
        max: 50,
        unit: "% of purchase cost",
        stateConfig: {
          0: "status quo",
          5: "subsidized",
          25: "highly subsidized",
        },
      },
    ],
  },
  {
    id: "growth",
    heading: "Growth",
    sliders: [
      {
        id: "population",
        label: "Population",
        min: 9,
        max: 11.4,
        step: 0.1,
        unit: "billion people in 2100",
        stateConfig: {
          9: "lowest growth",
          9.3: "low growth",
          10: "status quo",
          10.5: "high growth",
          11.2: "highest growth",
        },
      },
      {
        id: "economic_growth",
        label: "Economic Growth",
        min: 0.5,
        max: 2.5,
        step: 0.1,
        unit: "billion people in 2100",
        stateConfig: {
          0.5: "low growth",
          1.2: "status quo",
          1.9: "high growth",
        },
      },
    ],
  },
  {
    id: "carbon_dioxide_removal",
    heading: "Carbon Dioxide Removal",
    sliders: [
      {
        id: "nature_based",
        label: "Nature Based",
        min: 0,
        max: 100,
        step: 1,
        unit: "% of max potential",
        stateConfig: {
          0: "status quo",
          15: "low growth",
          40: "medium growth",
          70: "high growth",
        },
      },
      {
        id: "technological",
        label: "Technological",
        min: 0,
        max: 100,
        step: 1,
        unit: "% of max potential",
        stateConfig: {
          0: "status quo",
          15: "low growth",
          40: "medium growth",
          70: "high growth",
        },
      },
    ],
  },
  {
    id: "other_sources",
    heading: "Other Sources of Greenhouse Gases",
    sliders: [
      {
        id: "agriculture_emission",
        label: "Agriculture Emission",
        min: 0,
        max: 100,
        step: 1,
        unit: "% of potential reduction",
        stateConfig: {
          0: "status quo",
          20: "reduced",
          70: "highly reduced",
        },
      },
      {
        id: "waste_and_leakage",
        label: "Waste and Leakage",
        min: 0,
        max: 100,
        step: 1,
        unit: "% of potential reduction",
        stateConfig: {
          0: "status quo",
          20: "reduced",
          70: "highly reduced",
        },
      },
      {
        id: "deforestation",
        label: "Deforestation",
        min: -10,
        max: 1,
        step: 0.1,
        unit: "%/year",
        stateConfig: {
          "-10": "highly reduced",
          "-4": "reduced",
          "-1": "status quo",
          0.2: "increased",
        },
      },
    ],
  },
];

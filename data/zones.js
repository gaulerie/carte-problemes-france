var polygonJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { stroke: "#555555", "stroke-width": 2, "stroke-opacity": 1, fill: "#555555", "fill-opacity": 0.5, name: "rectangle" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [81.798, 28.868],
            [82.216, 28.868],
            [82.216, 29.176],
            [81.798, 29.176],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { stroke: "#555555", "stroke-width": 2, "stroke-opacity": 1, fill: "#555555", "fill-opacity": 0.5, name: "polygon" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [81.897, 28.75],
            [82.078, 28.101],
            [20.869, 28.415],
            [20.468, 28.993],
          ],
        ],
      },
    },
  ],
};

const app = require("express")();
const cors = require("cors");
const api = require("./api.js");

var corsOptions = {
  origin: "https://covid19daily.info",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.get("/summary", async (req, res) => {
  try {
    const summary = await api().get("/summary");
    res.status(200).json(summary.data);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Error fetching summary" });
  }
});

app.get("/total/country/:country/status/:status", async (req, res) => {
  const { country, status } = req.params;
  const statuses = ["confirmed", "recovered", "deaths"];

  if (!country || !status) {
    res.status(400).json({ message: "Country name and status required." });
  } else if (!statuses.includes(status)) {
    res.status(400).json({ message: "Wrong status provided." });
  }
  try {
    const singleCountry = await api().get(
      `/total/country/${country}/status/${status}`
    );
    res.status(200).json(singleCountry.data);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Error fetching country details." });
  }
});

app.listen(process.env.PORT || 5000);

module.exports = app;

const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/arena/:slug", async (req, res) => {
  const slug = req.params.slug;
  try {
    const response = await fetch(
      `https://api.are.na/v2/channels/${slug}/contents`,
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos de Are.na" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy en funcionamiento en el puerto ${PORT}`);
});

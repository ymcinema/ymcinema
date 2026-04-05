const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Endpoint to get video sources
app.get("/api/videos", (req, res) => {
  const { type, tmdbId, season, episode } = req.query;

  try {
    if (type === "movie") {
      return res.json([`https://vidcore.net/movie/${tmdbId}`]);
    }

    if (type === "tv") {
      if (!season || !episode) {
        return res.status(400).json({ error: "Season and episode required" });
      }
      return res.json([`https://vidcore.net/tv/${tmdbId}/${season}/${episode}`]);
    }

    res.status(400).json({ error: "Invalid type" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
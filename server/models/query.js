const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  query: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
});

const Query = mongoose.model("Query", querySchema);

module.exports = Query;

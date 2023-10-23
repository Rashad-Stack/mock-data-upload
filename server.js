const dotenv = require("dotenv");
const { readFile } = require("fs/promises");
const mongoose = require("mongoose");
const path = require("path");
const { URL } = require("url");
const Job = require("./models/job");

dotenv.config();

const DB = process.env.MONGODB_DATABASE_URL.replace(
  "<password>",
  process.env.MONGODB_DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((error) => console.error("DB connection error:", error));

const start = async () => {
  try {
    await Job.deleteMany();
    const filePath = path.resolve(__dirname, "MOCK_DATA.json");
    const jasonData = JSON.parse((await readFile(filePath)).toString("utf-8"));
    await Job.create(jasonData);
    console.log("Data successfully loaded!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

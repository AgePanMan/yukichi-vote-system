const express = require("express");
const { exec } = require("child_process");
const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("🔁 GitHub Webhook Received");
  exec("./deploy.sh", (err, stdout, stderr) => {
    console.log(stdout);
    if (err) console.error("🚨 Error:", stderr);
  });
  res.status(200).send("✅ Received");
});

app.listen(4000, () => {
  console.log("🚀 Webhook server running on port 4000");
});

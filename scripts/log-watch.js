const { exec } = require("child_process");
const axios = require("axios");

const webhook = process.env.DISCORD_WEBHOOK_URL;
const appName = "yukichi-backend";

exec(`pm2 logs ${appName} --lines 1 --raw`, (err, stdout) => {
  if (err) return;
  if (stdout.includes("Error") || stdout.includes("Unhandled")) {
    axios.post(webhook, {
      content: `❗️ ${appName} にエラーが発生しました:\n\n\\`\`\`\n${stdout}\n\\`\`\``
    });
  }
});

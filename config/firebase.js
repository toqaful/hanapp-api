const fs = require('fs');
const path = require('path');

// Step 1: Decode the env variable and write the JSON file
const serviceAccountPath = path.join('serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  const jsonStr = Buffer.from(process.env.SERVICE_ACCOUNT_JSON, 'base64').toString('utf-8');
  fs.writeFileSync(serviceAccountPath, jsonStr);
  console.log('serviceAccountKey.json recreated');
}

const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

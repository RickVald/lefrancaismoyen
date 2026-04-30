const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'data', 'dashboard-series.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
data.lastUpdated = new Date().toISOString().slice(0,10);
fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Data timestamp refreshed. Add API fetchers here.');

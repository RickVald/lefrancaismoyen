import json
from datetime import date

file_path = "data/dashboard-series.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

data["lastUpdated"] = str(date.today())

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Dashboard updated.")

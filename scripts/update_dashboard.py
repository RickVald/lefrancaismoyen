import json
from datetime import date
from pathlib import Path

DATA_FILE = Path("data/dashboard-series.json")

OFFICIAL_SNAPSHOT = [
    {
        "label": "Inflation officielle cumulée depuis 2000",
        "value": "~+52%",
        "note": "IPC INSEE, ordre de grandeur 2000 → 2024"
    },
    {
        "label": "Dépendance énergétique",
        "value": "~39%",
        "note": "Dépendance nette estimée à partir du bilan énergétique SDES 2024"
    },
    {
        "label": "Population dépendante de transferts publics",
        "value": "~47%",
        "note": "Estimation à consolider : retraités, fonction publique, étudiants, chômeurs, allocataires"
    },
    {
        "label": "Dette publique par habitant",
        "value": "~47 000€",
        "note": "Dette Maastricht / population, ordre de grandeur 2024"
    },
    {
        "label": "Prélèvements obligatoires",
        "value": "~45% du PIB",
        "note": "Ordre de grandeur OCDE / INSEE"
    }
]

def main():
    with DATA_FILE.open("r", encoding="utf-8") as f:
        data = json.load(f)

    data["lastUpdated"] = date.today().isoformat()
    data["snapshot"] = OFFICIAL_SNAPSHOT

    with DATA_FILE.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print("Dashboard updated successfully.")

if __name__ == "__main__":
    main()

# Isaak

Landing pages et travaux préparatoires d'Isaak : une structure qui rend les PME de services de Suisse romande « AI-native », avec un logiciel de gestion construit sur mesure et automatisé par une IA hébergée en Suisse.

## Contenu

| Dossier | Contenu |
|---|---|
| `index.html` | Page d'accueil du site, qui présente les trois landing pages |
| `maquettes/investir.html` | S1 · Jeunes entreprises qui passent à l'échelle |
| `maquettes/transformer.html` | S2 · PME établies |
| `maquettes/transmettre.html` | S3 · Dirigeants qui préparent leur succession |
| `maquettes/assets/` | Feuille de style et script partagés (données des secteurs, animations) |
| `maquettes/a-orbite.html`, `b-flux.html`, `c-strates.html`, `v2-isaak.html` | Explorations de design précédentes |
| `recherche/secteurs-suisse-romande.md` | Recherche sectorielle : classement des secteurs, fiches, benchmarks et sources |

Les exemples chiffrés des pages sont illustratifs ; leurs hypothèses sont affichées sous chaque tableau. Les pages ne sont pas indexées par les moteurs de recherche.

## Voir les pages en local

Les pages chargent une feuille de style et un script partagés : il faut les servir par un petit serveur plutôt que d'ouvrir les fichiers directement.

```bash
python -m http.server 8765
```

Puis ouvrir http://localhost:8765.

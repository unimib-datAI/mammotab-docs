---
sidebar_position: 7
---

# 7. Create semtab dataset

To create the dataset for semtab (with tables, targets, and gt) run

```bash
python mammotab_semtab.py wiki_tables_enriched mammotab_dataset_semtab
```

Once finished the folder `mammotab_dataset_semtab` will contain the dataset and the file `mammostats_semtab.json` will contain the statistics. For example:

```json
{
  "n_tables": 1226,
  "cells": 151895,
  "rows": 26597,
  "cols": 6872,
  "links": 34357,
  "mentions": 34287,
  "nils": 7097,
  "types": 26721,
  "col_types": 2867,
  "col_types_perfect": 761,
  "all_entities": 14370
}
```

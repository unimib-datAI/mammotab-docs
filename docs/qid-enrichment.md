---
sidebar_position: 5
---

# 5. Enrich the dump with wikidata IDs

This scripts requires some pickle files to work (see section [Auxiliary files](/mammotab-docs/docs/auxiliary-files)).
This scripts gets the wikidata entities corresponding to wikipedia links and add columns types and it detects which mentions are NIL.

[LamAPI](https://bitbucket.org/disco_unimib/lamapi) is used to easily access Wikidata and DBpedia data.

Modify the environment variables according to your LAMAPI instance.

then run:

```bash
python mammotab_wikidata.py wiki_tables_filtered [dump] wiki_tables_enriched
```

or in parallel

```bash
bash parallel_wikidata.sh # edit NPROC
```

Once finished you should see a folder named `wiki_tables_enriched` containing json dictionaries and json files for each dump containing some stats like for example:

```json
{
  "tot_cells": 153918,
  "tot_linked_cell": 34681,
  "entities_found": 27475,
  "entities_not_found": 7206,
  "types_found": 27003,
  "types_not_found": 7678,
  "filtered_types": 28,
  "found_perfect_types": 763,
  "tot_cols": 2924
}
```

The following examples allow to further understand how LamAPI helps the creation of the dataset.

For example when an array like this is passed to LamAPI ("entities_list")

```json
['Great_Arm_River', 'Watt_Mountain', "'Snaz", '1983–84_United_States_network_television_schedule', 'Brands_Hatch',...]
```

A sorted list of Q-Ids is returned (entities_diz)

```json
{"'Snaz": 'Q1937538', '...First_Do_No_Harm': 'Q1545282', '0-4-2': 'Q2806492', '0-4-4T': 'Q3077673', '0-6-0': 'Q2922269', '1._FC_Haßfurt': 'Q162241', '1._FC_Köln': 'Q104770', '1._FC_Köln_II': 'Q15972883', '1._FC_Normannia_Gmünd': 'Q162349', ...}
```

This dictionary is stored in `entities_dictionaries/entities_diz_<dumpname>.json`.

While when an array of types is sent (types_list):

```json
['Q327143', 'Q865720', 'Q3305593', 'Q1000028', ... ]
```

Which in human readable lables correspondes to:

```json
['Jean Rabasse', 'Borussia Dortmund II', 'Anxo Quintana', 'The Money-Maker Recipe', ... ]
```

The result is like this (types_diz):

```json
{'Q100': ['Q1549591', 'Q21518270', 'Q1093829', 'Q62049'], 'Q1000028': ['Q5398426', 'Q1366112'], 'Q1000341': ['Q515'],...}
```

Which can be read as:

```json
{
  "Boston": [
    "big city",
    "state or insular area capital of the United States",
    "city in the United States",
    "county seat"
  ],
  "The Money-Maker Recipe": ["television series", "drama television series"],
  "Ilo": ["city"]
}
```

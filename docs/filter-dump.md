---
sidebar_position: 3
---

# 3. Filter the dump

This step removes meaningless columns/rows (e.g. all cells are the empty string).
To process a single dump run:

```bash
python mammotab_filter.py wiki_tables [enwiki...bz2] wiki_tables_filtered
```

or run

```bash
bash parallel_filter.sh # set NPROC in the file as it fits your needs
```

to process multiple dumps in parallel.
Once finished you should see a folder named `wiki_tables_filtered`.

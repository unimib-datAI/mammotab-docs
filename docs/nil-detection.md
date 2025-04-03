---
sidebar_position: 4
---

# 4. NIL Detection using Wikipedia titles

To detect which mentions are NIL we obtain all the titles/links actually present in wikipedia (if a title/link is not present the mention is NIL).
For each dump run:

```
python mammotab_entity_titles.py [dump]
```

or parallelize it with e.g.

```bash
NPROC=4
ls enwiki-20220520*.bz2 | \
    xargs -I {} -n 1 -P $NPROC bash -c 'python mamotab_entity_titles.py {}'
```

It should create a folder `wiki_entities_titles` and then run

```bash
python merge_title_dicts.py wiki_entities_titles
```

to merge all inside a single pickle file (`all_titles.pickle`)

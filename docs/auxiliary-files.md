---
sidebar_position: 8
---

# Auxiliary files

## Wikidata classes ontology

Required to sort the types from generic to specific:

1. Download and filter subclass relationships from a wikidata [dump](https://dumps.wikimedia.org/wikidatawiki/entities/), e.g.:

```bash
sudo apt install bzip2   #or equivament for non debian based systems

wget <dump url>
bzcat latest-all.nt.bz2 | awk '$2 == "<http://www.wikidata.org/prop/direct/P279>" {print $0}'| gzip -c > ontology_all.gz
```

where `P279` is "subclass of".

2. Run

```bash
cd utilities
python prepare_ontology.py
```

Once finished you should have two pickle files:

1. `ontology_complete.pickle` #dictionary of superclasses: superclasses[wikidata_class]

2. `depth.pickle` #dictionary of depth (max depth from a top level wikidata class) : depth[wikidata_class]

Move them to the main folder to proceed.

```bash
mv *.pickle ..
cd ..
```

## Most common types (generic types)

In order to define if a given type is generic or specific we most common types across wikidata are identified.

The following bash command allows to have a list of the "Instance Of" wikidata property.

```bash
bzcat latest-all.nt.bz2 |
awk '$2 == "<http://www.wikidata.org/prop/direct/P31>"
{print $0}'| gzip -c > InstanceOf.gz
```

By then running the following script

```bash
python types_counter.py
```

A json file called `most_common.json` is created which contains an ordered dictionary for wikidata types frequency.

The threashold to distinguish between generic and specific types was empirically set to consider the first 5000 types as generic (currently types having {'<='}250 entity instances).

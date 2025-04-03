---
sidebar_position: 1
---

# Introduction

Introducing **MammoTab**

The dataset was constructed using a pipeline comprised of a series of Python scripts. These scripts can be found in a Git [repository](https://github.com/unimib-datAI/mammotab).
The dataset is accompanied by this documentation describing how to run the scripts.
In this page the pre requirements are described.

In the Data Cleaning Section the operations applied to table rows, columns and cells to optimise the resulting dataset are described.

## 1. Download wikidumps

E.g. from [here](https://dumps.wikimedia.org/enwiki/). We suggest to download the dumps on multiple bz2 streams as it will be easy to process all the pages in parallel with reduced memory requirements (e.g. `enwiki-20220520-pages-articles-multistream1.xml-p1p41242.bz2`).
Once downloaded you should see something similar to this output:

```
> ls enwiki-*
enwiki-20220520-pages-articles-multistream10.xml-p4045403p5399366.bz2
enwiki-20220520-pages-articles-multistream11.xml-p5399367p6899366.bz2
enwiki-20220520-pages-articles-multistream11.xml-p6899367p7054859.bz2
enwiki-20220520-pages-articles-multistream12.xml-p7054860p8554859.bz2
enwiki-20220520-pages-articles-multistream12.xml-p8554860p9172788.bz2
```

## 2. Install requirements

Create a virtualenv (see [docs.python.org/3/tutorial/venv.html](https://docs.python.org/3/tutorial/venv.html)), activate it and install the requirements:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
touch .env
```

We used Python 3.10.12 and an Ubuntu 20 LTS server. All the scripts are supposed to be run from inside a virtualenv with the requirements installed.

The .env file should contain at least the following variables:

```bash
ADDACRONIMS=True
ADDALIASES=True
ADDTYPOS=True
APPROXIMATENUMBERS=True
MAXLINES = 10000
MAXCOLUMNS = 1000
MAXHEADERS = 200
ENABLE_EXTERNAL_CONTEXT = False
LAMAPI_ROOT=http://example.lamapi.address:port/
LAMAPI_TOKEN=lamapi_token_secret
```

Where the first 4 variables consist of flags to enable data transformation techniques to add acronyms, aliases, typos and appoximate numeric literal values.

MaxLines and MaxColumns are threasholds to exclude excessively large tables present in Wikipedia.

MaxHeaders is a threashold to exclude some improper tables having more headers than content.

ENABLE_EXTERNAL_CONTEXT adds the out table context to the json data, WARNING: if used the size is Huge!

The Lamapi variables reprent the endpoint and access token to the instance of Lamapi neeeded to process the WikiData dumps.

There are some additional env variables to manage export threasholds

```bash
ADDACRONIMSPERCENT = 70
ADDTYPOSPERCENT = 50
APPROXIMATENUMBERSPERCENT = 30
ADDALIASESPERCENT = 70
```

The current user home folder should be writable, otherwise downloading of nltk data will fail and you need to manually provide the data. Check `utilities/column_classifier.py` for details.

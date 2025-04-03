---
sidebar_position: 8
---

# Data Cleaning

The MammoTab dataset comprises tables extracted from Wikipedia, enriched with semantic annotations.
To ensure the dataset`s quality and usability, various data-cleaning tasks are applied. This document outlines the essential data-cleaning rules performed in this version.

## Rules applied to table cells
- **CE1** remove the following html tags from the cell: `sup`, `ref`, `span`, `sub`, `code`, `small`, `poem`
- **CE2** convert `br` tags into spaces removing the newlines
- **CE3** remove all tags and join different parts of the text with a space
- **CE4** remove `{{formatnum:` and `}}` from string
- **CE5** remove `†`
- **CE6** remove text between brackets and manage the case `(number) text`
- **CE7** replace common html artifacts `\xa0` -> `  `, `\&nbsp;` -> `  `, `\&amp;` -> `&`, `\&ndash;` -> `-`
- **CE8** remove extra parenthesis like `{{}}`, `[[]]`, `()`, and `"`
- **CE9** remove leading and trailing spaces
- **CE10** handle specific page types `file:`, `help:`, `wikipedia:wikiproject`

## Rules applied to table columns
- **CO1** remove all columns containing only empty strings `  `, `-`
- **CO2** remove all columns containing only one repeated value
- **CO3** remove columns containing only QIDs
- **CO4** remove first word when repeated in the column

## Rules applied to table rows
- **TR1** remove all rows containing only empty strings `  `, `-`
- **TR2** remove all rows containing only one repeated value
- **TR3** remove rows where total appears at least twice
- **TR4** remove rows with most of the cells empty


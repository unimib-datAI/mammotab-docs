---
sidebar_position: 2
---

# 2. Process the dumps

To process a single dump run:

```bash
python mammotab_v3.py [DUMP_FILE]
```

or as an alternative process the dumps in parallel setting `NPROC` in `parallel_v2.sh` and then running it:

```bash
bash parallel_v2.sh
```

Note that there is a constant `ENABLE_EXTERNAL_CONTEXT` which allows to keep the WikiPedia external context coming from the dumps, it defaults to false due to the large size of the data which it generates.

Once finished (it requires several hours even if executed in parallel) you should see a folder named `wiki_tables` containing, for each dump, several files named `diz_[wiki_id].jzon.gz` containing the information extracted from the dump for each wikipedia page, that contains at least one table.

The output of this first phase is a json file for each dump containing some statistics like this:

```json
{
  "tot_pages": 25507,
  "tot_tab": 3215,
  "tot_linked_tab": 2582,
  "keep_tab": 1415,
  "keep_rows": 30923,
  "keep_cols": 8898
}
```

And many json dictionaries containing the tables, similar to the following example:

<details>
    <summary>Example</summary>

    ```json
    {
        "wiki_id": "20460918", "title": "I'm a Celebrity...Get Me Out of Here! (British TV series) series 4", "tables": {"CW2LAZVR": {"caption": "None", "header": [["Celebrity", "Famous for", "Status"]], "cells": [["Celebrity", "", "Famous for", "", "Status", ""], ["'''[[Joe Pasquale]]'''", "Joe_Pasquale", "'''Comedian'''", "", "'''Winner'''<br><small>'''on 6 December 2004'''</small>", ""], ["[[Paul Burrell]]", "Paul_Burrell", "[[British Royal Household|Royal Household]] servant", "", "Runner-up<br/><small>on 6 December 2004</small>", ""], ["[[Fran Cosgrave]]", "Fran_Cosgrave", "Celebrity nightclub manager", "", "Eliminated 7th<br/><small>on 6 December 2004</small>", ""], ["[[Janet Street-Porter]]", "Janet_Street-Porter", "Broadcaster & journalist", "", "Eliminated 6th<br/><small>on 5 December 2004</small>", ""], ["[[Sophie Anderton]]", "Sophie_Anderton", "Model", "", "Eliminated 5th<br/><small>on 3 December 2004</small>", ""], ["[[Antonio Fargas]]", "Antonio_Fargas", "''[[Starsky & Hutch]]'' actor", "", "Eliminated 4th<br/><small>on 2 December 2004</small>", ""], ["[[Sheila Ferguson]]", "Sheila_Ferguson", "[[The Three Degrees]] singer", "", "Eliminated 3rd<br/><small>on 1 December 2004</small>", ""], ["[[Vic Reeves]]", "Vic_Reeves", "[[Vic and Bob]] comedian", "", "Eliminated 2nd<br/><small>on 30 November 2004</small>", ""], ["[[Nancy Sorrell]]", "Nancy_Sorrell", "Model & wife of [[Vic Reeves]]", "", "Eliminated 1st<br/><small>on 29 November 2004</small>", ""], ["[[Natalie Appleton]]", "Natalie_Appleton", "Former [[All Saints (group)|All Saints]] singer", "", "Withdrew<br/><small>on 29 November 2004</small>", ""], ["[[Brian Harvey (singer)|Brian Harvey]]", "Brian_Harvey_(singer)", "Former [[East 17]] lead singer", "", "Withdrew<br/><small>on 26 November 2004</small>", ""]], "link": [["", "", ""], ["Joe_Pasquale", "", ""], ["Paul_Burrell", "", ""], ["Fran_Cosgrave", "", ""], ["Janet_Street-Porter", "", ""], ["Sophie_Anderton", "", ""], ["Antonio_Fargas", "", ""], ["Sheila_Ferguson", "", ""], ["Vic_Reeves", "", ""], ["Nancy_Sorrell", "", ""], ["Natalie_Appleton", "", ""], ["Brian_Harvey_(singer)", "", ""]], "text": [["Celebrity", "Famous for", "Status"], ["Joe Pasquale", "Comedian", "Winner   on 6 December 2004"], ["Paul Burrell", "Royal Household servant", "Runner-up   on 6 December 2004"], ["Fran Cosgrave", "Celebrity nightclub manager", "Eliminated 7th   on 6 December 2004"], ["Janet Street-Porter", "Broadcaster & journalist", "Eliminated 6th   on 5 December 2004"], ["Sophie Anderton", "Model", "Eliminated 5th   on 3 December 2004"], ["Antonio Fargas", "Starsky & Hutch actor", "Eliminated 4th   on 2 December 2004"], ["Sheila Ferguson", "The Three Degrees singer", "Eliminated 3rd   on 1 December 2004"], ["Vic Reeves", "Vic and Bob comedian", "Eliminated 2nd   on 30 November 2004"], ["Nancy Sorrell", "Model & wife of Vic Reeves", "Eliminated 1st   on 29 November 2004"], ["Natalie Appleton", "Former All Saints singer", "Withdrew   on 29 November 2004"], ["Brian Harvey", "Former East 17 lead singer", "Withdrew   on 26 November 2004"]], "target_col": [0]}, "KFDLBZPH": {"caption": "None", "header": [["Celebrity", "Number of Stars Earned", "Percentage"]], "cells": [["Celebrity", "", "Number of Stars Earned", "", "Percentage", ""], ["[[Antonio Fargas]]", "Antonio_Fargas", "{{Rating|8|17}}", "", "47%", ""], ["[[Brian Harvey (singer)|Brian Harvey]]", "Brian_Harvey_(singer)", "{{Rating|2|10}}", "", "20%", ""], ["[[Fran Cosgrave]]", "Fran_Cosgrave", "{{Rating|18|29}}", "", "62%", ""], ["[[Janet Street Porter]]", "Janet_Street_Porter", "{{Rating|12|19}}", "", "63%", ""], ["[[Joe Pasquale]]", "Joe_Pasquale", "{{Rating|15|22}}", "", "68%", ""], ["[[Nancy Sorrell]]", "Nancy_Sorrell", "{{n/a}}", "", "{{n/a}}", ""], ["[[Natalie Appleton]]", "Natalie_Appleton", "{{Rating|15|41}}", "", "37%", ""], ["[[Paul Burrell]]", "Paul_Burrell", "{{Rating|18|24}}", "", "75%", ""], ["[[Sheila Ferguson]]", "Sheila_Ferguson", "{{Rating|6|9}}", "", "67%", ""], ["[[Sophie Anderton]]", "Sophie_Anderton", "{{Rating|8|15}}", "", "53%", ""], ["[[Vic Reeves]]", "Vic_Reeves", "{{n/a}}", "", "{{n/a}}", ""]], "link": [["", "", ""], ["Antonio_Fargas", "", ""], ["Brian_Harvey_(singer)", "", ""], ["Fran_Cosgrave", "", ""], ["Janet_Street_Porter", "", ""], ["Joe_Pasquale", "", ""], ["Nancy_Sorrell", "", ""], ["Natalie_Appleton", "", ""], ["Paul_Burrell", "", ""], ["Sheila_Ferguson", "", ""], ["Sophie_Anderton", "", ""], ["Vic_Reeves", "", ""]], "text": [["Celebrity", "Number of Stars Earned", "Percentage"], ["Antonio Fargas", "", "47%"], ["Brian Harvey", "", "20%"], ["Fran Cosgrave", "", "62%"], ["Janet Street Porter", "", "63%"], ["Joe Pasquale", "", "68%"], ["Nancy Sorrell", "", ""], ["Natalie Appleton", "", "37%"], ["Paul Burrell", "", "75%"], ["Sheila Ferguson", "", "67%"], ["Sophie Anderton", "", "53%"], ["Vic Reeves", "", ""]], "target_col": [0]}}}
    ```

</details>

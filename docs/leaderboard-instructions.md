---
sidebar_position: 9
---

# Leaderboard Instructions

This guide will walk you through the process of testing a model and contributing to the MammoTab Leaderboard.

The testing is performed on a sample of 870 tables, containing a total of 84,907 cells. This sample has been carefully selected to represent the diverse characteristics of the MammoTab dataset and STI key challenges.

The template used to test Mammotab is TableLLAMA prompt which is structured as below:

```
Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:

This is an entity linking task. The goal for this task is to link the selected entity mention in the table\ncells to the entity in the knowledge base. You will be given a list of referent entities, with each one composed of an\nentity name, its description and its type. Please choose the correct one from the referent entity candidates.

### Input

[TLE] None. [TAB] col: | col0 | col1 | col2 | col3 |
row 1: | United States presidential election in South Carolina, 1789 | The American Fabius | None | 7 | [SEP]
row 2: | United States presidential election in South Carolina, 1792 | George Washington | None | 8 | [SEP]
row 3: | 1796 | Thomas Jefferson | Democratic-Republican | 8 | [SEP] ...

### Question:

The selected entity mention in the table cell is: United States presidential election in South Carolina, 1789. The column name for 'United States presidential election in South Carolina, 1789' is col0. The referent entity candidates are:

<United States presidential election in South Carolina, 1912 [DESCRIPTION] election in South Carolina [TYPE] United States presidential election in South Carolina>,
<1788-89 United States presidential election in South Carolina [DESCRIPTION] election in South Carolina [TYPE] United States presidential election in South Carolina>
...
What is the correct referent entity for the entity mention 'United States presidential election in South Carolina, 1789'?

### Response

`<1788-89 United States presidential election in South Carolina [DESCRIPTION] election in South Carolina [TYPE] United States presidential election in South Carolina>`
```

Furthermore, every model is run by setting the **do_sample** parameter of the generation method (for Language Models) to **False**. Thi is an implementation choice to ensure reproducibility of the outputs.

## Dataset Characteristics

The test sample includes:

- **Entity Annotations**:
  - 71,500 entities
  - 14,856 NIL mentions
- **Type Annotations**:
  - 266,703 generic types
  - 1,125,199 specific types
- **Additional Features**:
  - 3,518 acronyms
  - 12,135 typos
  - 7,117 aliases
- **Domain Distribution**:
  - 435 single-domain tables
  - 435 multi-domain tables
- **Table Dimensions**:
  - Total Columns: 5,252
  - Total Rows: 37,820
  - Rows per table: min=4, max=253, avg=43.47, median=33.0
  - Columns per table: min=1, max=36, avg=6.04, median=4.0
  - Cells per table: min=4, max=264

## Prerequisites

Before starting, ensure you have:

- Access to the MammoTab execution repository
- A Hugging Face account with API token
- Docker installed on your system
- Sufficient hardware resources for model execution

## Step 1: Model Selection and Setup

### Select Your Model

1. Access the [Model Spreadsheet](https://docs.google.com/spreadsheets/d/12-hiPkNLePmRdf2fghLUDOM6xrR1qVUeaIOyuAqf5PE/edit?gid=0#gid=0)
2. Choose a model from the available list in the "Model" sheet
3. Search it on HuggingFace, where you can copy the correct name (e.g. "Qwen/Qwen2.5-1.5B", "Qwen/Qwen2.5-0.5B", "microsoft/phi-2")
4. Update the "Group in charge" column with your affiliation information
5. Set the model's status to "In Progress" when you begin testing

## Step 2: Environment Setup

### Clone the Repository

```bash
# Clone the repository and navigate to it
git clone git@github.com:unimib-datAI/mammotab_execution.git
cd mammotab_execution
```

### Configure Environment Variables

1. Create a `.env` file in the main directory:

```bash
# Navigate to the project directory and create the .env file
cd mammotab_execution
nano .env
```

2. Add the following configuration:

```env
# MongoDB Configuration
MONGO_VERSION="6.0"
MONGO_PORT="27017"
MONGO_INITDB_ROOT_USERNAME="root"
MONGO_INITDB_ROOT_PASSWORD="mammotab_execution"
MONGO_INITDB_DATABASE="mammotab"

# Model Configuration
BATCH_SIZE=4
MODEL_NAME="your-model-name"
TOKENIZER_NAME="your-tokenizer-name"
HF_TOKEN="your-huggingface-token"
```

:::note

- `MODEL_NAME` and `TOKENIZER_NAME` should be obtained from the Hugging Face model documentation
- `HF_TOKEN` is your personal Hugging Face API token
- Adjust `BATCH_SIZE` based on your hardware capabilities
  :::

## Step 3: Dataset and Execution

### Initialize the Dataset

```bash
# Run the initialization script
./init.sh
```

### Start the Annotation Process

```bash
# Start the Docker containers
docker compose up
```

:::caution
The annotation process may take several days to complete, depending on the model size and your hardware specifications. See [Hardware Considerations](#hardware-considerations) for more details.
:::

## Step 4: Results Submission

### Export Results

1. Once the process completes, locate the `[model-name].json` file in the main directory
2. Send the results file to the MammoTab team for leaderboard updates

## Troubleshooting

### Common Issues

- **Docker Issues**: Ensure Docker is running and you have sufficient permissions
- **Memory Errors**: Try reducing the `BATCH_SIZE` in the `.env` file
- **API Token Issues**: Verify your Hugging Face token is valid and has necessary permissions

### Support

For additional support, please contact the MammoTab team or open an issue in the repository.

## Best Practices

1. **Hardware Considerations**

   - Use GPU-enabled machines for faster processing
   - Monitor system resources during execution
   - Consider using cloud services for large models

2. **Data Management**

   - Keep regular backups of your results
   - Document any issues or observations during testing
   - Maintain clear communication with the MammoTab team

3. **Performance Optimization**
   - Start with a smaller batch size and increase gradually
   - Monitor memory usage and adjust accordingly
   - Consider using model quantization for large models

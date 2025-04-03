---
sidebar_position: 9
---

# Leaderboard Instructions

This guide will walk you through the process of testing a model and contributing to the MammoTab Leaderboard.

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
3. Update the "Group in charge" column with your team's information
4. Set the model's status to "In Progress" when you begin testing

## Step 2: Environment Setup

### Clone the Repository
```bash
git clone git@github.com:unimib-datAI/mammotab_execution.git
cd mammotab_execution
```

### Configure Environment Variables
1. Create a `.env` file in the main directory:
```bash
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
./init.sh
```

### Start the Annotation Process
```bash
docker compose up
```

:::caution
The annotation process may take several days to complete, depending on the model size and your hardware specifications.
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
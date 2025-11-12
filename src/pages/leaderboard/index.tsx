import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  SortingState,
  ColumnVisibility,
} from "@tanstack/react-table";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

// Define types for our data
type ModelData = {
  model: string;
  link: string;
  parameters: string;
  status: "To do" | "In progress" | "Done" | "Unusable results";
  system: string;
  total_time: string;
  accuracy: string;
  total_correct: string;
  ne_cells: string;
  nils: string;
  acronyms: string;
  genericTypes: string;
  specificTypes: string;
  singleDomain: string;
  multiDomain: string;
  small_per_cols: string;
  medium_per_cols: string;
  large_per_cols: string;
  small_per_rows: string;
  medium_per_rows: string;
  large_per_rows: string;
};

// Maximum values for percentage calculation
const MAX_VALUES = {
  nils: 14856,
  acronyms: 3518,
  aliases: 7117,
  typos: 12135,
  genericTypes: 96,
  specificTypes: 774,
  singleDomain: 435,
  multiDomain: 435,
  smallPerCols: 152,
  mediumPerCols: 465,
  largePerCols: 253,
  smallPerRows: 394,
  mediumPerRows: 232,
  largePerRows: 244,
  annotatedCells: 84907,
} as const;

// Helper function for rendering cells with percentage
const renderCellWithPercentage = (value: string, maxValue: number) => {
  if (!value) return "";
  const percentage = Math.round((parseInt(value) / maxValue) * 100);
  return (
    <div className="flex items-center justify-center gap-1">
      <span>{value}</span>
      <span className="text-xs text-gray-400">[{percentage}%]</span>
    </div>
  );
};

// Helper function for rendering simple cells
const renderSimpleCell = (value: string) => {
  if (!value) return "";
  return (
    <div className="flex items-center justify-center gap-1">
      <span>{value}</span>
    </div>
  );
};

// Helper function for rendering accuracy cells
const renderAccuracyCell = (value: string) => {
  if (!value) return "";
  const accuracy = parseFloat(value);
  let bgColor = "";
  let textColor = "text-stone-100";

  if (accuracy >= 0.7) {
    bgColor = "bg-green-600"; // Eccellente
  } else if (accuracy >= 0.6) {
    bgColor = "bg-green-500"; // Molto buono
  } else if (accuracy >= 0.5) {
    bgColor = "bg-yellow-500"; // Buono
  } else if (accuracy >= 0.4) {
    bgColor = "bg-yellow-400"; // Medio
  } else if (accuracy >= 0.3) {
    bgColor = "bg-orange-500"; // Sufficiente
  } else if (accuracy >= 0.2) {
    bgColor = "bg-orange-600"; // Scarso
  } else if (accuracy >= 0.1) {
    bgColor = "bg-red-500"; // Molto scarso
  } else {
    bgColor = "bg-red-600"; // Insufficiente
  }

  return (
    <div className="flex items-center justify-center">
      <span
        className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-xs font-semibold`}
      >
        {accuracy.toFixed(3)}
      </span>
    </div>
  );
};

// Helper function for rendering status cells
const renderStatusCell = (status: ModelData["status"]) => {
  let bgColor = "";
  let textColor = "text-stone-100";

  switch (status) {
    case "To do":
      bgColor = "bg-primary";
      break;
    case "In progress":
      bgColor = "bg-primary-dark";
      break;
    case "Done":
      bgColor = "bg-primary-darkest";
      break;
  }

  return (
    <div className="flex justify-center items-center">
      <span
        className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-xs font-semibold w-24 text-center`}
      >
        {status}
      </span>
    </div>
  );
};

const columnHelper = createColumnHelper<ModelData>();

// Memoize columns to prevent unnecessary re-renders
const createColumns = () => [
  columnHelper.accessor("model", {
    header: "Model",
    cell: (info) => {
      const modelName = info.getValue();
      const link = info.row.original.link;
      if (link) {
        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary dark:text-primary-light hover:underline"
          >
            {modelName}
          </a>
        );
      }
      return <span className="font-bold">{modelName}</span>;
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("parameters", {
    header: "Parameters",
    cell: (info) => renderSimpleCell(info.getValue()),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => renderStatusCell(info.getValue()),
    sortingFn: (rowA, rowB) => {
      const statusOrder: Record<ModelData["status"], number> = {
        Done: 0,
        "In progress": 1,
        "To do": 2,
        "Unusable results": 3,
      };
      return (
        statusOrder[rowA.getValue("status")] -
        statusOrder[rowB.getValue("status")]
      );
    },
  }),
  columnHelper.accessor("system", {
    header: "GPU",
    cell: (info) => renderSimpleCell(info.getValue()),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("total_time", {
    header: "Total Time",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      const hours = (parseFloat(value) / 3600).toFixed(2);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{hours}h</span>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = parseFloat(rowA.getValue("total_time"));
      const b = parseFloat(rowB.getValue("total_time"));
      return a - b;
    },
  }),
  columnHelper.accessor("accuracy", {
    header: "Accuracy",
    cell: (info) => renderAccuracyCell(info.getValue()),
    sortingFn: (rowA, rowB) => {
      const a = parseFloat(rowA.getValue("accuracy"));
      const b = parseFloat(rowB.getValue("accuracy"));
      return a - b;
    },
  }),
  columnHelper.accessor("total_correct", {
    header: "Total Correct",
    cell: (info) => renderSimpleCell(info.getValue()),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("total_correct"));
      const b = parseInt(rowB.getValue("total_correct"));
      return a - b;
    },
  }),
  columnHelper.accessor("nils", {
    header: "NILs",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.nils),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("nils"));
      const b = parseInt(rowB.getValue("nils"));
      return a - b;
    },
  }),
  columnHelper.accessor("acronyms", {
    header: "Acronyms",
    cell: (info) =>
      renderCellWithPercentage(info.getValue(), MAX_VALUES.acronyms),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("acronyms"));
      const b = parseInt(rowB.getValue("acronyms"));
      return a - b;
    },
  }),
  columnHelper.accessor("genericTypes", {
    header: "Generic Types",
    cell: (info) =>
      renderCellWithPercentage(info.getValue(), MAX_VALUES.genericTypes),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("genericTypes"));
      const b = parseInt(rowB.getValue("genericTypes"));
      return a - b;
    },
  }),
  columnHelper.accessor("specificTypes", {
    header: "Specific Types",
    cell: (info) =>
      renderCellWithPercentage(info.getValue(), MAX_VALUES.specificTypes),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("specificTypes"));
      const b = parseInt(rowB.getValue("specificTypes"));
      return a - b;
    },
  }),
  columnHelper.accessor("singleDomain", {
    header: "Single Domain",
    cell: (info) =>
      renderCellWithPercentage(info.getValue(), MAX_VALUES.singleDomain),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("singleDomain"));
      const b = parseInt(rowB.getValue("singleDomain"));
      return a - b;
    },
  }),
  columnHelper.accessor("multiDomain", {
    header: "Multi Domain",
    cell: (info) =>
      renderCellWithPercentage(info.getValue(), MAX_VALUES.multiDomain),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("multiDomain"));
      const b = parseInt(rowB.getValue("multiDomain"));
      return a - b;
    },
  }),
  columnHelper.accessor("small_per_cols", {
    header: "Small % Cols",
    cell: (info) =>
      renderCellWithPercentage(info.getValue(), MAX_VALUES.smallPerCols),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("small_per_cols"));
      const b = parseInt(rowB.getValue("small_per_cols"));
      return a - b;
    },
  }),
  columnHelper.accessor("medium_per_cols", {
    header: "Medium % Cols",
    cell: (info) =>
      renderCellWithPercentage(info.getValue(), MAX_VALUES.mediumPerCols),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("medium_per_cols"));
      const b = parseInt(rowB.getValue("medium_per_cols"));
      return a - b;
    },
  }),
  columnHelper.accessor("large_per_cols", {
    header: "Large % Cols",
    cell: (info) =>
      renderCellWithPercentage(info.getValue(), MAX_VALUES.largePerCols),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("large_per_cols"));
      const b = parseInt(rowB.getValue("large_per_cols"));
      return a - b;
    },
  }),
  columnHelper.accessor("small_per_rows", {
    header: "Small % Rows",
    cell: (info) =>
      renderCellWithPercentage(info.getValue(), MAX_VALUES.smallPerRows),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("small_per_rows"));
      const b = parseInt(rowB.getValue("small_per_rows"));
      return a - b;
    },
  }),
  columnHelper.accessor("medium_per_rows", {
    header: "Medium % Rows",
    cell: (info) =>
      renderCellWithPercentage(info.getValue(), MAX_VALUES.mediumPerRows),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("medium_per_rows"));
      const b = parseInt(rowB.getValue("medium_per_rows"));
      return a - b;
    },
  }),
  columnHelper.accessor("large_per_rows", {
    header: "Large % Rows",
    cell: (info) =>
      renderCellWithPercentage(info.getValue(), MAX_VALUES.largePerRows),
    sortingFn: (rowA, rowB) => {
      const a = parseInt(rowA.getValue("large_per_rows"));
      const b = parseInt(rowB.getValue("large_per_rows"));
      return a - b;
    },
  }),
];

const data: ModelData[] = [
  {
    model: "tiiuae/Falcon3-7B-Instruct",
    link: "https://huggingface.co/tiiuae/Falcon3-7B-Instruct",
    parameters: "7B",
    status: "Done",
    system: "NVIDIA L40S",
    total_time: "66890.43",
    accuracy: "0.276",
    total_correct: "23508",
    ne_cells: "84907",
    nils: "576",
    acronyms: "2192",
    genericTypes: "58",
    specificTypes: "517",
    singleDomain: "228",
    multiDomain: "347",
    small_per_cols: "66",
    medium_per_cols: "314",
    large_per_cols: "195",
    small_per_rows: "260",
    medium_per_rows: "162",
    large_per_rows: "153",
  },
  {
    model: "google/gemma-2-2b-it",
    link: "https://huggingface.co/google/gemma-2-2b-it",
    parameters: "2B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "250822.537",
    accuracy: "0.407",
    total_correct: "34608",
    ne_cells: "84907",
    nils: "680",
    acronyms: "2323",
    genericTypes: "58",
    specificTypes: "529",
    singleDomain: "226",
    multiDomain: "361",
    small_per_cols: "69",
    medium_per_cols: "354",
    large_per_cols: "164",
    small_per_rows: "234",
    medium_per_rows: "185",
    large_per_rows: "168",
  },
  {
    model: "google/gemma-2-9b-it",
    link: "https://huggingface.co/google/gemma-2-9b-it",
    parameters: "9B",
    status: "Done",
    system: "NVIDIA L40S",
    total_time: "141348.254",
    accuracy: "0.401",
    total_correct: "34063",
    ne_cells: "84907",
    nils: "676",
    acronyms: "2226",
    genericTypes: "56",
    specificTypes: "542",
    singleDomain: "241",
    multiDomain: "357",
    small_per_cols: "71",
    medium_per_cols: "359",
    large_per_cols: "168",
    small_per_rows: "255",
    medium_per_rows: "176",
    large_per_rows: "167",
  },
  {
    model: "google/gemma-3-27b-it",
    link: "https://huggingface.co/google/gemma-3-27b-it",
    parameters: "27B",
    status: "Done",
    system: "NVIDIA A40",
    total_time: "316222",
    accuracy: "0.377",
    total_correct: "32037",
    ne_cells: "84907",
    nils: "2859",
    acronyms: "2248",
    genericTypes: "59",
    specificTypes: "523",
    singleDomain: "252",
    multiDomain: "330",
    small_per_cols: "85",
    medium_per_cols: "323",
    large_per_cols: "174",
    small_per_rows: "230",
    medium_per_rows: "182",
    large_per_rows: "170",
  },
  {
    model: "meta-llama/Llama-3.2-1B",
    link: "https://huggingface.co/meta-llama/Llama-3.2-1B",
    parameters: "1B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "83214.818",
    accuracy: "0.048",
    total_correct: "4142",
    ne_cells: "84907",
    nils: "170",
    acronyms: "30",
    genericTypes: "4",
    specificTypes: "18",
    singleDomain: "7",
    multiDomain: "15",
    small_per_cols: "1",
    medium_per_cols: "13",
    large_per_cols: "8",
    small_per_rows: "17",
    medium_per_rows: "2",
    large_per_rows: "3",
  },
  {
    model: "meta-llama/Llama-3.2-3B",
    link: "https://huggingface.co/meta-llama/Llama-3.2-3B",
    parameters: "3B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "211444.595",
    accuracy: "0.303",
    total_correct: "25771",
    ne_cells: "84907",
    nils: "610",
    acronyms: "2171",
    genericTypes: "43",
    specificTypes: "461",
    singleDomain: "205",
    multiDomain: "299",
    small_per_cols: "64",
    medium_per_cols: "317",
    large_per_cols: "123",
    small_per_rows: "177",
    medium_per_rows: "169",
    large_per_rows: "158",
  },
  {
    model: "meta-llama/Llama-3.3-70B-Instruct",
    link: "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct",
    parameters: "70B",
    status: "Done",
    system: "NVIDIA L40S",
    total_time: "848361.459",
    accuracy: "0.629",
    total_correct: "53473",
    ne_cells: "84907",
    nils: "1700",
    acronyms: "2570",
    genericTypes: "71",
    specificTypes: "644",
    singleDomain: "303",
    multiDomain: "412",
    small_per_cols: "92",
    medium_per_cols: "402",
    large_per_cols: "221",
    small_per_rows: "309",
    medium_per_rows: "206",
    large_per_rows: "200",
  },
  {
    model: "meta-llama/Llama-3.1-8B-Instruct",
    link: "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct",
    parameters: "8B",
    status: "Done",
    system: "NVIDIA L40S",
    total_time: "331622.583",
    accuracy: "0.453",
    total_correct: "38488",
    ne_cells: "84907",
    nils: "500",
    acronyms: "2245",
    genericTypes: "67",
    specificTypes: "503",
    singleDomain: "222",
    multiDomain: "348",
    small_per_cols: "69",
    medium_per_cols: "321",
    large_per_cols: "180",
    small_per_rows: "245",
    medium_per_rows: "166",
    large_per_rows: "159",
  },
  {
    model: "mistralai/Mistral-Large-Instruct",
    link: "https://huggingface.co/mistralai/Mistral-Large-Instruct",
    parameters: "123B",
    status: "Done",
    system: "NVIDIA L40S",
    total_time: "369249.357",
    accuracy: "0.736",
    total_correct: "62503",
    ne_cells: "84907",
    nils: "6308",
    acronyms: "2703",
    genericTypes: "88",
    specificTypes: "655",
    singleDomain: "342",
    multiDomain: "401",
    small_per_cols: "119",
    medium_per_cols: "400",
    large_per_cols: "224",
    small_per_rows: "303",
    medium_per_rows: "214",
    large_per_rows: "226",
  },
  {
    model: "mistralai/Mistral-7B-Instruct-v0.3",
    link: "https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3",
    parameters: "7B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "351452.635",
    accuracy: "0.533",
    total_correct: "45265",
    ne_cells: "84907",
    nils: "729",
    acronyms: "2517",
    genericTypes: "68",
    specificTypes: "610",
    singleDomain: "270",
    multiDomain: "408",
    small_per_cols: "78",
    medium_per_cols: "387",
    large_per_cols: "213",
    small_per_rows: "295",
    medium_per_rows: "199",
    large_per_rows: "184",
  },
  {
    model: "microsoft/Phi-3-mini-4k-instruct",
    link: "https://huggingface.co/microsoft/Phi-3-mini-4k-instruct",
    parameters: "3.8B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "369925.491",
    accuracy: "0.281",
    total_correct: "23881",
    ne_cells: "84907",
    nils: "650",
    acronyms: "2085",
    genericTypes: "37",
    specificTypes: "482",
    singleDomain: "207",
    multiDomain: "312",
    small_per_cols: "58",
    medium_per_cols: "318",
    large_per_cols: "143",
    small_per_rows: "208",
    medium_per_rows: "166",
    large_per_rows: "145",
  },
  {
    model: "microsoft/Phi-3-mini-128k-instruct",
    link: "https://huggingface.co/microsoft/Phi-3-mini-128k-instruct",
    parameters: "3.8B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "401400.957",
    accuracy: "0.285",
    total_correct: "24247",
    ne_cells: "84907",
    nils: "524",
    acronyms: "2199",
    genericTypes: "41",
    specificTypes: "507",
    singleDomain: "221",
    multiDomain: "327",
    small_per_cols: "63",
    medium_per_cols: "343",
    large_per_cols: "142",
    small_per_rows: "208",
    medium_per_rows: "178",
    large_per_rows: "162",
  },
  {
    model: "Qwen/Qwen2-0.5B",
    link: "https://huggingface.co/Qwen/Qwen2-0.5B",
    parameters: "0.5B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "59915.142",
    accuracy: "0.044",
    total_correct: "3750",
    ne_cells: "84907",
    nils: "47",
    acronyms: "10",
    genericTypes: "2",
    specificTypes: "17",
    singleDomain: "6",
    multiDomain: "13",
    small_per_cols: "0",
    medium_per_cols: "14",
    large_per_cols: "5",
    small_per_rows: "16",
    medium_per_rows: "2",
    large_per_rows: "1",
  },
  {
    model: "Qwen/Qwen2-1.5B",
    link: "https://huggingface.co/Qwen/Qwen2-1.5B",
    parameters: "1.5B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "98496.646",
    accuracy: "0.166",
    total_correct: "14124",
    ne_cells: "84907",
    nils: "447",
    acronyms: "1429",
    genericTypes: "23",
    specificTypes: "285",
    singleDomain: "147",
    multiDomain: "161",
    small_per_cols: "42",
    medium_per_cols: "209",
    large_per_cols: "57",
    small_per_rows: "90",
    medium_per_rows: "110",
    large_per_rows: "108",
  },
  {
    model: "Qwen/Qwen2-7B",
    link: "https://huggingface.co/Qwen/Qwen2-7B",
    parameters: "7B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "283404.264",
    accuracy: "0.289",
    total_correct: "24546",
    ne_cells: "84907",
    nils: "448",
    acronyms: "1727",
    genericTypes: "48",
    specificTypes: "378",
    singleDomain: "179",
    multiDomain: "247",
    small_per_cols: "55",
    medium_per_cols: "267",
    large_per_cols: "104",
    small_per_rows: "136",
    medium_per_rows: "155",
    large_per_rows: "135",
  },
  {
    model: "Qwen/Qwen2.5-0.5B",
    link: "https://huggingface.co/Qwen/Qwen2.5-0.5B",
    parameters: "0.5B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "51666.95",
    accuracy: "0.015",
    total_correct: "1329",
    ne_cells: "84907",
    nils: "70",
    acronyms: "0",
    genericTypes: "0",
    specificTypes: "2",
    singleDomain: "1",
    multiDomain: "1",
    small_per_cols: "0",
    medium_per_cols: "2",
    large_per_cols: "0",
    small_per_rows: "1",
    medium_per_rows: "1",
    large_per_rows: "0",
  },
  {
    model: "Qwen/Qwen2.5-7B",
    link: "https://huggingface.co/Qwen/Qwen2.5-7B",
    parameters: "7B",
    status: "Done",
    system: "NVIDIA A40",
    total_time: "172776.68",
    accuracy: "0.51",
    total_correct: "43321",
    ne_cells: "84907",
    nils: "1531",
    acronyms: "2568",
    genericTypes: "74",
    specificTypes: "607",
    singleDomain: "265",
    multiDomain: "416",
    small_per_cols: "76",
    medium_per_cols: "383",
    large_per_cols: "222",
    small_per_rows: "298",
    medium_per_rows: "198",
    large_per_rows: "185",
  },
  {
    model: "osunlp/TableLlama",
    link: "https://huggingface.co/osunlp/TableLlama",
    parameters: "based on LLama 7B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "282367.744",
    accuracy: "0.731",
    total_correct: "62116",
    ne_cells: "84907",
    nils: "2472",
    acronyms: "2556",
    genericTypes: "82",
    specificTypes: "656",
    singleDomain: "306",
    multiDomain: "432",
    small_per_cols: "91",
    medium_per_cols: "413",
    large_per_cols: "234",
    small_per_rows: "332",
    medium_per_rows: "209",
    large_per_rows: "197",
  },
  {
    model: "01-ai/Yi-1.5-6B",
    link: "https://huggingface.co/01-ai/Yi-1.5-6B",
    parameters: "6B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "187070.847",
    accuracy: "0.068",
    total_correct: "5832",
    ne_cells: "84907",
    nils: "24",
    acronyms: "545",
    genericTypes: "6",
    specificTypes: "71",
    singleDomain: "31",
    multiDomain: "46",
    small_per_cols: "1",
    medium_per_cols: "51",
    large_per_cols: "25",
    small_per_rows: "39",
    medium_per_rows: "24",
    large_per_rows: "14",
  },
  {
    model: "01-ai/Yi-1.5-9B",
    link: "https://huggingface.co/01-ai/Yi-1.5-9B",
    parameters: "9B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "277928.323",
    accuracy: "0.177",
    total_correct: "15080",
    ne_cells: "84907",
    nils: "512",
    acronyms: "1769",
    genericTypes: "16",
    specificTypes: "296",
    singleDomain: "153",
    multiDomain: "159",
    small_per_cols: "38",
    medium_per_cols: "207",
    large_per_cols: "67",
    small_per_rows: "86",
    medium_per_rows: "119",
    large_per_rows: "107",
  },
  {
    model: "microsoft/Phi-3-small-8k-instruct",
    link: "https://huggingface.co/microsoft/Phi-3-small-8k-instruct",
    parameters: "7B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "1008260.181",
    accuracy: "0.392",
    total_correct: "33332",
    ne_cells: "84907",
    nils: "205",
    acronyms: "2376",
    genericTypes: "63",
    specificTypes: "580",
    singleDomain: "249",
    multiDomain: "394",
    small_per_cols: "74",
    medium_per_cols: "370",
    large_per_cols: "199",
    small_per_rows: "283",
    medium_per_rows: "184",
    large_per_rows: "176",
  },
  {
    model: "google/gemma-3-27b-it",
    link: "https://huggingface.co/google/gemma-3-27b-it",
    parameters: "27B",
    status: "Done",
    system: "NVIDIA A40",
    total_time: "316222.677",
    accuracy: "0.377",
    total_correct: "32037",
    ne_cells: "84907",
    nils: "2859",
    acronyms: "2248",
    genericTypes: "59",
    specificTypes: "523",
    singleDomain: "252",
    multiDomain: "330",
    small_per_cols: "85",
    medium_per_cols: "323",
    large_per_cols: "174",
    small_per_rows: "230",
    medium_per_rows: "182",
    large_per_rows: "170",
  },
  {
    model: "deepseek-ai/DeepSeek-R1",
    link: "https://huggingface.co/deepseek-ai/DeepSeek-R1",
    parameters: "651B",
    status: "Done",
    system: "NVIDIA A40",
    total_time: "6697997.264",
    accuracy: "0.693",
    total_correct: "58921",
    ne_cells: "84907",
    nils: "6179",
    acronyms: "2775",
    genericTypes: "93",
    specificTypes: "703",
    singleDomain: "365",
    multiDomain: "431",
    small_per_cols: "127",
    medium_per_cols: "429",
    large_per_cols: "240",
    small_per_rows: "332",
    medium_per_rows: "225",
    large_per_rows: "239",
  },
  {
    model: "Qwen/Qwen2.5-72B-Instruct ",
    link: "https://huggingface.co/Qwen/Qwen2.5-72B-Instruct",
    parameters: "73B",
    status: "Done",
    system: "NVIDIA A40",
    total_time: "410015.6",
    accuracy: "0.735",
    total_correct: "62439",
    ne_cells: "84907",
    nils: "7262",
    acronyms: "2704",
    genericTypes: "92",
    specificTypes: "686",
    singleDomain: "356",
    multiDomain: "422",
    small_per_cols: "125",
    medium_per_cols: "417",
    large_per_cols: "236",
    small_per_rows: "328",
    medium_per_rows: "221",
    large_per_rows: "229",
  },
  {
    model: "Qwen/Qwen2.5-72B-Instruct ",
    link: "https://huggingface.co/Qwen/Qwen2.5-72B-Instruct",
    parameters: "73B",
    status: "Done",
    system: "NVIDIA A40",
    total_time: "410015.6",
    accuracy: "0.735",
    total_correct: "62439",
    ne_cells: "84907",
    nils: "7262",
    acronyms: "2704",
    genericTypes: "92",
    specificTypes: "686",
    singleDomain: "356",
    multiDomain: "422",
    small_per_cols: "125",
    medium_per_cols: "417",
    large_per_cols: "236",
    small_per_rows: "328",
    medium_per_rows: "221",
    large_per_rows: "229",
  },
  {
    model: "microsoft/Phi-4-mini-instruct",
    link: "https://huggingface.co/microsoft/Phi-4-mini-instruct",
    parameters: "4B",
    status: "Done",
    system: "NVIDIA A6000",
    total_time: "240010.731",
    accuracy: "0.288",
    total_correct: "24533",
    ne_cells: "84907",
    nils: "105",
    acronyms: "2183",
    genericTypes: "42",
    specificTypes: "491",
    singleDomain: "219",
    multiDomain: "314",
    small_per_cols: "66",
    medium_per_cols: "338",
    large_per_cols: "129",
    small_per_rows: "194",
    medium_per_rows: "173",
    large_per_rows: "166",
  },
];

export default function Leaderboard(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  // Memoize initial state
  const initialSorting = useMemo<SortingState>(
    () => [
      {
        id: "status",
        desc: false,
      },
    ],
    []
  );

  const initialColumnVisibility = useMemo<Record<string, boolean>>(
    () => ({
      model: true,
      parameters: true,
      status: true,
      nils: true,
      acronyms: true,
      genericTypes: true,
      specificTypes: true,
      singleDomain: true,
      multiDomain: true,
      small_per_cols: true,
      medium_per_cols: true,
      large_per_cols: true,
      small_per_rows: true,
      medium_per_rows: true,
      large_per_rows: true,
    }),
    []
  );

  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(initialColumnVisibility);
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  // Memoize columns
  const columns = useMemo(() => createColumns(), []);

  const table = useReactTable<ModelData>({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Memoize toggle function
  const toggleColumnMenu = useCallback(() => {
    setShowColumnMenu((prev) => !prev);
  }, []);

  // Count models with usable results
  const usableModelsCount = useMemo(() => {
    return data.filter((model) => model.status !== "Unusable results").length;
  }, []);

  // Update the span element with the count
  useEffect(() => {
    const spanElement = document.getElementById("llm-models");
    if (spanElement) {
      spanElement.textContent = usableModelsCount.toString();
    }
  }, [usableModelsCount]);

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="MammoTab, is a dataset composed of 1M Wikipedia tables extracted from over 20M Wikipedia pages and annotated through Wikidata."
    >
      <main className="flex flex-col min-h-[calc(100vh-4rem)]">
        <img
          src="/mammotab-docs/img/bblurrymam.svg"
          className="absolute opacity-10 -top-[45rem]"
        />

        <section
          id="tanstack-table-container"
          className="mx-auto relative z-10 p-8 w-full flex-1"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary dark:text-primary-light">
              LLM Leaderboard
            </h1>
            <p className="text-stone-800 dark:text-stone-100 mt-2">
              Compare the performance of <span id="llm-models"></span> language
              models (continuously updated) on the MammoTab dataset
            </p>
            <p className="text-stone-600 dark:text-stone-300 mt-4 text-sm">
              This leaderboard has been{" "}
              <a
                href="/mammotab-docs/docs/leaderboard-instructions"
                className="text-primary dark:text-primary-light hover:underline"
              >
                generated
              </a>{" "}
              using the MammoTab sample dataset, which consists of 870 tables
              containing a total of 84,907 distinct mentions.
            </p>
            <div className="mt-6 p-4 bg-primary-light/10 dark:bg-primary-darker/10 rounded-lg border border-primary-light/20 dark:border-primary-darker/20">
              <p className="text-stone-800 dark:text-stone-100 font-semibold mb-2">
                This leaderboard is managed by:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-stone-700 dark:text-stone-300">
                  <span className="font-medium">Marco Cremaschi</span>,{" "}
                  <span className="font-medium">Federico Belotti</span>,{" "}
                  <span className="font-medium">Matteo Palmonari</span>
                  <span className="text-stone-600 dark:text-stone-400">
                    {" "}
                    from the University of Milano-Bicocca
                  </span>
                </span>
                <span className="text-stone-700 dark:text-stone-300">
                  and{" "}
                  <span className="font-medium">
                    <a href="https://www.tib.eu/en/research-development/research-groups-and-labs/data-science-and-digital-libraries/staff/jennifer-dsouza">
                      Jennifer D'Souza
                    </a>
                  </span>
                  <span className="text-stone-600 dark:text-stone-400">
                    {" "}
                    from TIB Leibniz Information Centre for Science and
                    Technology
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="fixed top-20 right-4 z-50">
            <div className="relative">
              <button
                className="px-4 py-2 bg-primary-darkest text-white rounded-lg hover:bg-opacity-90 flex items-center gap-2 transition-all duration-200"
                onClick={toggleColumnMenu}
              >
                {showColumnMenu ? <EyeOff size={18} /> : <Eye size={18} />}
                Show/Hide Columns
              </button>
              {showColumnMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1b1b1d] rounded-lg shadow-xl py-2 z-50 max-h-[400px] overflow-y-auto border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      Visible Columns
                    </h3>
                  </div>
                  {table.getAllLeafColumns().map((column) => {
                    if (column.id === "model") return null;
                    return (
                      <div
                        key={column.id}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-150"
                      >
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={column.getIsVisible()}
                            onChange={column.getToggleVisibilityHandler()}
                            className="rounded text-primary-darkest focus:ring-primary-darkest h-4 w-4 bg-white dark:bg-[#1b1b1d] border-gray-300 dark:border-gray-600"
                          />
                          <span className="text-sm text-gray-800 dark:text-gray-100">
                            {column.columnDef.header as string}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg w-full border border-gray-200 dark:border-gray-700">
            <div className="min-w-[1800px]">
              <table className="text-sm w-full rounded-lg overflow-hidden">
                <thead className="text-xs uppercase dark:bg-rocketmetallic bg-paletaupe sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        const isMetricColumn = [
                          "cea",
                          "nils",
                          "acronyms",
                          "aliases",
                          "typos",
                          "genericTypes",
                          "specificTypes",
                          "singleDomain",
                          "multiDomain",
                          "small_per_rows",
                          "medium_per_rows",
                          "large_per_rows",
                          "small_per_cols",
                          "medium_per_cols",
                          "large_per_cols",
                        ].includes(header.id);

                        return (
                          <th
                            key={header.id}
                            className={`p-2 ${
                              isMetricColumn
                                ? "w-[80px]"
                                : header.id === "model"
                                ? "min-w-[180px]"
                                : "min-w-[80px]"
                            } text-center cursor-pointer hover:bg-opacity-80 ${
                              header.id === "model"
                                ? "text-left"
                                : "text-center"
                            }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <div className="flex items-center justify-center gap-1">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: " ↑",
                                desc: " ↓",
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody className="text-foreground">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={`p-2 min-w-20 ${
                            cell.column.id === "model"
                              ? "text-left"
                              : "text-center"
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

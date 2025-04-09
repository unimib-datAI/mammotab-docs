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
import { useState, useMemo, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";

// Define types for our data
type ModelData = {
  model: string;
  parameters: string;
  status: "To do" | "In progress" | "Done";
  system: string;
  total_time: string;
  accuracy: string;
  total_correct: string;
  ne_cells: string;
  cea: string;
  nils: string;
  acronyms: string;
  aliases: string;
  typos: string;
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
  annotatedCells: 84907
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
  
  if (accuracy >= 0.8) {
    bgColor = "bg-dorange";
  } else if (accuracy >= 0.6) {
    bgColor = "bg-brick";
  } else if (accuracy >= 0.4) {
    bgColor = "bg-bronze";
  } else {
    bgColor = "bg-grizzly";
  }
  
  return (
    <div className="flex items-center justify-center">
      <span className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-xs font-semibold`}>
        {accuracy.toFixed(2)}
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
      bgColor = "bg-brick";
      break;
    case "In progress":
      bgColor = "bg-dorange";
      break;
    case "Done":
      bgColor = "bg-chocolate";
      break;
  }
  
  return (
    <div className="flex justify-center items-center">
      <span className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-xs font-semibold w-24 text-center`}>
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
    cell: (info) => <span className="font-bold">{info.getValue()}</span>,
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
      const statusOrder: Record<ModelData["status"], number> = { "Done": 0, "In progress": 1, "To do": 2 };
      return statusOrder[rowA.getValue("status")] - statusOrder[rowB.getValue("status")];
    },
  }),
  columnHelper.accessor("system", {
    header: "System",
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
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("accuracy", {
    header: "Accuracy",
    cell: (info) => renderAccuracyCell(info.getValue()),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("total_correct", {
    header: "Total Correct",
    cell: (info) => renderSimpleCell(info.getValue()),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("nils", {
    header: "NILs",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.nils),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("acronyms", {
    header: "Acronyms",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.acronyms),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("typos", {
    header: "Typos",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.typos),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("aliases", {
    header: "Aliases",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.aliases),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("genericTypes", {
    header: "Generic Types",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.genericTypes),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("specificTypes", {
    header: "Specific Types",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.specificTypes),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("singleDomain", {
    header: "Single Domain",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.singleDomain),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("multiDomain", {
    header: "Multi Domain",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.multiDomain),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("small_per_cols", {
    header: "Small % Cols",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.smallPerCols),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("medium_per_cols", {
    header: "Medium % Cols",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.mediumPerCols),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("large_per_cols", {
    header: "Large % Cols",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.largePerCols),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("small_per_rows", {
    header: "Small % Rows",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.smallPerRows),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("medium_per_rows", {
    header: "Medium % Rows",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.mediumPerRows),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("large_per_rows", {
    header: "Large % Rows",
    cell: (info) => renderCellWithPercentage(info.getValue(), MAX_VALUES.largePerRows),
    sortingFn: "alphanumeric",
  })
];

const data = [
  {
    model: "Gemini-1.0 Pro",
    parameters: "1.8B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Gemini-1.5 Pro",
    parameters: "3.2B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Gemini-1.5 Flash",
    parameters: "2.5B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Gemma 2",
    parameters: "2B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Gemma 2",
    parameters: "9B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Phi-3 Mini",
    parameters: "3.8B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Phi-3 Small",
    parameters: "7B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Phi-3 Medium",
    parameters: "14B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Phi-3.5 Mini",
    parameters: "4.2B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Mixtral",
    parameters: "7B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Mixtral-Instruct",
    parameters: "8B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Claude 3 Sonnet",
    parameters: "7B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Claude 3 Haiku",
    parameters: "3.5B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Claude 3.5 Sonnet",
    parameters: "8.5B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Llama 3.2",
    parameters: "7B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Llama 3.1",
    parameters: "6.5B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Qwen 2",
    parameters: "7B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Qwen-2.5",
    parameters: "8B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Yi-1.5",
    parameters: "6B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
    total_correct: "",
    ne_cells: "",
    cea: "",
    nils: "",
    acronyms: "",
    aliases: "",
    typos: "",
    genericTypes: "",
    specificTypes: "",
    singleDomain: "",
    multiDomain: "",
    small_per_cols: "",
    medium_per_cols: "",
    large_per_cols: "",
    small_per_rows: "",
    medium_per_rows: "",
    large_per_rows: ""
  },
  {
    model: "Qwen 2",
    parameters: "0.5B",
    status: "Done",
    system: "NVIDIA RTX A6000",
    total_time: "52659.894",
    accuracy: "0.044",
    total_correct: "3741",
    ne_cells: "84907",
    cea: "",
    nils: "1103",
    acronyms: "6",
    aliases: "3",
    typos: "5",
    genericTypes: "2",
    specificTypes: "17",
    singleDomain: "5",
    multiDomain: "14",
    small_per_cols: "0",
    medium_per_cols: "15",
    large_per_cols: "4",
    small_per_rows: "17",
    medium_per_rows: "1",
    large_per_rows: "1"
  }
];

export default function Leaderboard(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  
  // Memoize initial state
  const initialSorting = useMemo<SortingState>(() => [
    {
      id: "status",
      desc: false,
    }
  ], []);

  const initialColumnVisibility = useMemo<Record<string, boolean>>(() => ({
    model: true,
    parameters: true,
    status: true,
    nils: true,
    acronyms: true,
    typos: true,
    aliases: true,
    genericTypes: true,
    specificTypes: true,
    singleDomain: true,
    multiDomain: true,
    small_per_cols: true,
    medium_per_cols: true,
    large_per_cols: true,
    small_per_rows: true,
    medium_per_rows: true,
    large_per_rows: true
  }), []);

  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(initialColumnVisibility);
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  // Memoize columns
  const columns = useMemo(() => createColumns(), []);

  const table = useReactTable({
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
    setShowColumnMenu(prev => !prev);
  }, []);

  return (
    <Layout title={`${siteConfig.title}`} description="MammoTab, is a dataset composed of 1M Wikipedia tables extracted from over 20M Wikipedia pages and annotated through Wikidata.">
      <main>
        <img
          src="/mammotab-docs/img/bblurrymam.svg"
          className="absolute opacity-10 -top-[45rem]"
        />

        <section id="tanstack-table-container" className="mx-auto relative z-10 p-8 w-full">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-dorange dark:text-terracotta">LLM Leaderboard</h1>
            <p className="text-stone-800 dark:text-stone-100 mt-2">Compare the performance of different language models on the MammoTab dataset</p>
            <p className="text-stone-600 dark:text-stone-300 mt-4 text-sm">
              This leaderboard has been <a href="/mammotab-docs/docs/leaderboard-instructions" className="text-dorange dark:text-terracotta hover:underline">generated</a> using the MammoTab sample dataset, which consists of 870 tables containing a total of 84,907 distinct mentions.
            </p>
            <div className="mt-6 p-4 bg-bronze/10 dark:bg-grizzly/10 rounded-lg border border-bronze/20 dark:border-grizzly/20">
              <p className="text-stone-800 dark:text-stone-100 font-semibold mb-2">This leaderboard is managed by:</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-stone-700 dark:text-stone-300">
                  <span className="font-medium">Marco Cremaschi</span>,{" "}
                  <span className="font-medium">Fabio D'adda</span>,{" "}
                  <span className="font-medium">Federico Belotti</span>,{" "}
                  <span className="font-medium">Matteo Palmonari</span>
                  <span className="text-stone-600 dark:text-stone-400"> from the University of Milano-Bicocca</span>
                </span>
                <span className="text-stone-700 dark:text-stone-300">
                  and <span className="font-medium"><a href="https://www.tib.eu/en/research-development/research-groups-and-labs/data-science-and-digital-libraries/staff/jennifer-dsouza">Jennifer D'Souza</a></span>
                  <span className="text-stone-600 dark:text-stone-400"> from TIB Leibniz Information Centre for Science and Technology</span>
                </span>
              </div>
            </div>
          </div>
          <div className="fixed top-20 right-4 z-50">
            <div className="relative">
              <button 
                className="px-4 py-2 bg-chocolate text-white rounded-lg hover:bg-opacity-90 flex items-center gap-2 transition-all duration-200"
                onClick={toggleColumnMenu}
              >
                {showColumnMenu ? <EyeOff size={18} /> : <Eye size={18} />}
                Show/Hide Columns
              </button>
              {showColumnMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-umber rounded-lg shadow-xl py-2 z-50 max-h-[400px] overflow-y-auto transition-all duration-200 ease-in-out transform opacity-100 scale-100">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Visible Columns</h3>
                  </div>
                  {table.getAllLeafColumns().map((column) => {
                    if (column.id === "model") return null; // Skip model column
                    return (
                      <div key={column.id} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={column.getIsVisible()}
                            onChange={column.getToggleVisibilityHandler()}
                            className="rounded text-chocolate focus:ring-chocolate h-4 w-4"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{column.columnDef.header as string}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg w-full" style={{ 
            maxWidth: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block'
          }}>
            <div style={{ minWidth: '2500px' }}>
              <table className="text-sm w-full rounded-lg overflow-hidden" style={{
                tableLayout: 'fixed',
                width: '100%',
                minWidth: '2500px'
              }}>
                <thead className="text-xs uppercase dark:bg-rocketmetallic bg-paletaupe">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        const isMetricColumn = [
                          'cea', 'nils', 'acronyms', 'aliases', 'typos', 
                          'genericTypes', 'specificTypes', 'singleDomain', 'multiDomain',
                          'small_per_rows', 'medium_per_rows', 'large_per_rows',
                          'small_per_cols', 'medium_per_cols', 'large_per_cols'
                        ].includes(header.id);
                        
                        return (
                          <th 
                            key={header.id} 
                            className={`p-3 ${isMetricColumn ? 'w-[100px]' : header.id === 'model' ? 'min-w-[200px]' : 'min-w-[100px]'} text-center cursor-pointer hover:bg-opacity-80 underline ${header.id === 'model' ? 'text-left' : 'text-center'}`}
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
                    <tr key={row.id} className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className={`p-3 min-w-24 ${cell.column.id === 'model' ? 'text-left' : 'text-center'}`}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

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
import { useState } from "react";

// Maximum values for percentage calculation
const MAX_VALUES = {
  nils: 100,
  acronyms: 70,
  aliases: 100,
  typos: 35,
  genericTypes: 50,
  specificTypes: 50,
  singleDomain: 100,
  multiDomain: 100,
  smallPerCols: 100,
  mediumPerCols: 100,
  largePerCols: 100,
  smallPerRows: 100,
  mediumPerRows: 100,
  largePerRows: 100,
  annotatedCells: 1500
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("model", {
    header: "Model",
    cell: (info) => <span className="font-bold">{info.getValue()}</span>,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("parameters", {
    header: "Parameters",
    cell: (info) => {
      const value = info.getValue();
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
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
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("system", {
    header: "System",
    cell: (info) => {
      const value = info.getValue();
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("total_time", {
    header: "Total Time",
    cell: (info) => {
      const value = info.getValue();
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("accuracy", {
    header: "Accuracy",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{parseFloat(value).toFixed(2)}</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("ne_cells", {
    header: "NE Cells",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      const percentage = Math.round((parseInt(value) / MAX_VALUES.annotatedCells) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("nils", {
    header: "NILs",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      const percentage = Math.round((parseInt(value) / MAX_VALUES.nils) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("acronyms", {
    header: "Acronyms",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      const percentage = Math.round((parseInt(value) / MAX_VALUES.acronyms) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("typos", {
    header: "Typos",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      const percentage = Math.round((parseInt(value) / MAX_VALUES.typos) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("aliases", {
    header: "Aliases",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      const percentage = Math.round((parseInt(value) / MAX_VALUES.aliases) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("genericTypes", {
    header: "Generic Types",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      const percentage = Math.round((parseInt(value) / MAX_VALUES.genericTypes) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("specificTypes", {
    header: "Specific Types",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      const percentage = Math.round((parseInt(value) / MAX_VALUES.specificTypes) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("singleDomain", {
    header: "Single Domain",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      const percentage = Math.round((parseInt(value) / MAX_VALUES.singleDomain) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("multiDomain", {
    header: "Multi Domain",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      const percentage = Math.round((parseInt(value) / MAX_VALUES.multiDomain) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("small_per_cols", {
    header: "Small % Cols",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      const percentage = Math.round((parseInt(value) / MAX_VALUES.smallPerCols) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("medium_per_cols", {
    header: "Medium % Cols",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "";
      const percentage = Math.round((parseInt(value) / MAX_VALUES.mediumPerCols) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("large_per_cols", {
    header: "Large % Cols",
    cell: (info) => {
      const value = parseInt(info.getValue());
      const percentage = Math.round((value / MAX_VALUES.largePerCols) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("small_per_rows", {
    header: "Small % Rows",
    cell: (info) => {
      const value = parseInt(info.getValue());
      const percentage = Math.round((value / MAX_VALUES.smallPerRows) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("medium_per_rows", {
    header: "Medium % Rows",
    cell: (info) => {
      const value = parseInt(info.getValue());
      const percentage = Math.round((value / MAX_VALUES.mediumPerRows) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("large_per_rows", {
    header: "Large % Rows",
    cell: (info) => {
      const value = parseInt(info.getValue());
      const percentage = Math.round((value / MAX_VALUES.largePerRows) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
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
    large_per_cols: "65",
    small_per_rows: "80",
    medium_per_rows: "70",
    large_per_rows: "60"
  },
  {
    model: "Gemini-1.5 Pro",
    parameters: "3.2B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "68",
    small_per_rows: "82",
    medium_per_rows: "72",
    large_per_rows: "62"
  },
  {
    model: "Gemini-1.5 Flash",
    parameters: "2.5B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "67",
    small_per_rows: "80",
    medium_per_rows: "70",
    large_per_rows: "60"
  },
  {
    model: "Gemma",
    parameters: "2B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "64",
    small_per_rows: "76",
    medium_per_rows: "66",
    large_per_rows: "56"
  },
  {
    model: "Gemma 2",
    parameters: "7B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "66",
    small_per_rows: "79",
    medium_per_rows: "69",
    large_per_rows: "59"
  },
  {
    model: "Phi-3 Mini",
    parameters: "3.8B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "63",
    small_per_rows: "75",
    medium_per_rows: "65",
    large_per_rows: "55"
  },
  {
    model: "Phi-3 Small",
    parameters: "7B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "64",
    small_per_rows: "76",
    medium_per_rows: "66",
    large_per_rows: "56"
  },
  {
    model: "Phi-3 Medium",
    parameters: "14B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "66",
    small_per_rows: "79",
    medium_per_rows: "69",
    large_per_rows: "59"
  },
  {
    model: "Phi-3.5 Mini",
    parameters: "4.2B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "65",
    small_per_rows: "77",
    medium_per_rows: "67",
    large_per_rows: "57"
  },
  {
    model: "Mixtral",
    parameters: "7B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "69",
    small_per_rows: "83",
    medium_per_rows: "73",
    large_per_rows: "63"
  },
  {
    model: "Mixtral-Instruct",
    parameters: "8B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "70",
    small_per_rows: "84",
    medium_per_rows: "74",
    large_per_rows: "64"
  },
  {
    model: "Claude 3 Sonnet",
    parameters: "7B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "71",
    small_per_rows: "85",
    medium_per_rows: "75",
    large_per_rows: "65"
  },
  {
    model: "Claude 3 Haiku",
    parameters: "3.5B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "69",
    small_per_rows: "83",
    medium_per_rows: "73",
    large_per_rows: "63"
  },
  {
    model: "Claude 3.5 Sonnet",
    parameters: "8.5B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "72",
    small_per_rows: "86",
    medium_per_rows: "76",
    large_per_rows: "66"
  },
  {
    model: "Llama 3.2",
    parameters: "7B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "68",
    small_per_rows: "82",
    medium_per_rows: "72",
    large_per_rows: "62"
  },
  {
    model: "Llama 3.1",
    parameters: "6.5B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "67",
    small_per_rows: "81",
    medium_per_rows: "71",
    large_per_rows: "61"
  },
  {
    model: "Qwen 2",
    parameters: "7B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "66",
    small_per_rows: "80",
    medium_per_rows: "70",
    large_per_rows: "60"
  },
  {
    model: "Qwen-2.5",
    parameters: "8B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "68",
    small_per_rows: "82",
    medium_per_rows: "72",
    large_per_rows: "62"
  },
  {
    model: "Yi-1.5",
    parameters: "6B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "65",
    small_per_rows: "78",
    medium_per_rows: "68",
    large_per_rows: "58"
  },
  {
    model: "Qwen 2",
    parameters: "0.5B",
    status: "To do",
    system: "",
    total_time: "",
    accuracy: "",
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
    large_per_cols: "62",
    small_per_rows: "74",
    medium_per_rows: "64",
    large_per_rows: "54"
  }
];

export default function Leaderboard(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
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
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);

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

  return (
    <Layout title={`${siteConfig.title}`} description="MammoTab, is a dataset composed of 1M Wikipedia tables extracted from over 20M Wikipedia pages and annotated through Wikidata.">
      <main>
        <img
          src="/mammotab-docs/img/bblurrymam.svg"
          className="absolute opacity-10 -top-[45rem]"
        />

        <section id="tanstack-table-container" className="mx-auto relative z-10 p-8 w-full max-w-[95vw]">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-dorange dark:text-terracotta">LLM Leaderboard</h1>
            <p className="text-stone-800 dark:text-stone-100 mt-2">Compare the performance of different language models on the MammoTab dataset</p>
            <p className="text-stone-600 dark:text-stone-300 mt-4 text-sm">
              This leaderboard has been <a href="/mammotab-docs/docs/leaderboard-instructions" className="text-dorange dark:text-terracotta hover:underline">generated</a> using the MammoTab sample dataset, which consists of 870 tables containing a total of 85,565 distinct mentions.
            </p>
          </div>
          <div className="mb-4 flex justify-end">
            <div className="relative">
              <button 
                className="px-4 py-2 bg-chocolate text-white rounded-lg hover:bg-opacity-90"
                onClick={() => setShowColumnMenu(!showColumnMenu)}
              >
                Show/Hide Columns
              </button>
              {showColumnMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-umber rounded-lg shadow-lg py-2 z-50">
                  {table.getAllLeafColumns().map((column) => {
                    if (column.id === "model") return null; // Skip model column
                    return (
                      <div key={column.id} className="px-4 py-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={column.getIsVisible()}
                            onChange={column.getToggleVisibilityHandler()}
                            className="rounded text-chocolate focus:ring-chocolate"
                          />
                          <span className="text-sm">{column.columnDef.header as string}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg w-full" style={{ 
            maxWidth: '100vw', 
            overflowX: 'auto',
            position: 'relative'
          }}>
            <div className="min-w-[1800px] mx-auto">
              <table className="text-sm w-full rounded-lg overflow-hidden">
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

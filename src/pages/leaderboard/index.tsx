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
  link: string;
  parameters: string;
  max_context: string;
  status: "To do" | "In progress" | "Done";
  system: string;
  total_time: string;
  accuracy: string;
  total_correct: string;
  out_context_prompt: string;
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
    bgColor = "bg-primary";
  } else if (accuracy >= 0.6) {
    bgColor = "bg-primary-dark";
  } else if (accuracy >= 0.4) {
    bgColor = "bg-primary-light";
  } else {
    bgColor = "bg-primary-darker";
  }
  
  return (
    <div className="flex items-center justify-center">
      <span className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-xs font-semibold`}>
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
  columnHelper.accessor("max_context", {
    header: "Max Context",
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
  columnHelper.accessor("out_context_prompt", {
    header: "Out Context Prompt",
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

const data: ModelData[] = [
  {
    model: "google/gemma-2-2b-it",
    link: "https://huggingface.co/google/gemma-2-2b-it",
    parameters: "2B",
    max_context: "8192",
    status: "Done" as const,
    system: "NVIDIA RTX A6000",
    total_time: "250822.537",
    accuracy: "0.407",
    total_correct: "34608",
    out_context_prompt: "142",
    ne_cells: "84907",
    cea: "",
    nils: "9545",
    acronyms: "2323",
    aliases: "4957",
    typos: "8168",
    genericTypes: "58",
    specificTypes: "529",
    singleDomain: "226",
    multiDomain: "361",
    small_per_cols: "69",
    medium_per_cols: "354",
    large_per_cols: "164",
    small_per_rows: "234",
    medium_per_rows: "185",
    large_per_rows: "168"
  },
  {
    model: "meta-llama/Llama-3.2-1B",
    link: "https://huggingface.co/meta-llama/Llama-3.2-1B",
    parameters: "1B",
    max_context: "131072",
    status: "Done" as const,
    system: "NVIDIA RTX A6000",
    total_time: "83214.818",
    accuracy: "0.048",
    total_correct: "4142",
    out_context_prompt: "0",
    ne_cells: "84907",
    cea: "",
    nils: "1625",
    acronyms: "30",
    aliases: "60",
    typos: "98",
    genericTypes: "4",
    specificTypes: "18",
    singleDomain: "7",
    multiDomain: "15",
    small_per_cols: "1",
    medium_per_cols: "13",
    large_per_cols: "8",
    small_per_rows: "17",
    medium_per_rows: "2",
    large_per_rows: "3"
  },
  {
    model: "meta-llama/Llama-3.2-3B",
    link: "https://huggingface.co/meta-llama/Llama-3.2-3B",
    parameters: "3B",
    max_context: "131072",
    status: "Done" as const,
    system: "NVIDIA RTX A6000",
    total_time: "211444.595",
    accuracy: "0.303",
    total_correct: "25771",
    out_context_prompt: "0",
    ne_cells: "84907",
    cea: "",
    nils: "7599",
    acronyms: "2171",
    aliases: "3692",
    typos: "7144",
    genericTypes: "43",
    specificTypes: "461",
    singleDomain: "205",
    multiDomain: "299",
    small_per_cols: "64",
    medium_per_cols: "317",
    large_per_cols: "123",
    small_per_rows: "177",
    medium_per_rows: "169",
    large_per_rows: "158"
  },
  {
    model: "microsoft/Phi-3-mini-4k-instruct",
    link: "https://huggingface.co/microsoft/Phi-3-mini-4k-instruct",
    parameters: "3.8B",
    max_context: "4096",
    status: "Done" as const,
    system: "NVIDIA RTX A6000",
    total_time: "369925.491",
    accuracy: "0.281",
    total_correct: "23881",
    out_context_prompt: "3944",
    ne_cells: "84907",
    cea: "",
    nils: "7045",
    acronyms: "2085",
    aliases: "3660",
    typos: "6871",
    genericTypes: "37",
    specificTypes: "482",
    singleDomain: "207",
    multiDomain: "312",
    small_per_cols: "58",
    medium_per_cols: "318",
    large_per_cols: "143",
    small_per_rows: "208",
    medium_per_rows: "166",
    large_per_rows: "145"
  },
  {
    model: "Qwen/Qwen2-0.5B",
    link: "https://huggingface.co/Qwen/Qwen2-0.5B",
    parameters: "0.5B",
    max_context: "131072",
    status: "Done" as const,
    system: "NVIDIA RTX A6000",
    total_time: "52659.894",
    accuracy: "0.044",
    total_correct: "3741",
    out_context_prompt: "0",
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
  },
  {
    model: "Qwen/Qwen2-1.5B",
    link: "https://huggingface.co/Qwen/Qwen2-1.5B",
    parameters: "1.5B",
    max_context: "131072",
    status: "Done" as const,
    system: "NVIDIA RTX A6000",
    total_time: "98496.646",
    accuracy: "0.166",
    total_correct: "14124",
    out_context_prompt: "0",
    ne_cells: "84907",
    cea: "",
    nils: "4491",
    acronyms: "1429",
    aliases: "1691",
    typos: "4468",
    genericTypes: "23",
    specificTypes: "285",
    singleDomain: "147",
    multiDomain: "161",
    small_per_cols: "42",
    medium_per_cols: "209",
    large_per_cols: "57",
    small_per_rows: "90",
    medium_per_rows: "110",
    large_per_rows: "108"
  },
  {
    model: "01-ai/Yi-1.5-6B",
    link: "https://huggingface.co/01-ai/Yi-1.5-6B",
    parameters: "6B",
    max_context: "4096",
    status: "Done" as const,
    system: "NVIDIA RTX A6000",
    total_time: "187070.847",
    accuracy: "0.068",
    total_correct: "5832",
    out_context_prompt: "3543",
    ne_cells: "84907",
    cea: "",
    nils: "1626",
    acronyms: "545",
    aliases: "370",
    typos: "756",
    genericTypes: "6",
    specificTypes: "71",
    singleDomain: "31",
    multiDomain: "46",
    small_per_cols: "1",
    medium_per_cols: "51",
    large_per_cols: "25",
    small_per_rows: "39",
    medium_per_rows: "24",
    large_per_rows: "14"
  },
  {
    model: "Qwen/Qwen2.5-0.5B",
    link: "https://huggingface.co/Qwen/Qwen2.5-0.5B",
    parameters: "0.5B",
    max_context: "32768",
    status: "Done",
    system: "NVIDIA RTX A6000",
    total_time: "51666.95",
    accuracy: "0.015",
    total_correct: "1329",
    out_context_prompt: "0",
    ne_cells: "84907",
    cea: "",
    nils: "452",
    acronyms: "0",
    aliases: "0",
    typos: "1",
    genericTypes: "0",
    specificTypes: "2",
    singleDomain: "1",
    multiDomain: "1",
    small_per_cols: "0",
    medium_per_cols: "2",
    large_per_cols: "0",
    small_per_rows: "1",
    medium_per_rows: "1",
    large_per_rows: "0"
  },
  {
    model: "Qwen/Qwen2.5-7B",
    link: "https://huggingface.co/Qwen/Qwen2.5-7B",
    parameters: "7B",
    max_context: "131072",
    status: "Done",
    system: "NVIDIA RTX A6000",
    total_time: "172776.68",
    accuracy: "0.51",
    total_correct: "43321",
    out_context_prompt: "0",
    ne_cells: "84907",
    cea: "",
    nils: "12705",
    acronyms: "2568",
    aliases: "6101",
    typos: "9314",
    genericTypes: "74",
    specificTypes: "607",
    singleDomain: "265",
    multiDomain: "416",
    small_per_cols: "76",
    medium_per_cols: "383",
    large_per_cols: "222",
    small_per_rows: "298",
    medium_per_rows: "198",
    large_per_rows: "185"
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
    setShowColumnMenu(prev => !prev);
  }, []);

  return (
    <Layout title={`${siteConfig.title}`} description="MammoTab, is a dataset composed of 1M Wikipedia tables extracted from over 20M Wikipedia pages and annotated through Wikidata.">
      <main className="flex flex-col min-h-[calc(100vh-4rem)]">
        <img
          src="/mammotab-docs/img/bblurrymam.svg"
          className="absolute opacity-10 -top-[45rem]"
        />

        <section id="tanstack-table-container" className="mx-auto relative z-10 p-8 w-full flex-1">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary dark:text-primary-light">LLM Leaderboard</h1>
            <p className="text-stone-800 dark:text-stone-100 mt-2">Compare the performance of different language models on the MammoTab dataset</p>
            <p className="text-stone-600 dark:text-stone-300 mt-4 text-sm">
              This leaderboard has been <a href="/mammotab-docs/docs/leaderboard-instructions" className="text-primary dark:text-primary-light hover:underline">generated</a> using the MammoTab sample dataset, which consists of 870 tables containing a total of 84,907 distinct mentions.
            </p>
            <div className="mt-6 p-4 bg-primary-light/10 dark:bg-primary-darker/10 rounded-lg border border-primary-light/20 dark:border-primary-darker/20">
              <p className="text-stone-800 dark:text-stone-100 font-semibold mb-2">This leaderboard is managed by:</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-stone-700 dark:text-stone-300">
                  <span className="font-medium">Marco Cremaschi</span>,{" "}
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
                className="px-4 py-2 bg-primary-darkest text-white rounded-lg hover:bg-opacity-90 flex items-center gap-2 transition-all duration-200"
                onClick={toggleColumnMenu}
              >
                {showColumnMenu ? <EyeOff size={18} /> : <Eye size={18} />}
                Show/Hide Columns
              </button>
              {showColumnMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-umber rounded-lg shadow-xl py-2 z-50 max-h-[400px] overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Visible Columns</h3>
                  </div>
                  {table.getAllLeafColumns().map((column) => {
                    if (column.id === "model") return null;
                    return (
                      <div key={column.id} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={column.getIsVisible()}
                            onChange={column.getToggleVisibilityHandler()}
                            className="rounded text-primary-darkest focus:ring-primary-darkest h-4 w-4"
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

          <div className="overflow-x-auto rounded-lg w-full border border-gray-200 dark:border-gray-700">
            <div className="min-w-[2500px]">
              <table className="text-sm w-full rounded-lg overflow-hidden">
                <thead className="text-xs uppercase dark:bg-rocketmetallic bg-paletaupe sticky top-0 z-10">
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
                            className={`p-3 ${isMetricColumn ? 'w-[100px]' : header.id === 'model' ? 'min-w-[200px]' : 'min-w-[100px]'} text-center cursor-pointer hover:bg-opacity-80 ${header.id === 'model' ? 'text-left' : 'text-center'}`}
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
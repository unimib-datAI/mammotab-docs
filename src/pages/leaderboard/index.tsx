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
import leaderboardData from "./model-data.json";

// Define types for our data
type ModelData = {
  model: string;
  link: string;
  parameters: string;
  status: "To do" | "In progress" | "Done" | "Unusable results";
  priority?: "High" | "Medium" | "Low";
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

const renderPriorityCell = (priority?: ModelData["priority"]) => {
  if (!priority) return "";

  const styleMap: Record<NonNullable<ModelData["priority"]>, string> = {
    High: "bg-red-600 text-stone-100",
    Medium: "bg-amber-500 text-stone-100",
    Low: "bg-sky-600 text-stone-100",
  };

  return (
    <div className="flex justify-center items-center">
      <span
        className={`${styleMap[priority]} px-3 py-1 rounded-full text-xs font-semibold w-20 text-center`}
      >
        {priority}
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
      const statusA = rowA.getValue("status") as ModelData["status"];
      const statusB = rowB.getValue("status") as ModelData["status"];
      return statusOrder[statusA] - statusOrder[statusB];
    },
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: (info) => renderPriorityCell(info.getValue()),
    sortingFn: (rowA, rowB) => {
      const priorityOrder: Record<NonNullable<ModelData["priority"]>, number> =
        {
          High: 0,
          Medium: 1,
          Low: 2,
        };

      const priorityA = rowA.getValue("priority") as ModelData["priority"];
      const priorityB = rowB.getValue("priority") as ModelData["priority"];
      const rankA = priorityA ? priorityOrder[priorityA] : 99;
      const rankB = priorityB ? priorityOrder[priorityB] : 99;
      return rankA - rankB;
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

const data: ModelData[] = leaderboardData as ModelData[];

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
    [],
  );

  const initialColumnVisibility = useMemo<Record<string, boolean>>(
    () => ({
      model: true,
      parameters: true,
      status: true,
      priority: true,
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
    [],
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
                                header.getContext(),
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
                            cell.getContext(),
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

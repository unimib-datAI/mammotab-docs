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
  accuracy: 1.0,
  annotatedCells: 1500,
  neColumns: 60,
  lColumns: 45,
  nils: 100,
  acronyms: 70,
  aliases: 100,
  typos: 35
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
  columnHelper.accessor("accuracy", {
    header: "Accuracy",
    cell: (info) => {
      const value = parseFloat(info.getValue());
      const percentage = Math.round((value / MAX_VALUES.accuracy) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("annotatedCells", {
    header: "Annotated Cells",
    cell: (info) => {
      const value = parseInt(info.getValue().replace(/,/g, ''));
      const percentage = Math.round((value / MAX_VALUES.annotatedCells) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{info.getValue()}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("neColumns", {
    header: "NE-columns",
    cell: (info) => {
      const value = parseInt(info.getValue());
      const percentage = Math.round((value / MAX_VALUES.neColumns) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("lColumns", {
    header: "L-columns",
    cell: (info) => {
      const value = parseInt(info.getValue());
      const percentage = Math.round((value / MAX_VALUES.lColumns) * 100);
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
      const value = parseInt(info.getValue());
      const percentage = Math.round((value / MAX_VALUES.nils) * 100);
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
      const value = parseInt(info.getValue());
      const percentage = Math.round((value / MAX_VALUES.acronyms) * 100);
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
      const value = parseInt(info.getValue());
      const percentage = Math.round((value / MAX_VALUES.aliases) * 100);
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
      const value = parseInt(info.getValue());
      const percentage = Math.round((value / MAX_VALUES.typos) * 100);
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          <span className="text-xs text-gray-400">[{percentage}%]</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  }),
];

const data = [
  {
    model: "Gemini-1.0 Pro",
    parameters: "1.8B",
    status: "To do",
    accuracy: "0.85",
    annotatedCells: "1,100",
    neColumns: "45",
    lColumns: "32",
    nils: "78",
    acronyms: "56",
    aliases: "89",
    typos: "23"
  },
  {
    model: "Gemini-1.5 Pro",
    parameters: "3.2B",
    status: "In progress",
    accuracy: "0.88", 
    annotatedCells: "1,150",
    neColumns: "48",
    lColumns: "35",
    nils: "82",
    acronyms: "59",
    aliases: "92",
    typos: "25"
  },
  {
    model: "Gemini-1.5 Flash",
    parameters: "2.5B",
    status: "Done",
    accuracy: "0.87",
    annotatedCells: "1,120",
    neColumns: "47",
    lColumns: "34",
    nils: "80",
    acronyms: "58",
    aliases: "91",
    typos: "24"
  },
  {
    model: "Gemma",
    parameters: "2B",
    status: "To do",
    accuracy: "0.84",
    annotatedCells: "1,050",
    neColumns: "44",
    lColumns: "31",
    nils: "76",
    acronyms: "55",
    aliases: "88",
    typos: "22"
  },
  {
    model: "Gemma 2",
    parameters: "7B",
    status: "In progress",
    accuracy: "0.86",
    annotatedCells: "1,080",
    neColumns: "46",
    lColumns: "33",
    nils: "79",
    acronyms: "57",
    aliases: "90",
    typos: "23"
  },
  {
    model: "Phi-3 Mini",
    parameters: "3.8B",
    status: "To do",
    accuracy: "0.83",
    annotatedCells: "1,020",
    neColumns: "43",
    lColumns: "30",
    nils: "75",
    acronyms: "54",
    aliases: "87",
    typos: "21"
  },
  {
    model: "Phi-3 Small",
    parameters: "7B",
    status: "In progress",
    accuracy: "0.85",
    annotatedCells: "1,040",
    neColumns: "44",
    lColumns: "31",
    nils: "76",
    acronyms: "55",
    aliases: "88",
    typos: "22"
  },
  {
    model: "Phi-3 Medium",
    parameters: "14B",
    status: "Done",
    accuracy: "0.87",
    annotatedCells: "1,060",
    neColumns: "46",
    lColumns: "33",
    nils: "79",
    acronyms: "57",
    aliases: "90",
    typos: "23"
  },
  {
    model: "Phi-3.5 Mini",
    parameters: "4.2B",
    status: "To do",
    accuracy: "0.84",
    annotatedCells: "1,030",
    neColumns: "44",
    lColumns: "31",
    nils: "77",
    acronyms: "56",
    aliases: "89",
    typos: "22"
  },
  {
    model: "Mixtral",
    parameters: "7B",
    status: "In progress",
    accuracy: "0.89",
    annotatedCells: "1,180",
    neColumns: "49",
    lColumns: "36",
    nils: "83",
    acronyms: "60",
    aliases: "93",
    typos: "26"
  },
  {
    model: "Mixtral-Instruct",
    parameters: "8B",
    status: "Done",
    accuracy: "0.90",
    annotatedCells: "1,200",
    neColumns: "50",
    lColumns: "37",
    nils: "84",
    acronyms: "61",
    aliases: "94",
    typos: "27"
  },
  {
    model: "Claude 3 Sonnet",
    parameters: "7B",
    status: "In progress",
    accuracy: "0.91",
    annotatedCells: "1,220",
    neColumns: "51",
    lColumns: "38",
    nils: "85",
    acronyms: "62",
    aliases: "95",
    typos: "28"
  },
  {
    model: "Claude 3 Haiku",
    parameters: "3.5B",
    status: "To do",
    accuracy: "0.89",
    annotatedCells: "1,190",
    neColumns: "49",
    lColumns: "36",
    nils: "83",
    acronyms: "60",
    aliases: "93",
    typos: "26"
  },
  {
    model: "Claude 3.5 Sonnet",
    parameters: "8.5B",
    status: "Done",
    accuracy: "0.92",
    annotatedCells: "1,240",
    neColumns: "52",
    lColumns: "39",
    nils: "86",
    acronyms: "63",
    aliases: "96",
    typos: "29"
  },
  {
    model: "Llama 3.2",
    parameters: "7B",
    status: "In progress",
    accuracy: "0.88",
    annotatedCells: "1,160",
    neColumns: "48",
    lColumns: "35",
    nils: "82",
    acronyms: "59",
    aliases: "92",
    typos: "25"
  },
  {
    model: "Llama 3.1",
    parameters: "6.5B",
    status: "To do",
    accuracy: "0.87",
    annotatedCells: "1,140",
    neColumns: "47",
    lColumns: "34",
    nils: "81",
    acronyms: "58",
    aliases: "91",
    typos: "24"
  },
  {
    model: "Qwen 2",
    parameters: "7B",
    status: "In progress",
    accuracy: "0.86",
    annotatedCells: "1,120",
    neColumns: "46",
    lColumns: "33",
    nils: "80",
    acronyms: "57",
    aliases: "90",
    typos: "23"
  },
  {
    model: "Qwen-2.5",
    parameters: "8B",
    status: "Done",
    accuracy: "0.88",
    annotatedCells: "1,170",
    neColumns: "48",
    lColumns: "35",
    nils: "82",
    acronyms: "59",
    aliases: "92",
    typos: "25"
  },
  {
    model: "Yi-1.5",
    parameters: "6B",
    status: "To do",
    accuracy: "0.85",
    annotatedCells: "1,110",
    neColumns: "45",
    lColumns: "32",
    nils: "78",
    acronyms: "56",
    aliases: "89",
    typos: "23"
  }
];

export default function Leaderboard(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
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
    <Layout title={`Hello from ${siteConfig.title}`} description="MammoTab, is a dataset composed of 1M Wikipedia tables extracted from over 20M Wikipedia pages and annotated through Wikidata.">
      <main>
        <img
          src="/mammotab-docs/img/bblurrymam.svg"
          className="absolute opacity-10 -top-[45rem]"
        />

        <section id="tanstack-table-container" className="mx-auto relative z-10 p-8 w-full">
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

          <div className="overflow-x-auto rounded-lg w-full">
            <div className="min-w-[1200px]">
              <table className="text-sm w-full rounded-lg">
                <thead className="text-xs uppercase dark:bg-rocketmetallic bg-paletaupe">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th 
                          key={header.id} 
                          className={`p-3 min-w-40 text-center cursor-pointer hover:bg-opacity-80 underline ${header.id === 'model' ? 'text-left' : 'text-center'}`}
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
                      ))}
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

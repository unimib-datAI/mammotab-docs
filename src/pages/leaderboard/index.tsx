import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("model", {
    header: "Model",
    cell: (info) => info.getValue(),
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
          <span className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-xs font-semibold`}>
            {status}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor("accuracy", {
    header: "Accuracy",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("annotatedCells", {
    header: "Annotated Cells",
    cell: (info) => info.getValue(),
  }),
];

const data = [
  {
    model: "Gemini-1.0 Pro",
    status: "To do",
    accuracy: "0.85",
    annotatedCells: "1,100",
  },
  {
    model: "Gemini-1.5 Pro",
    status: "In progress",
    accuracy: "0.88", 
    annotatedCells: "1,150",
  },
  {
    model: "Gemini-1.5 Flash",
    status: "Done",
    accuracy: "0.87",
    annotatedCells: "1,120",
  },
  {
    model: "Gemma",
    status: "To do",
    accuracy: "0.84",
    annotatedCells: "1,050",
  },
  {
    model: "Gemma",
    status: "To do",
    accuracy: "0.84",
    annotatedCells: "1,050",
  },
  {
    model: "Gemma 2",
    status: "In progress",
    accuracy: "0.86",
    annotatedCells: "1,080",
  },
  {
    model: "Gemma 2",
    status: "In progress",
    accuracy: "0.86",
    annotatedCells: "1,080",
  },
  {
    model: "Gemma 2",
    status: "In progress",
    accuracy: "0.86",
    annotatedCells: "1,080",
  },
  {
    model: "Phi-3 Mini",
    status: "To do",
    accuracy: "0.83",
    annotatedCells: "1,020",
  },
  {
    model: "Phi-3 Mini",
    status: "To do",
    accuracy: "0.83",
    annotatedCells: "1,020",
  },
  {
    model: "Phi-3 Small",
    status: "In progress",
    accuracy: "0.85",
    annotatedCells: "1,040",
  },
  {
    model: "Phi-3 Small",
    status: "In progress",
    accuracy: "0.85",
    annotatedCells: "1,040",
  },
  {
    model: "Phi-3 Medium",
    status: "Done",
    accuracy: "0.87",
    annotatedCells: "1,060",
  },
  {
    model: "Phi-3 Medium",
    status: "Done",
    accuracy: "0.87",
    annotatedCells: "1,060",
  },
  {
    model: "Phi-3.5 Mini",
    status: "To do",
    accuracy: "0.84",
    annotatedCells: "1,030",
  },
  {
    model: "Mixtral",
    status: "In progress",
    accuracy: "0.89",
    annotatedCells: "1,180",
  },
  {
    model: "Mixtral",
    status: "In progress",
    accuracy: "0.89",
    annotatedCells: "1,180",
  },
  {
    model: "Mixtral-Instruct",
    status: "Done",
    accuracy: "0.90",
    annotatedCells: "1,200",
  },
  {
    model: "Mixtral-Instruct",
    status: "Done",
    accuracy: "0.90",
    annotatedCells: "1,200",
  },
  {
    model: "Claude 3 Sonnet",
    status: "In progress",
    accuracy: "0.91",
    annotatedCells: "1,220",
  },
  {
    model: "Claude 3 Haiku",
    status: "To do",
    accuracy: "0.89",
    annotatedCells: "1,190",
  },
  {
    model: "Claude 3.5 Sonnet",
    status: "Done",
    accuracy: "0.92",
    annotatedCells: "1,240",
  },
  {
    model: "Llama 3.2",
    status: "In progress",
    accuracy: "0.88",
    annotatedCells: "1,160",
  },
  {
    model: "Llama 3.2",
    status: "In progress",
    accuracy: "0.88",
    annotatedCells: "1,160",
  },
  {
    model: "Llama 3.1",
    status: "To do",
    accuracy: "0.87",
    annotatedCells: "1,140",
  },
  {
    model: "Llama 3.1",
    status: "To do",
    accuracy: "0.87",
    annotatedCells: "1,140",
  },
  {
    model: "Llama 3.1",
    status: "To do",
    accuracy: "0.87",
    annotatedCells: "1,140",
  },
  {
    model: "Qwen 2",
    status: "In progress",
    accuracy: "0.86",
    annotatedCells: "1,120",
  },
  {
    model: "Qwen 2",
    status: "In progress",
    accuracy: "0.86",
    annotatedCells: "1,120",
  },
  {
    model: "Qwen 2",
    status: "In progress",
    accuracy: "0.86",
    annotatedCells: "1,120",
  },
  {
    model: "Qwen-2.5",
    status: "Done",
    accuracy: "0.88",
    annotatedCells: "1,170",
  },
  {
    model: "Qwen-2.5",
    status: "Done",
    accuracy: "0.88",
    annotatedCells: "1,170",
  },
  {
    model: "Qwen-2.5",
    status: "Done",
    accuracy: "0.88",
    annotatedCells: "1,170",
  },
  {
    model: "Qwen-2.5",
    status: "Done",
    accuracy: "0.88",
    annotatedCells: "1,170",
  },
  {
    model: "Qwen-2.5",
    status: "Done",
    accuracy: "0.88",
    annotatedCells: "1,170",
  },
  {
    model: "Yi-1.5",
    status: "To do",
    accuracy: "0.85",
    annotatedCells: "1,110",
  },
  {
    model: "Yi-1.5",
    status: "To do",
    accuracy: "0.85",
    annotatedCells: "1,110",
  },
  {
    model: "Yi-1.5",
    status: "To do",
    accuracy: "0.85",
    annotatedCells: "1,110",
  },
];

export default function Leaderboard(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="MammoTab, is a dataset composed of 1M Wikipedia tables extracted from over 20M Wikipedia pages and annotated through Wikidata.">
      <main>
        <img
          src="/mammotab-docs/img/bblurrymam.svg"
          className="absolute opacity-10 -top-[45rem]"
        />

        <section id="tanstack-table-container" className="mx-auto max-w-6xl relative z-10 p-8">
          <div className="overflow-x-auto rounded-lg">
            <table className="text-sm w-full rounded-lg">
              <thead className="text-xs uppercase dark:bg-rocketmetallic bg-paletaupe">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="p-3 min-w-40">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="text-foreground">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3 min-w-24">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </Layout>
  );
}

import Layout from "@theme/Layout";

export default function SemTab(): JSX.Element {
  return (
    <Layout
      title="SemTab 2025 – MammoTab Track"
      description="SemTab 2025 MammoTab track highlights and leaderboard."
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
              SemTab Challenge
            </h1>
            <p className="text-stone-800 dark:text-stone-100 mt-2">
              MammoTab is a large-scale benchmark designed to provide realistic
              and complex scenarios, including tables affected by typical
              challenges of web and Wikipedia data.
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
            <p className="text-stone-800 dark:text-stone-100 mt-4">
              Only approaches based on Large Language Models are allowed, either:
            </p>
            <ul className="text-stone-800 dark:text-stone-100 mt-2 ml-6 list-disc">
              <li>in fine-tuning settings, or</li>
              <li>using Retrieval-Augmented Generation strategies.</li>
            </ul>
            <p className="text-stone-800 dark:text-stone-100 mt-4">
              The evaluation will focus on the{" "}
              <strong>Cell Entity Annotation (CEA)</strong> task using the{" "}
              <a
                href="https://drive.google.com/file/d/1jxj8Z9WNtAtho7QJHxXQicgOW4Q1NHmu/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="text-primary dark:text-primary-light hover:underline font-semibold"
              >
                Wikidata KG (v. 20240720)
              </a>
              , but will also take
              into account the ability of the proposed approaches to effectively
              deal with the following key challenges
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col gap-2">
                <span
                  className="inline-block px-3 py-1 rounded-md border text-sm font-semibold"
                  style={{
                    backgroundColor: "hsla(217, 91%, 60%, 0.15)",
                    borderColor: "hsla(217, 91%, 60%, 0.3)",
                    color: "hsl(217, 91%, 80%)",
                  }}
                >
                  Disambiguation
                </span>
                <span className="text-stone-700 dark:text-stone-300 text-sm">
                  Correctly linking ambiguous mentions to the intended entities.
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className="inline-block px-3 py-1 rounded-md border text-sm font-semibold"
                  style={{
                    backgroundColor: "hsla(247, 91%, 60%, 0.15)",
                    borderColor: "hsla(247, 91%, 60%, 0.3)",
                    color: "hsl(247, 91%, 80%)",
                  }}
                >
                  Homonymy
                </span>
                <span className="text-stone-700 dark:text-stone-300 text-sm">
                  Managing mentions referring to entities with identical or very
                  similar names.
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className="inline-block px-3 py-1 rounded-md border text-sm font-semibold"
                  style={{
                    backgroundColor: "hsla(277, 91%, 60%, 0.15)",
                    borderColor: "hsla(277, 91%, 60%, 0.3)",
                    color: "hsl(277, 91%, 80%)",
                  }}
                >
                  Alias resolution
                </span>
                <span className="text-stone-700 dark:text-stone-300 text-sm">
                  Recognising entities referred by alternative names, acronyms,
                  or nicknames.
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className="inline-block px-3 py-1 rounded-md border text-sm font-semibold"
                  style={{
                    backgroundColor: "hsla(307, 91%, 60%, 0.15)",
                    borderColor: "hsla(307, 91%, 60%, 0.3)",
                    color: "hsl(307, 91%, 80%)",
                  }}
                >
                  NIL Detection
                </span>
                <span className="text-stone-700 dark:text-stone-300 text-sm">
                  Correctly identifying mentions that do not correspond to any
                  entity in the Knowledge Graph.
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className="inline-block px-3 py-1 rounded-md border text-sm font-semibold"
                  style={{
                    backgroundColor: "hsla(7, 91%, 60%, 0.15)",
                    borderColor: "hsla(7, 91%, 60%, 0.3)",
                    color: "hsl(7, 91%, 80%)",
                  }}
                >
                  Noise Robustness
                </span>
                <span className="text-stone-700 dark:text-stone-300 text-sm">
                  Dealing with incomplete, noisy, or imprecise table contexts.
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className="inline-block px-3 py-1 rounded-md border text-sm font-semibold"
                  style={{
                    backgroundColor: "hsla(37, 91%, 60%, 0.15)",
                    borderColor: "hsla(37, 91%, 60%, 0.3)",
                    color: "hsl(37, 91%, 80%)",
                  }}
                >
                  Collective Inference
                </span>
                <span className="text-stone-700 dark:text-stone-300 text-sm">
                  Leveraging inter-cell and inter-column signals to improve the
                  consistency of annotations.
                </span>
              </div>
            </div>
            <p className="text-stone-800 dark:text-stone-100 mt-6">
              Participants are expected to demonstrate not only strong CEA
              performance, but also robustness and versatility across all these
              dimensions, which are critical for real-world table interpretation
              scenarios.
            </p>
          </div>
          <div className="mt-6 p-4 bg-primary-light/10 dark:bg-primary-darker/10 rounded-lg border border-primary-light/20 dark:border-primary-darker/20">
            <p className="text-stone-800 dark:text-stone-100 font-semibold mb-2">
              This challenge is managed by:
            </p>
            <div className="flex flex-wrap gap-2 text-stone-700 dark:text-stone-300">
              <span>
                <span className="font-medium">Marco Cremaschi</span>,{" "}
                <span className="font-medium">Fabio D&apos;Adda</span>
                <span className="text-stone-600 dark:text-stone-400">
                  {" "}
                  from the University of Milano-Bicocca,
                </span>
              </span>
              <span>
                <span className="font-medium">Ernesto Jimenez-Ruiz</span>
                <span className="text-stone-600 dark:text-stone-400">
                  {" "}
                  from City St George&apos;s, University of London
                </span>
              </span>
              <span>
                and{" "}
                <span className="font-medium">Oktie Hassanzadeh</span>
                <span className="text-stone-600 dark:text-stone-400">
                  {" "}
                  from IBM Research
                </span>
              </span>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-stone-800 dark:text-white">
                Datasets&apos; Structure
              </h3>
              <p className="text-stone-800 dark:text-stone-100 mt-2">
                The test set is not included in the dataset in order to preserve
                the impartiality of the final evaluation and to discourage
                ad-hoc solutions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-stone-800 dark:text-white">
                Targets Format
              </h3>
              <p className="text-stone-800 dark:text-stone-100 mt-2">
                <span className="font-semibold">CEA task</span>
                <br />
                filename, row id (0-indexed), column id (0-indexed), entity id
                <br />
                <br />
                <code className="bg-gray-800 dark:bg-gray-900 p-4 rounded-lg block font-mono text-sm text-gray-100">
                  Annotation:
                  <br />
                  LYQZQ0T5,1,1,Q3576864
                  <br />
                  <br />
                  Table LYQZQ0T5: <br />
                  col0,col1,col2
                  <br />
                  1976,Eat My Dust!,Charles Byron Griffith
                  <br />
                  1976,Hollywood Boulevard,Joe Dante
                  <br />
                  1976,Hollywood Boulevard,Allan Arkush
                  <br />
                  1977,Grand Theft Auto,Ron Howard
                </code>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-stone-800 dark:text-white">
                Evaluation Criteria
              </h3>
              <p className="text-stone-800 dark:text-stone-100 mt-2">
                Precision, Recall and F1 Score are calculated:
              </p>
              <div className="my-4">
                <p className="text-stone-800 dark:text-stone-100">
                  {"$$ Precision = \\frac{\\#correct\\_annotations}{\\#submitted\\_annotations} $$"}
                </p>
              </div>
              <div className="my-4">
                <p className="text-stone-800 dark:text-stone-100">
                  {"$$ Recall = \\frac{\\#correct\\_annotations}{\\#ground\\_truth\\_annotations} $$"}
                </p>
              </div>
              <div className="my-4">
                <p className="text-stone-800 dark:text-stone-100">
                  {"$$ F_1 = \\frac{2 \\times Precision \\times Recall}{Precision + Recall} $$"}
                </p>
              </div>
              <p className="text-stone-800 dark:text-stone-100 mt-4">Notes:</p>
              <ul className="list-disc ml-5 mb-4 text-stone-800 dark:text-stone-100">
                <li>{"\\(\\#\\) denotes the number."}</li>
                <li>
                  {"\\(F_1\\) is used as the primary score, and \\(Precision\\) is used as the secondary score."}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-stone-800 dark:text-white">
                Submission
              </h3>
              <p className="text-stone-800 dark:text-stone-100 mt-2">
                Are you ready? Then, submit the annotations via{" "}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd7KVfTi9GrSqUsJTIvrerEDqkVG9A_cSxNoLGnqs-6B1ehxw/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary dark:text-primary-light hover:underline"
                >
                  Google Form
                </a>
              </p>
              <div className="flex justify-center mt-8">
                <a
                  href="https://drive.google.com/file/d/1_mWC4UEtj0zsbuxcPs2ovihwKZoSrXMa/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary dark:bg-primary-light text-white font-medium rounded-lg hover:opacity-90 transition-all"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg w-full border border-gray-200 dark:border-gray-700 mt-8">
            <div className="min-w-[800px]">
              <table className="text-sm w-full rounded-lg overflow-hidden">
                <thead className="text-xs uppercase dark:bg-rocketmetallic bg-paletaupe sticky top-0 z-10">
                  <tr>
                    <th className="p-4 min-w-[180px] text-left cursor-pointer hover:bg-opacity-80">
                      Model
                    </th>
                    <th className="p-4 min-w-[80px] text-center cursor-pointer hover:bg-opacity-80">
                      Precision
                    </th>
                    <th className="p-4 min-w-[80px] text-center cursor-pointer hover:bg-opacity-80">
                      Recall
                    </th>
                    <th className="p-4 min-w-[80px] text-center cursor-pointer hover:bg-opacity-80">
                      F1 Score
                    </th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                    <td className="py-4 px-4 min-w-20 text-left font-bold">ADFr</td>
                    <td className="py-4 px-4 min-w-20 text-center font-mono">0.758</td>
                    <td className="py-4 px-4 min-w-20 text-center font-mono">0.758</td>
                    <td className="py-4 px-4 min-w-20 text-center font-mono font-bold text-primary">
                      0.758
                    </td>
                  </tr>
                  <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                    <td className="py-4 px-4 min-w-20 text-left font-bold">RAGDify</td>
                    <td className="py-4 px-4 min-w-20 text-center font-mono">0.603</td>
                    <td className="py-4 px-4 min-w-20 text-center font-mono">0.603</td>
                    <td className="py-4 px-4 min-w-20 text-center font-mono">0.603</td>
                  </tr>
                  <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                    <td className="py-4 px-4 min-w-20 text-left font-bold">ditlab</td>
                    <td className="py-4 px-4 min-w-20 text-center font-mono">0.549</td>
                    <td className="py-4 px-4 min-w-20 text-center font-mono">0.549</td>
                    <td className="py-4 px-4 min-w-20 text-center font-mono">0.549</td>
                  </tr>
                  <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                    <td className="py-4 px-4 min-w-20 text-left font-bold">Kepler-aSI</td>
                    <td className="py-4 px-4 min-w-20 text-center font-mono">0.403</td>
                    <td className="py-4 px-4 min-w-20 text-center font-mono">0.157</td>
                    <td className="py-4 px-4 min-w-20 text-center font-mono">0.226</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}


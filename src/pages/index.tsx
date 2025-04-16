import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.css";
import { Check, ArrowRight, ArrowDownToLine, Github } from "lucide-react";

import { Tooltip } from "flowbite-react";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="MammoTab, is a dataset composed of 1M Wikipedia tables extracted from over 20M Wikipedia pages and annotated through Wikidata."
    >
      <main>
        <img
          src="/mammotab-docs/img/bblurrymam.svg"
          className="absolute opacity-10 -top-[45rem]"
        />

        <section className="mx-auto max-w-6xl relative z-10">
          <div className="mx-4 place-content-center lg:gap-12 xl:gap-12 lg:grid-cols-12 pb-12 pt-12">
            <div className="justify-center flex flex-col md:flex-row max-w-8xl gap-12 pb-2 mx-auto">
              <div className="place-content-center max-w-lg pl-2">
                <h1 className="pt-12 leading-none sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
                  <span className={styles.gradientText}>MammoTab</span>
                </h1>
                <p className="text-stone-800 dark:text-stone-100 sm:text-lg lg:mb-8 md:text-lg lg:text-xl">
                  MammoTab, is a dataset composed of 1M Wikipedia tables
                  extracted from over 20M Wikipedia pages and annotated through
                  Wikidata.
                  <br />
                  The lack of this kind of datasets in the
                  stateof-the-art makes MammoTab a good resource for testing and
                  training Semantic Table Interpretation approaches.
                  <br />
                  The dataset
                  has been designed to cover several key challenges, such as
                  disambiguation, homonymy, and NIL-mentions
                </p>
                <a
                  href="/mammotab-docs/docs/introduction"
                  className="text-center inline-flex items-center border-none dark:bg-primary-dark bg-primary-darkest hover:text-stone-100 text-stone-100 font-sm rounded-lg text-sm px-5 py-2.5 me-2 mb-2 font-semibold"
                >
                  Learn more <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
              <img
                alt="Logo"
                src="/mammotab-docs/img/Geometric-Mammoth.svg"
                className="lg:mt-0 lg:col-span-4 lg:flex w-[36rem] object-fit-cover max-w-full"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl">
          <ul className="relative border-s border-stone-900 dark:border-stone-200 max-w-screen-lg mx-12 list-none">
            <div className="absolute top-0 left-0 w-[1px] h-full bg-primary dark:bg-primary-dark"></div>

            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -start-3 dark:bg-primary-dark"></span>
              <p className="pt-1.5 mb-1 text-lg uppercase leading-none text-stone-500 dark:text-stone-400">
                Mammotab 2025
              </p>
              <h3 className="text-3xl font-semibold text-primary dark:text-primary-light">
                V2
              </h3>
              <p className="mb-4 text-base font-normal text-stone-800 dark:text-stone-100">
                Introducing the enhanced MammoTab 2.0! This latest version
                features a fully refactored codebase, resulting in a streamlined
                number of tables. Thanks to advanced data cleaning techniques,
                the annotations are now of superior quality. Additionally, each
                table is complemented by comprehensive metadata that detail
                their features, addressing the key challenges of the STI.
              </p>
              <Tooltip content="Coming soon..." trigger="hover" placement="top">
                <span className="hover:text-stone-100 relative inline-flex justify-center items-center px-4 py-2 text-sm font-bold rounded-lg text-stone-100 dark:bg-brick bg-chocolate font-sm me-2 mb-2">
                  Download <ArrowDownToLine className="ml-2 h-5 w-5" />{" "}
                </span>
              </Tooltip>

              <div className="space-y-4 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                  <div className="items-center bg-primary-light dark:bg-primary-darkest py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl dark:text-stone-100 text-stone-100">
                        888.372
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        N. of tables
                      </span>
                    </div>
                  </div>
                  <div className="items-center bg-primary-light dark:bg-primary-darkest py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl dark:text-stone-100 text-stone-100">
                        40.702.248
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Entities
                      </span>
                    </div>
                  </div>
                  <div className="items-center bg-primary-light dark:bg-primary-darkest py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl dark:text-stone-100 text-stone-100">
                        4.937.828
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Classes
                      </span>
                    </div>
                  </div>
                  <div className="items-center bg-primary-light dark:bg-primary-darkest py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl dark:text-stone-100 text-stone-100">
                        24.193
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Properties
                      </span>
                    </div>
                  </div>
                  <div className="items-center bg-primary-light dark:bg-primary-darkest py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl dark:text-stone-100 text-stone-100">
                        4.121.995
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        NIL
                      </span>
                    </div>
                  </div>
                </div>
                <div className="items-center bg-primary-light dark:bg-primary-darkest py-10 rounded-lg">
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        21.731.092
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Total rows
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        4
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Min rows
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        24.193
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Max rows
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        5.030.655
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Total cols
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        1
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Min cols
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        1.000
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Max cols
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-6 mb-3 text-lg leading-none text-stone-500 dark:text-stone-400">
                Evaluation
              </p>
              <p className="mb-4 text-md leading-none ">
                <a
                  href="https://drive.google.com/drive/folders/1csBiqgPQXdDnwI1LcfBBwe3vzf9ujpTW"
                  target="_blank"
                >
                  Dataset{" "}
                </a>
                511 tables, 9741 mentions.
              </p>
              <div className="overflow-x-auto max-w-full">
                <table className="text-sm w-fit rounded-lg">
                  <thead className="text-xs uppercase dark:bg-rocketmetallic bg-paletaupe">
                    <tr>
                      <th scope="col" className="p-3 min-w-40">
                        APPROACHES
                      </th>
                      <th scope="col" className="p-3 min-w-24">
                        CEA
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                      <td
                        scope="row"
                        className="p-3 min-w-40 font-medium whitespace-nowrap"
                      >
                        <a
                          href="https://arxiv.org/abs/2311.09206"
                          target="_blank"
                        >
                          Zang 2023
                        </a>
                      </td>
                      <td className="p-3 min-w-24">0.86</td>
                    </tr>
                    <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                      <td
                        scope="row"
                        className="p-3 min-w-40 font-medium whitespace-nowrap"
                      >
                        <a
                          href="https://arxiv.org/abs/2006.14806"
                          target="_blank"
                        >
                          Deng 2022
                        </a>
                      </td>
                      <td className="p-3 min-w-24">0.31</td>
                    </tr>
                    <tr className="dark:even:bg-darksilver even:bg-darkvanilla  dark:odd:bg-umber odd:bg-desertsand">
                      <td
                        scope="row"
                        className="p-3 min-w-40 font-medium whitespace-nowrap"
                      >
                        <a
                          href="https://www.computer.org/csdl/proceedings-article/wi-iat/2023/091800a142/1T0o1Fv6jV6"
                          target="_blank"
                        >
                          Avogadro 2023
                        </a>
                      </td>
                      <td className="p-3 min-w-24">0.62</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-start gap-4 md:flex-row mt-4">
                <Tooltip
                  content="Coming soon after SemTab2024"
                  trigger="hover"
                  placement="top"
                >
                  <span className="hover:text-stone-100 relative inline-flex justify-center items-center px-4 py-2 text-sm font-bold rounded-lg cursor-not-allowed active:pointer-events-nonefont-sm me-2 mb-2 text-stone-100 dark:bg-brick bg-chocolate">
                    Find on Zenodo
                    <img
                      src="/mammotab-docs/img/zenodowhite.svg"
                      className="ml-2 h-5 w-5"
                      alt="zenodo"
                    />
                  </span>
                </Tooltip>
                <a
                  target="_blank"
                  href="https://github.com/UNIMIBInside/mammotab"
                  className="hover:text-stone-100 relative inline-flex justify-center items-center px-4 py-2 text-sm font-bold rounded-lg   text-stone-100 dark:bg-brick bg-chocolate font-sm me-2 mb-2"
                >
                  Find on Github <Github className="ml-2 h-5 w-5" />{" "}
                </a>
              </div>
            </li>

            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -start-3 dark:bg-primary-dark"></span>
              <p className="mb-1 text-lg uppercase leading-none text-stone-500 dark:text-stone-400">
                Upgrades
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 mt-8 items-center">
                  <img
                    alt="metadata"
                    src="/mammotab-docs/img/metadata.svg"
                    className="aspect-square shrink-0 w-14 h-14"
                  />
                  <p className="ml-5 mb-0 text-base font-normal text-stone-800 dark:text-stone-100">
                    Add table metadata
                  </p>{" "}
                </div>
                <div className="flex gap-4 mt-8 items-center">
                  <img
                    alt="column classification"
                    src="/mammotab-docs/img/columnclass.svg"
                    className="aspect-square shrink-0 w-14 h-14"
                  />
                  <p className="ml-5 mb-0 text-base font-normal text-stone-800 dark:text-stone-100">
                    Column classification (NIL, Ne)
                  </p>{" "}
                </div>
                <div className="flex gap-4 mt-8 items-center">
                  <img
                    alt="Domain classification"
                    src="/mammotab-docs/img/domain.svg"
                    className="aspect-square shrink-0 w-14 h-14"
                  />
                  <p className="ml-5 mb-0 text-base font-normal text-stone-800 dark:text-stone-100">
                    Domain classification
                  </p>{" "}
                </div>
                <div className="flex gap-4 mt-8 items-center">
                  <img
                    alt="table context"
                    src="/mammotab-docs/img/context.svg"
                    className="aspect-square shrink-0 w-14 h-14"
                  />
                  <p className="ml-5 mb-0 text-base font-normal text-stone-800 dark:text-stone-100">
                    Add table context
                  </p>{" "}
                </div>
                <div className="flex gap-4 mt-8 items-center">
                  <img
                    alt="keys"
                    src="/mammotab-docs/img/keys.svg"
                    className="aspect-square shrink-0 w-14 h-14"
                  />
                  <p className="ml-5 mb-0 text-base font-normal text-stone-800 dark:text-stone-100">
                    Add classification for key STI challenges
                  </p>{" "}
                </div>
                <div className="flex gap-4 mt-8 items-center">
                  <img
                    alt="export"
                    src="/mammotab-docs/img/export.svg"
                    className="aspect-square shrink-0 w-14 h-14"
                  />
                  <p className="ml-5 mb-0 text-base font-normal text-stone-800 dark:text-stone-100">
                    Add export material
                  </p>{" "}
                </div>
              </div>
            </li>

            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -start-3 dark:bg-primary-dark"></span>
              <p className="pt-1.5 mb-1 text-lg uppercase leading-none text-stone-500 dark:text-stone-400">
                Mammotab 2024
              </p>
              <h3 className="text-3xl font-semibold text-primary dark:text-primary-light">
                V2-alpha (SemTab)
              </h3>
              <p className="mb-4 text-base font-normal text-stone-800 dark:text-stone-100">
                This version was created for SemTab 2024, it comes from the
                preliminary version of V2. The annotations within MammoTab 24
                are derived from Wikidata v. 20240401 and follow the structure
                used in the
                <a
                  href="https://sem-tab-challenge.github.io/2024/tracks/sti-vs-llm-track.html"
                  target="_blank"
                >
                  {" "}
                  SemTab challenge.
                </a>{" "}
                All tables are stored in a separate CSV file, where each line in
                the file corresponds to a row in the table. Target columns for
                annotation, CTA, and CEA are saved in separate CSV files.
              </p>
              <Tooltip
                content="Coming soon after SemTab2024"
                trigger="hover"
                placement="top"
              >
                <span className="hover:text-stone-100 relative inline-flex justify-center items-center px-4 py-2 text-sm font-bold rounded-lg text-stone-100 dark:bg-brick bg-chocolate font-sm me-2 mb-2">
                  Download <ArrowDownToLine className="ml-2 h-5 w-5" />{" "}
                </span>
              </Tooltip>
              <iframe
                className="mt-8 rounded-lg bg-stone-600 grid place-content-center w-full aspect-video"
                src="https://www.dailymotion.com/embed/video/k7DiUU7svU7bsLANU2E"
              ></iframe>
              <p className="mt-6 mb-3 text-lg leading-none text-stone-500 dark:text-stone-400">
                Evaluation
              </p>
              <p className="mb-4 text-md leading-none ">
                <a
                  href="https://drive.google.com/drive/folders/1csBiqgPQXdDnwI1LcfBBwe3vzf9ujpTW"
                  target="_blank"
                >
                  Dataset{" "}
                </a>
                511 tables, 9741 mentions.
              </p>
              <div className="overflow-x-auto max-w-full">
                <table className="text-sm w-fit rounded-lg">
                  <thead className="text-xs uppercase dark:bg-rocketmetallic bg-paletaupe">
                    <tr>
                      <th scope="col" className="p-3 min-w-40">
                        APPROACHES
                      </th>
                      <th scope="col" className="p-3 min-w-24">
                        CEA
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                      <td
                        scope="row"
                        className="p-3 min-w-40 font-medium whitespace-nowrap"
                      >
                        <a
                          href="https://arxiv.org/abs/2311.09206"
                          target="_blank"
                        >
                          Zang 2023
                        </a>
                      </td>
                      <td className="p-3 min-w-24">0.86</td>
                    </tr>
                    <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                      <td
                        scope="row"
                        className="p-3 min-w-40 font-medium whitespace-nowrap"
                      >
                        <a
                          href="https://arxiv.org/abs/2006.14806"
                          target="_blank"
                        >
                          Deng 2022
                        </a>
                      </td>
                      <td className="p-3 min-w-24">0.31</td>
                    </tr>
                    <tr className="dark:even:bg-darksilver even:bg-darkvanilla  dark:odd:bg-umber odd:bg-desertsand">
                      <td
                        scope="row"
                        className="p-3 min-w-40 font-medium whitespace-nowrap"
                      >
                        <a
                          href="https://www.computer.org/csdl/proceedings-article/wi-iat/2023/091800a142/1T0o1Fv6jV6"
                          target="_blank"
                        >
                          Avogadro 2023
                        </a>
                      </td>
                      <td className="p-3 min-w-24">0.62</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-start gap-4 md:flex-row mt-4">
                <Tooltip
                  content="Coming soon after SemTab2024"
                  trigger="hover"
                  placement="top"
                >
                  <span className="hover:text-stone-100 relative inline-flex justify-center items-center px-4 py-2 text-sm font-bold rounded-lg cursor-not-allowed active:pointer-events-nonefont-sm me-2 mb-2 text-stone-100 dark:bg-brick bg-chocolate">
                    Find on Zenodo
                    <img
                      src="/mammotab-docs/img/zenodowhite.svg"
                      className="ml-2 h-5 w-5"
                      alt="zenodo"
                    />
                  </span>
                </Tooltip>
                <a
                  target="_blank"
                  href="https://github.com/UNIMIBInside/mammotab"
                  className="hover:text-stone-100 relative inline-flex justify-center items-center px-4 py-2 text-sm font-bold rounded-lg   text-stone-100 dark:bg-brick bg-chocolate font-sm me-2 mb-2"
                >
                  Find on Github <Github className="ml-2 h-5 w-5" />{" "}
                </a>
              </div>
            </li>

            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -start-3 dark:bg-primary-dark"></span>
              <p className="mb-1 text-lg uppercase leading-none text-stone-500 dark:text-stone-400">
                Upgrades
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 mt-8 items-center">
                  <img
                    alt="arcs"
                    src="/mammotab-docs/img/arcs.svg"
                    className="aspect-square shrink-0 w-14 h-14"
                  />
                  <p className="ml-5 mb-0 text-base font-normal text-stone-800 dark:text-stone-100">
                    Greater accuracy in annotations
                  </p>{" "}
                </div>
                <div className="flex gap-4 mt-8 items-center">
                  <img
                    alt="annotations"
                    src="/mammotab-docs/img/annotation.svg"
                    className="aspect-square shrink-0 w-14 h-14"
                  />
                  <p className="ml-5 mb-0 text-base font-normal text-stone-800 dark:text-stone-100">
                    New annostions for CPA (Columns Predicate Annotations)
                  </p>{" "}
                </div>
              </div>
            </li>

            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -start-3 dark:bg-primary-dark"></span>
              <p className=" mb-1 text-lg uppercase leading-none text-stone-500 dark:text-stone-400">
                Mammotab 2022
              </p>
              <h3 className="text-3xl font-semibold dark:text-terracotta">
                V1
              </h3>
              <p className="mb-4 text-base font-normal text-stone-800 dark:text-stone-100">
                The annotations within MammoTab22 are derived from Wikidata v.
                20220511 and follow the structure used in the SemTab challenge.
                All tables are stored in a separate CSV file, where each line in
                the file corresponds to a row in the table. Target columns for
                annotation, CTA, and CEA are saved in separate CSV files
              </p>
              <a
                href="https://zenodo.org/records/7014472"
                target="_blank"
                className="hover:text-stone-100 text-center inline-flex items-center border-none text-stone-100 dark:bg-brick bg-chocolate font-sm rounded-lg text-sm px-5 py-2.5 me-2 mb-2 font-semibold"
              >
                Download <ArrowDownToLine className="ml-2 h-5 w-5" />{" "}
              </a>

              <div className="space-y-4 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="items-center bg-primary-light dark:bg-primary-darkest py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-800">
                        980.254
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        N. of tables
                      </span>
                    </div>
                  </div>
                  <div className="items-center bg-primary-light dark:bg-primary-darkest py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        43.661.125
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Entities
                      </span>
                    </div>
                  </div>
                  <div className="items-center bg-primary-light dark:bg-primary-darkest py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        5.541.283{" "}
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Classes
                      </span>
                    </div>
                  </div>
                </div>
                <div className="items-center bg-primary-light dark:bg-primary-darkest py-10 rounded-lg">
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        23.229.899
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Total rows
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        4
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Min rows
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        14.436
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Max rows
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        5.638.191
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Total cols
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        1
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Min cols
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl dark:text-stone-100 text-stone-100">
                        1.0100.012
                      </span>
                      <span className="font-semibold dark:text-stone-200 text-stone-700">
                        Max cols
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 mb-3 text-lg leading-none text-stone-500 dark:text-stone-400">
                Evaluation
              </p>
              <p className="mb-4 text-md leading-none ">
                <a
                  href="https://ceur-ws.org/Vol-3103/paper8.pdf"
                  target="_blank"
                >
                  Mtab performance
                </a>
              </p>
              <div className="overflow-x-auto rounded-lg max-w-full">
                <div className="inline-block rounded-lg overflow-x-auto max-w-full">
                  <table className="text-sm text-left rtl:text-right w-fit rounded-lg">
                    <thead className="text-xs uppercase dark:bg-rocketmetallic bg-paletaupe">
                      <tr>
                        <th scope="col" className="p-3 min-w-40">
                          DATASET
                        </th>
                        <th scope="col" className="p-3 min-w-24">
                          CEA
                        </th>
                        <th scope="col" className="p-3 min-w-24">
                          CTA
                        </th>
                        <th scope="col" className="p-3 min-w-24">
                          CPA
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground">
                      <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                        <th
                          scope="row"
                          className="p-3 min-w-40 font-medium whitespace-nowrap"
                        >
                          Semtab2019 R4
                        </th>
                        <td className="p-3 min-w-24"> 0.983 </td>
                        <td className="p-3 min-w-24"> - </td>
                        <td className="p-3 min-w-24"> 0.832 </td>
                      </tr>
                      <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                        <th
                          scope="row"
                          className="p-3 min-w-40 font-medium whitespace-nowrap"
                        >
                          Semtab2020 R4
                        </th>
                        <td className="p-3 min-w-24"> 0.907 </td>
                        <td className="p-3 min-w-24"> 0.993 </td>
                        <td className="p-3 min-w-24"> 0.997 </td>
                      </tr>
                      <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                        <th
                          scope="row"
                          className="p-3 min-w-40 font-medium whitespace-nowrap"
                        >
                          Semtab2020 2T
                        </th>
                        <td className="p-3 min-w-24"> 0.907 </td>
                        <td className="p-3 min-w-24"> 0.728 </td>
                        <td className="p-3 min-w-24"> - </td>
                      </tr>
                      <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                        <th
                          scope="row"
                          className="p-3 min-w-40 font-medium whitespace-nowrap"
                        >
                          Semtab2021 R3
                        </th>
                        <td className="p-3 min-w-24"> 0.968 </td>
                        <td className="p-3 min-w-24"> 0.984 </td>
                        <td className="p-3 min-w-24"> 0.993 </td>
                      </tr>
                      <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-umber odd:bg-desertsand">
                        <th
                          scope="row"
                          className="p-3 min-w-40 font-medium whitespace-nowrap"
                        >
                          MammoTab 22
                        </th>
                        <td className="p-3 min-w-24"> 0.853 </td>
                        <td className="p-3 min-w-24"> 0.659 </td>
                        <td className="p-3 min-w-24"> - </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col items-start gap-4 md:flex-row">
                <div>
                  <a
                    href="https://zenodo.org/records/7014472"
                    target="_blank"
                    className="hover:text-stone-100 relative inline-flex justify-center items-center px-4 py-2 text-sm font-bold rounded-lg font-sm me-2 mb-2  dark:bg-brick bg-chocolate text-stone-100"
                  >
                    Find on Zenodo
                    <img
                      src="/mammotab-docs/img/zenodowhite.svg"
                      className="ml-2 h-5 w-5"
                      alt="zenodo"
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://bitbucket.org/disco_unimib/mammotab/src/master/"
                    target="_blank"
                    className="hover:text-stone-100 relative inline-flex justify-center items-center px-4 py-2 text-sm font-bold rounded-lg font-sm me-2 mb-2  dark:bg-brick bg-chocolate text-stone-100"
                  >
                    Find on Bitbucket{" "}
                    <img
                      src="/mammotab-docs/img/bitbucketicon.png"
                      className="ml-2 h-5 w-5"
                      alt="zenodo"
                    />{" "}
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.css";
import { Check, ArrowRight, ArrowDownToLine, Github } from "lucide-react";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="MammoTab.">
      <main>
        <img
          src="/mammotab-docs/img/bblurrymam.svg"
          className="absolute opacity-10 -top-[45rem]"
        />

        <section className="mx-auto max-w-6xl relative z-10">
          <div className="mx-4 place-content-center lg:gap-12 xl:gap-12 lg:grid-cols-12 pb-12 pt-12">
            <div className="justify-center flex flex-col md:flex-row max-w-8xl gap-12 pb-2 mx-auto">
              <div className="place-content-center max-w-lg pl-2">
                <h1 className="pt-12 leading-none text-dorange sm:text-4xl md:text-5xl lg:text-6xl dark:text-lorange font-bold tracking-wide">
                  Mammotab
                </h1>
                <p className=" text-dgBackground dark:text-white sm:text-xl lg:mb-8 md:text-xl lg:text-2xl">
                  {" "}
                  MammoTab, is a dataset composed of 1M Wikipedia tables
                  extracted from over 20M Wikipedia pages and annotated through
                  Wikidata. The lack of this kind of datasets in the
                  stateof-the-art makes MammoTab a good resource for testing and
                  training Semantic Table Interpretation approaches. The dataset
                  has been designed to cover several key challenges, such as
                  disambiguation, homonymy, and NIL-mentions
                </p>
                <a
                  href="/mammotab-docs/docs/introduction"
                  className="text-center inline-flex items-center border-none dark:bg-lorange dark:text-grey-900 text-white font-sm rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-dorange font-semibold"
                >
                  Learn more <ArrowRight className="ml-2 h-5 w-5" />{" "}
                </a>
              </div>
              <img
                alt="Logo"
                src="/mammotab-docs/img/geometric-mammoth.svg"
                className="lg:mt-0 lg:col-span-4 lg:flex w-[36rem] object-fit-cover max-w-full"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl">
          <ul className="relative border-s border-gray-900 dark:border-gray-200 max-w-screen-lg mx-12 list-none">
            <div className="absolute top-0 left-0 w-[1px] h-full bg-dorange dark:bg-lorange"></div>
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-dorange rounded-full -start-3  dark:bg-lorange"></span>
              <p className="pt-1.5 mb-1 text-lg uppercase leading-none text-gray-500">
                Mammotab 2024
              </p>
              <h3 className="text-3xl font-semibold text-lorange">
                V2-alpha (SemTab)
              </h3>
              <p className="mb-4 text-base font-normal text-gray-600 dark:text-gray-200">
                This version was created for SemTab 2024, it comes from the
                preliminary version of V2. The annotations within MammoTab 24
                are derived from Wikidata v. 20240401 and follow the structure
                used in the{" "}
                <a href="https://sem-tab-challenge.github.io/2024/tracks/sti-vs-llm-track.html">
                  {" "}
                  SemTab challenge.{" "}
                </a>
                All tables are stored in a separate CSV file, where each line in
                the file corresponds to a row in the table. Target columns for
                annotation, CTA, and CEA are saved in separate CSV files.
              </p>
              <a
                href="#"
                className="cursor-not-allowed active:pointer-events-none text-center inline-flex items-center border-none dark:bg-lorange dark:text-grey-900 text-white font-sm rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-dorange font-semibold"
              >
                Download <ArrowDownToLine className="ml-2 h-5 w-5" />{" "}
              </a>

              <div className="space-y-4 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                  <div className="items-center bg-bronze dark:bg-grizzly py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl text-white">
                        888.372
                      </span>
                      <span className="font-semibold text-gray-200">
                        N. of tables
                      </span>
                    </div>{" "}
                  </div>
                  <div className="items-center bg-bronze dark:bg-grizzly py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl text-white">
                        40.702.248
                      </span>
                      <span className="font-semibold text-gray-200">
                        Entities
                      </span>
                    </div>{" "}
                  </div>{" "}
                  <div className="items-center bg-bronze dark:bg-grizzly  py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl text-white">
                        4.937.828
                      </span>
                      <span className="font-semibold text-gray-200">
                        Classes
                      </span>
                    </div>
                  </div>
                  <div className="items-center bg-bronze dark:bg-grizzly py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl text-white">
                        24.193
                      </span>
                      <span className="font-semibold text-gray-200">
                        Properties
                      </span>
                    </div>{" "}
                  </div>{" "}
                  <div className="items-center bg-bronze dark:bg-grizzly py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl text-white">
                        4.121.995
                      </span>
                      <span className="font-semibold text-gray-200">NIL</span>
                    </div>
                  </div>
                </div>
                <div className="items-center bg-bronze dark:bg-grizzly py-10 rounded-lg">
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl text-white">
                        21.731.092
                      </span>
                      <span className="font-semibold text-gray-200">
                        Total rows
                      </span>
                    </div>{" "}
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl text-white">
                        4
                      </span>
                      <span className="font-semibold text-gray-200">
                        Min rows
                      </span>
                    </div>{" "}
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl text-white">
                        24.193
                      </span>
                      <span className="font-semibold text-gray-200">
                        Max rows
                      </span>
                    </div>{" "}
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl text-white">
                        5.030.655
                      </span>
                      <span className="font-semibold text-gray-200">
                        Total cols
                      </span>
                    </div>{" "}
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl text-white">
                        1
                      </span>
                      <span className="font-semibold text-gray-200">
                        Min cols
                      </span>
                    </div>{" "}
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl text-white">
                        1.000
                      </span>
                      <span className="font-semibold text-gray-200">
                        Max cols
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <iframe
                className="mt-8 rounded-lg bg-gray-600 grid place-content-center w-full aspect-video"
                src="https://www.dailymotion.com/embed/video/k7DiUU7svU7bsLANU2E"
              ></iframe>
              <p className="mt-6 mb-3 text-lg leading-none text-gray-500">
                Evaluation
              </p>
              <p className="mb-4 text-md leading-none ">
                <a href="https://drive.google.com/drive/folders/1csBiqgPQXdDnwI1LcfBBwe3vzf9ujpTW">
                  {" "}
                  Dataset
                </a>{" "}
                511 tables, 9741 mentions.
              </p>
              <div className="overflow-x-auto rounded-lg max-w-full">
                <table className="text-sm  border-0">
                  <thead className="text-xs uppercase dark:bg-umber bg-paletaupe">
                    {" "}
                    <tr>
                      <th scope="col" className="p-3 min-w-40">
                        {" "}
                        APPROACHES{" "}
                      </th>
                      <th scope="col" className="p-3 min-w-24">
                        {" "}
                        CEA{" "}
                      </th>{" "}
                    </tr>
                  </thead>{" "}
                  <tbody className="text-foreground">
                    <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-rocketmetallic odd:bg-desertsand">
                      <th
                        scope="row"
                        className="p-3 min-w-40 font-medium whitespace-nowrap"
                      >
                        <a
                          href="https://arxiv.org/abs/2311.09206"
                          target="_blank"
                        >
                          Zang 2023
                        </a>
                      </th>
                      <td className="p-3 min-w-24">0.86</td>{" "}
                    </tr>{" "}
                    <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-rocketmetallic odd:bg-desertsand">
                      <th
                        scope="row"
                        className="p-3 min-w-40 font-medium whitespace-nowrap"
                      >
                        <a
                          href="https://arxiv.org/abs/2006.14806"
                          target="_blank"
                        >
                          Deng 2022
                        </a>
                      </th>
                      <td className="p-3 min-w-24">0.31</td>{" "}
                    </tr>{" "}
                    <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-rocketmetallic odd:bg-desertsand">
                      <th
                        scope="row"
                        className="p-3 min-w-40 font-medium whitespace-nowrap"
                      >
                        <a
                          href="https://www.computer.org/csdl/proceedings-article/wi-iat/2023/091800a142/1T0o1Fv6jV6"
                          target="_blank"
                        >
                          {" "}
                          Avogadro 2023
                        </a>
                      </th>{" "}
                      <td className="p-3 min-w-24">0.62</td>{" "}
                    </tr>{" "}
                  </tbody>{" "}
                </table>{" "}
              </div>
              <div className="flex flex-col gap-4 md:flex-row mt-4">
                <div>
                  <a
                    href="#"
                    className="relative inline-flex justify-center items-center px-4 py-2 text-sm font-bold rounded-lg cursor-not-allowed active:pointer-events-none dark:bg-lorange dark:text-grey-900 text-white font-sm me-2 mb-2 bg-dorange"
                  >
                    Find on Zenodo{" "}
                    <img
                      src="/mammotab-docs/img/zenodowhite.svg"
                      className="ml-2 h-5 w-5"
                      alt="zenodo"
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://github.com/UNIMIBInside/mammotab"
                    className="relative inline-flex justify-center items-center px-4 py-2 text-sm font-bold rounded-lg  dark:bg-lorange dark:text-grey-900 text-white font-sm me-2 mb-2 bg-dorange"
                  >
                    Find on Github <Github className="ml-2 h-5 w-5" />{" "}
                  </a>
                </div>
              </div>
            </li>

            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-dorange dark:bg-lorange rounded-full -start-3"></span>
              <p className="mb-1 text-lg uppercase leading-none text-gray-500">
                Upgrades
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 mt-8 items-center">
                  <img
                    alt="arcs"
                    src="/mammotab-docs/img/arcs.svg"
                    className="aspect-square shrink-0 w-14 h-14"
                  />
                  <div>
                    <p className="ml-5">Greater accuracy in annotations</p>{" "}
                  </div>
                </div>
                <div className="flex gap-4 mt-8 items-center">
                  <img
                    alt="arcs"
                    src="/mammotab-docs/img/reti.svg"
                    className="aspect-square shrink-0 w-14 h-14"
                  />
                  <div>
                    <p className="ml-5">
                      New annotations for CPA (Columns Predicate Annotations)
                    </p>{" "}
                  </div>
                </div>
              </div>
            </li>

            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-dorange dark:bg-lorange rounded-full -start-3"></span>
              <p className=" mb-1 text-lg uppercase leading-none text-gray-500">
                Mammotab 2022
              </p>
              <h3 className="text-3xl font-semibold text-lorange">V1</h3>
              <p className="mb-4 text-base font-normal text-gray-600 dark:text-gray-200">
                The annotations within MammoTab22 are derived from Wikidata v.
                20220511 and follow the structure used in the SemTab challenge.
                All tables are stored in a separate CSV file, where each line in
                the file corresponds to a row in the table. Target columns for
                annotation, CTA, and CEA are saved in separate CSV files
              </p>
              <a
                href="#"
                className="text-center inline-flex items-center border-none dark:bg-lorange dark:text-grey-900 text-white font-sm rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-dorange font-semibold"
              >
                Download <ArrowDownToLine className="ml-2 h-5 w-5" />{" "}
              </a>

              <div className="space-y-4 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="items-center bg-bronze dark:bg-grizzly  py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl text-white">
                        980.254
                      </span>
                      <span className="font-semibold text-gray-200">
                        N. of tables
                      </span>
                    </div>{" "}
                  </div>
                  <div className="items-center bg-bronze dark:bg-grizzly  py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl text-white">
                        43.661.125
                      </span>
                      <span className="font-semibold text-gray-200">
                        Entities
                      </span>
                    </div>{" "}
                  </div>{" "}
                  <div className="items-center bg-bronze dark:bg-grizzly  py-10 rounded-lg">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-2xl text-white">
                        5.541.283{" "}
                      </span>
                      <span className="font-semibold text-gray-200">
                        Classes
                      </span>
                    </div>
                  </div>
                </div>
                <div className="items-center bg-bronze dark:bg-grizzly  py-10 rounded-lg">
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl text-white">
                        23.229.899
                      </span>
                      <span className="font-semibold text-gray-200">
                        Total rows
                      </span>
                    </div>{" "}
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl text-white">
                        4
                      </span>
                      <span className="font-semibold text-gray-200">
                        Min rows
                      </span>
                    </div>{" "}
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl text-white">
                        14.436
                      </span>
                      <span className="font-semibold text-gray-200">
                        Max rows
                      </span>
                    </div>{" "}
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl text-white">
                        5.638.191
                      </span>
                      <span className="font-semibold text-gray-200">
                        Total cols
                      </span>
                    </div>{" "}
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl text-white">
                        1
                      </span>
                      <span className="font-semibold text-gray-200">
                        Min cols
                      </span>
                    </div>{" "}
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-xl text-white">
                        1.0100.012
                      </span>
                      <span className="font-semibold text-gray-200">
                        Max cols
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 mb-3 text-lg leading-none text-gray-500">
                Evaluation
              </p>
              <p className="mb-4 text-md leading-none ">
                <a href="https://ceur-ws.org/Vol-3103/paper8.pdf">
                  {" "}
                  Mtab performance
                </a>{" "}
              </p>
              <div className="overflow-x-auto rounded-lg max-w-full">
                <div className="inline-block rounded-lg overflow-x-auto max-w-full">
                  {" "}
                  <table className="text-sm text-left rtl:text-right">
                    {" "}
                    <thead className="text-xs uppercase dark:bg-umber bg-paletaupe">
                      {" "}
                      <tr>
                        {" "}
                        <th scope="col" className="p-3 min-w-40">
                          {" "}
                          DATASET{" "}
                        </th>{" "}
                        <th scope="col" className="p-3 min-w-24">
                          {" "}
                          CEA{" "}
                        </th>{" "}
                        <th scope="col" className="p-3 min-w-24">
                          {" "}
                          CTA{" "}
                        </th>{" "}
                        <th scope="col" className="p-3 min-w-24">
                          {" "}
                          CPA{" "}
                        </th>{" "}
                      </tr>{" "}
                    </thead>{" "}
                    <tbody className="text-foreground">
                      {" "}
                      <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-rocketmetallic odd:bg-desertsand">
                        {" "}
                        <th
                          scope="row"
                          className="p-3 min-w-40 font-medium whitespace-nowrap"
                        >
                          Semtab2019 R4
                        </th>{" "}
                        <td className="p-3 min-w-24"> 0.983 </td>{" "}
                        <td className="p-3 min-w-24"> - </td>{" "}
                        <td className="p-3 min-w-24"> 0.832 </td>{" "}
                      </tr>{" "}
                      <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-rocketmetallic odd:bg-desertsand">
                        {" "}
                        <th
                          scope="row"
                          className="p-3 min-w-40 font-medium whitespace-nowrap"
                        >
                          Semtab2020 R4
                        </th>{" "}
                        <td className="p-3 min-w-24"> 0.907 </td>{" "}
                        <td className="p-3 min-w-24"> 0.993 </td>{" "}
                        <td className="p-3 min-w-24"> 0.997 </td>{" "}
                      </tr>{" "}
                      <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-rocketmetallic odd:bg-desertsand">
                        {" "}
                        <th
                          scope="row"
                          className="p-3 min-w-40 font-medium whitespace-nowrap"
                        >
                          Semtab2020 2T
                        </th>{" "}
                        <td className="p-3 min-w-24"> 0.907 </td>{" "}
                        <td className="p-3 min-w-24"> 0.728 </td>{" "}
                        <td className="p-3 min-w-24"> - </td>{" "}
                      </tr>{" "}
                      <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-rocketmetallic odd:bg-desertsand">
                        {" "}
                        <th
                          scope="row"
                          className="p-3 min-w-40 font-medium whitespace-nowrap"
                        >
                          Semtab2021 R3
                        </th>{" "}
                        <td className="p-3 min-w-24"> 0.968 </td>{" "}
                        <td className="p-3 min-w-24"> 0.984 </td>{" "}
                        <td className="p-3 min-w-24"> 0.993 </td>{" "}
                      </tr>{" "}
                      <tr className="dark:even:bg-darksilver even:bg-darkvanilla dark:odd:bg-rocketmetallic odd:bg-desertsand">
                        {" "}
                        <th
                          scope="row"
                          className="p-3 min-w-40 font-medium whitespace-nowrap"
                        >
                          MammoTab 22
                        </th>{" "}
                        <td className="p-3 min-w-24"> 0.853 </td>{" "}
                        <td className="p-3 min-w-24"> 0.659 </td>{" "}
                        <td className="p-3 min-w-24"> - </td>{" "}
                      </tr>{" "}
                    </tbody>{" "}
                  </table>{" "}
                </div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div>
                  <a
                    href="#"
                    className="relative inline-flex justify-center items-center px-4 py-2 text-sm font-bold rounded-lg  dark:bg-lorange dark:text-grey-900 text-white font-sm me-2 mb-2 bg-dorange"
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
                    href="#"
                    className="relative inline-flex justify-center items-center px-4 py-2 text-sm font-bold rounded-lg dark:bg-lorange dark:text-grey-900 text-white font-sm me-2 mb-2 bg-dorange"
                  >
                    Find on Github <Github className="ml-2 h-5 w-5" />{" "}
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

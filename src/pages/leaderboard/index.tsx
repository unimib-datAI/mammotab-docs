import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.css";
import { Check, ArrowRight, ArrowDownToLine, Github } from "lucide-react";

import { Tooltip } from "flowbite-react";

export default function Leaderboard(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="MammoTab, is a dataset composed of 1M Wikipedia tables extracted from over 20M Wikipedia pages and annotated through Wikidata.">
      <main>
        <img
          src="/mammotab-docs/img/bblurrymam.svg"
          className="absolute opacity-10 -top-[45rem]"
        />

        <section id="tanstack-table-container" className="mx-auto max-w-6xl relative z-10">
         
        </section>

      </main>
    </Layout>
  );
}

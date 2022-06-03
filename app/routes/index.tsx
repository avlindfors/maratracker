import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import { getResults } from "~/api/service.server";

export const loader: LoaderFunction = async () => {
  const jacob = "http://results.marathon.se/2022/?content=detail&fpid=search&pid=search&idp=BH2BEQLSA80A2&lang=SE&event=STHM&search%5Bname%5D=Jalsing&search%5Bfirstname%5D=Jacob&search_event=STHM";
  const daniel = "http://results.marathon.se/2022/?content=detail&fpid=search&pid=search&idp=BH2BEQLSA80A3&lang=SE&event=STHM&search%5Bname%5D=Svensson&search%5Bfirstname%5D=Daniel&search_event=STHM";
  const resultsForJacob = await getResults(jacob);
  const resultsForDaniel = await getResults(daniel);
  return {
    jacob: resultsForJacob,
    daniel: resultsForDaniel
  }
}

const sections = ["5k", "10k", "15k", "20k", "Halv", "25k", "30k", "35k", "40k", "Hel"];

type Section = "Halv" | "Hel"
type Runner = 'Jacob' | "Daniel" | 'Both';
export default function Index() {
  const { jacob, daniel } = useLoaderData();
  const [filters, setFilter] = useState<{ runner: Runner, earliestSection: Section }>({ runner: "Both", earliestSection: "Hel" });

  const setRunnerFilter = (runner: Runner) => setFilter((old) => ({ ...old, runner }))
  const setEarliestSection = (earliestSection: Section) => setFilter((old) => ({ ...old, earliestSection }))

  return (
    <div >
      <p className="mb-2 text-slate-900">Se samlad information om grabbarna, uppdatera sidan för att få ny data</p>
      <div className="mb-1">
        <h2 className="text-sm italic">Jacob Jalsing (JJ), Number {jacob.startNumber}</h2>
        <h2 className="text-sm italic">Daniel Svensson (DS), Number {daniel.startNumber}</h2>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <div>
          <p className="mb-1 text-sm">Grabb</p>
          <div className="flex gap-4">
            <button onClick={() => setRunnerFilter("Jacob")} type="button" className={`px-2 py-1 rounded-md  ${filters.runner === 'Jacob' ? 'bg-blue-200' : 'bg-slate-100'}`}>Jacob</button>
            <button onClick={() => setRunnerFilter("Daniel")} type="button" className={`px-2 py-1 rounded-md ${filters.runner === 'Daniel' ? 'bg-blue-200' : 'bg-slate-100'}`}>Daniel</button>
            <button onClick={() => setRunnerFilter("Both")} type="button" className={`px-2 py-1 rounded-md   ${filters.runner === 'Both' ? 'bg-blue-200' : 'bg-slate-100'}`}>Both</button>
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm">Include #</p>
          <div className="flex gap-4">
            <button onClick={() => setEarliestSection("Halv")} type="button" className={`px-2 py-1 rounded-md  ${filters.earliestSection === 'Halv' ? 'bg-blue-200' : 'bg-slate-100'}`}>Half</button>
            <button onClick={() => setEarliestSection("Hel")} type="button" className={`px-2 py-1 rounded-md ${filters.earliestSection === 'Hel' ? 'bg-blue-200' : 'bg-slate-100'}`}>Whole</button>

          </div>
        </div>
      </div >
      <table className="table-auto w-full text-lg text-left">
        <thead className="">
          <tr className=" text-sm text-slate-500">
            <th>#</th>
            <th>Grabb</th>
            <th>Total</th>
            <th>Lap</th>
            <th>Pace</th>
            <th>~End</th>
          </tr>
        </thead>
        <tbody>
          {
            sections.filter((_section, index) => {
              if (filters.earliestSection === "Hel") {
                return true;
              }
              const halfIndex = 4;
              return index >= halfIndex;
            }).map((section, index) => {
              const backgroundColor = index % 2 === 0 ? 'bg-slate-100' : ''
              const { runner } = filters;
              return (
                <React.Fragment key={`section-${section}`}>
                  {
                    runner === "Both" || runner === "Jacob" ?
                      (
                        <tr className={backgroundColor}>
                          <th className=" text-xs">{section}</th>
                          <td className="text-sm">JJ</td>
                          <td>{jacob.data[section].time}</td>
                          <td>{jacob.data[section].sectionTime}</td>
                          <td>{jacob.data[section].pace}</td>
                          <td>{jacob.data[section].estimatedEndTime}</td>
                        </tr>
                      ) : null
                  }
                  {
                    runner === "Both" || runner === "Daniel" ? (
                      <tr className={backgroundColor}>
                        <th className=" text-xs">{runner === 'Daniel' ? section : ''}</th>
                        <td className="text-sm">DS</td>
                        <td>{daniel.data[section].time}</td>
                        <td>{daniel.data[section].sectionTime}</td>
                        <td>{daniel.data[section].pace}</td>
                        <td>{daniel.data[section].estimatedEndTime}</td>
                      </tr>
                    ) : null
                  }
                </React.Fragment>
              )
            })
          }
        </tbody>
      </table>
    </div >
  )
}

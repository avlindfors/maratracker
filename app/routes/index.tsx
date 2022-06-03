import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
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
export default function Index() {
  const { jacob, daniel } = useLoaderData();
  return (
    <div>
      <h1 className="text-xl mb-0.5">
        Maratracker
      </h1>
      <div className="mb-4">
        <h2 className="text-sm italic">{jacob.name} {jacob.startNumber}</h2>
        <h2 className="text-sm italic">{daniel.name} {daniel.startNumber}</h2>
      </div>
      <table className="table-auto w-full text-lg text-left">
        <thead className="">
          <tr className="">
            <th>#</th>
            <th>Löpare</th>
            <th>Tid 1</th>
            <th>Tid 2</th>
            <th>Pace</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {
            sections.map((section) => {
              return (
                <React.Fragment key={`section-${section}`}>
                  <tr className="">
                    <th className=" text-xs">{section}</th>
                    <td>Jacob</td>
                    <td>{jacob.data[section].time}</td>
                    <td>{jacob.data[section].sectionTime}</td>
                    <td>{jacob.data[section].pace}</td>
                    <td>{jacob.data[section].estimatedEndTime}</td>
                  </tr>
                  <tr className="">
                    <th className=" text-xs"></th>
                    <td>Daniel</td>
                    <td>{daniel.data[section].time}</td>
                    <td>{daniel.data[section].sectionTime}</td>
                    <td>{daniel.data[section].pace}</td>
                    <td>{daniel.data[section].estimatedEndTime}</td>
                  </tr>
                </React.Fragment>
              )
            })
          }
        </tbody>
      </table>
    </div >
  )
}

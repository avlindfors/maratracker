import { useLoaderData } from "@remix-run/react";
import * as cheerio from 'cheerio';
import distance, { Section } from "~/utils/distanceUtils.server";
import timeUtils from "~/utils/timeUtils.server";

const getResults = async (url: string) => {
  const rawHtml = await fetch(url).then(result => result.text());
  const $ = cheerio.load(rawHtml);
  const name = $('.f-__fullname .last').text();
  const startNumber = $('.f-start_no').children('.f-start_no .last').text();
  const allSections: { [x: string]: { time: string, sectionTime: string, pace: string, estimatedEndTime: string } } = {}
  Object.entries(Section).forEach(([key, value]) => {
    const sectionData = $(`.${value}`);
    const time = sectionData.children('.time').text();
    const pace = sectionData.children('.min_km').text();
    const estimatedEndTime = distance.estimateEndTime(key, timeUtils.timeToDuration(time), timeUtils.timeToDuration(pace))
    const section = {
      time,
      sectionTime: sectionData.children('.diff').text(),
      pace,
      estimatedEndTime: distance.formatEstimatedEndTime(estimatedEndTime)
    }
    allSections[key] = section;
  })
  return { name, startNumber, data: allSections }
}
export const loader = async () => {
  const jacob = "http://results.marathon.se/2022/?content=detail&fpid=search&pid=search&idp=BH2BEQLSA80A2&lang=SE&event=STHM&search%5Bname%5D=Jalsing&search%5Bfirstname%5D=Jacob&search_event=STHM";
  const daniel = "http://results.marathon.se/2022/?content=detail&fpid=search&pid=search&idp=BH2BEQLSA80A3&lang=SE&event=STHM&search%5Bname%5D=Svensson&search%5Bfirstname%5D=Daniel&search_event=STHM";
  const resultsForJacob = await getResults(jacob);
  const resultsForDaniel = await getResults(daniel);
  return {
    jacob: resultsForJacob,
    daniel: resultsForDaniel
  }
}

export default function Index() {
  const { jacob, daniel } = useLoaderData<Awaited<ReturnType<typeof loader>>>();
  return (
    <div>
      <h1>
        Maratracker
      </h1>
      <h2>{jacob.name} {jacob.startNumber}</h2>
      <h2>{daniel.name} {daniel.startNumber}</h2>
      <table>
        <thead>
          <tr>
            <th>Distans</th>
            <th>Löpare</th>
            <th>Tid</th>
            <th>Sträcktid</th>
            <th>min/km</th>
            <th>~Sluttid</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(Section).map((section) => {
              return <div key={section}>
                <tr>
                  <th>{section}</th>
                  <td>Jacob</td>
                  <td>{jacob.data[section].time}</td>
                  <td>{jacob.data[section].sectionTime}</td>
                  <td>{jacob.data[section].pace}</td>
                  <td>{jacob.data[section].estimatedEndTime}</td>
                </tr>
                <tr>
                  <th>-</th>
                  <td>Daniel</td>
                  <td>{daniel.data[section].time}</td>
                  <td>{daniel.data[section].sectionTime}</td>
                  <td>{daniel.data[section].pace}</td>
                  <td>{daniel.data[section].estimatedEndTime}</td>
                </tr>
              </div>
            })
          }
        </tbody>

      </table>
    </div>
  );
}

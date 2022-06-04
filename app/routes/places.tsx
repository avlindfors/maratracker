import { useLoaderData } from "@remix-run/react";

export const loader = () => {
    const data = {
        "5 km": "Hornsbergs strand",
        "10 km": "Vasabron, Gamla stan. Även vid ca 37k",
        "15 km": "Valhallavägen",
        "20 km": "Djupa djurgården",
        "21 km": "Gröna lund",
        "25 km": "Slussen",
        "30 km": "Djupa Söder, Folkungagatan. Även vid ca 9k",
        "35 km": "Rålis, Strax efter Västerbron",
        "40 km": "Narvavägen, Strax efter djurgårdsbron mot Östermalm",
        "42 km": "Stadion via Karlavägen",
    }
    const other = {
        "Korsningen Valhallavägen / Lidingövägen": "passeras vid start, ca 14k & slut",
        "Strandvägen": "passeras vid ca 12k, 22k & 39k",
        "Rålambshovsparken": "passeras vid ca 7k & 35k",
        "Stadshuset": "passeras vid ca 9k & 36k",
    }
    const routes =
        [
            "Start -> Strandvägen (12, 22k) -> Slut (42k)",
            "Start -> Strandvägen (12k, 22k) -[tub fr. Östermalm]> Hornstull (32k) -[tub t. Tekniska]> Slut (42k)",
            "Start -> Gamla Stan, Vasabron (10k) -> Strandvägen (22k) -[tub fr. Östermalm]> Hornstull (32k) -[tub t. Tekniska]> Slut (42k) "
        ]
    return { data, other, routes };
}

const Places = () => {
    const { data: places, other: locations, routes } = useLoaderData<Awaited<ReturnType<typeof loader>>>();
    return <>
        <p className="text-slate-900">Se ungefär vart varje 5k landar, kartan över hela loppet finns längst ner</p>
        <p className="mb-2 text-slate-900">Notera att de flesta siffror är grovt uppskattade med friska gissningar</p>
        <h3 className="font-medium text-slate-900">Tips från coachen</>
        <div>
            {routes.map((route, index) => <p key={index}>{route}</p>)}
        </div>
        <div className="bg-green-50 p-2 my-4">
            <p className="mb-2 text-sm text-slate-600 ">Mest passerade områden</p>
            {Object.entries(locations).map(([key, value]) => {
                return <div key={key} className="mb-2">
                    <p className="mb-1 text-slate-600"><span className="font-bold">{key}</span> {value}</p>
                </div>
            })}
        </div>

        {Object.entries(places).map(([key, value]) => {
            return <div key={key} className="mb-2 even:bg-slate-100">
                <p className="mb-1 text-sm font-bold text-slate-600">{key}</p>
                <p>{value}</p>
            </div>
        })}

        <p className="mb-2 text-sm text-slate-600">Klicka på kartan för att öppna i ny flik</p>
        <a href="https://www.stockholmmarathon.se/wp-content/uploads/2022/04/ASM-2022.jpg" className=" max-w-full" target="_blank" rel="noreferrer">
            <img alt="Map of Stockholm Marathon 2022" src="https://www.stockholmmarathon.se/wp-content/uploads/2022/04/ASM-2022.jpg" />
        </a>
    </>
}
export default Places;
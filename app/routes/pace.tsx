import { useLoaderData } from "@remix-run/react";

export const loader = () => {
    const data = [
        {
            pace: "4.50",
            data: {
                "5k": "24.10",
                "10k": "48.20",
                "15k": "1.12.30",
                "20k": "1.36.40",
                "Halv": "1.31.58",
                "25k": "2.00.50",
                "30k": "2.25.00",
                "35k": "2.49.10",
                "40k": "3.13.20",
                "Hel": "3.23.57",
            }
        },
        {
            pace: "5.20",
            data: {
                "5k": "26.40",
                "10k": "53.20",
                "15k": "1.20.00",
                "20k": "1.46.40",
                "Halv": "1.52.31",
                "25k": "2.13.20",
                "30k": "2.40.00",
                "35k": "3.06.40",
                "40k": "3.33.40",
                "Hel": "3.45.02",
            },
        },
        {
            pace: "5.42",
            data: {
                "5k": "28.30",
                "10k": "57.00",
                "15k": "1.25.30",
                "20k": "1.54.00",
                "Halv": "2.00.15",
                "25k": "2.22.30",
                "30k": "2.51.00",
                "35k": "3.19.30",
                "40k": "3.48.00",
                "Hel": "4.00.31",
            }
        }
    ]
    return data;
}

const Pace = () => {
    const paces = useLoaderData<Awaited<ReturnType<typeof loader>>>();

    return <div>
        {paces.map((paceItem) => {
            const { pace, data } = paceItem;
            return <div key={pace} className="mb-6">
                <p className="mb-1 text-lg font-medium">Pace: {pace} min/km</p>
                <div className="grid grid-flow-col grid-rows-5 grid-cols-2">
                    {Object.entries(data).map(([key, value]) => <p key={key} className="mb-1 even:bg-slate-100"><span className="text-slate-500 text-sm">{key}:</span> <span className="font-medium">{value}</span></p>)}
                </div>
            </div>
        })}
    </div>
}

export default Pace;
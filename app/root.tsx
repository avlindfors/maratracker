import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/app.css"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className=" text-slate-700 bg-slate-50">
        <div className=" flex justify-center">
          <div className="w-full max-w-5xl p-2">
            <Link to="/">
              <h1 className="text-xl mb-0.5 tracking-widest font-black uppercase">
                Maratracker
              </h1>
            </Link>
            <Outlet />
            <div className="mt-8">
              <nav className="flex w-full justify-start gap-3 text-lg uppercase tracking-wide font-medium">
                <Link to="/" prefetch="intent" className="px-6 py-2 underline rounded-md bg-slate-100 font-medium ">
                  Times
                </Link>
                <Link to="/pace" prefetch="render" className="px-6 py-2 underline rounded-md bg-slate-100 font-medium ">
                  Pace
                </Link>
              </nav>
            </div>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </div>
        </div>
      </body>
    </html >
  );
}

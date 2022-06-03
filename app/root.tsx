import type { MetaFunction } from "@remix-run/node";
import {
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
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </div>
        </div>
      </body>
    </html>
  );
}

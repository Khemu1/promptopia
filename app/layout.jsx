import "@styles/global.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Head from "next/head";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RouteLayout = ({ children }) => {
  return (
    <html lang="e">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RouteLayout;

import "tailwindcss/tailwind.css";
import App from "next/app";
import Navbar from "../components/Base/Navbar";
import Head from "next/head";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { useRouter } from "next/dist/client/router";
import { getSession } from "next-auth/client";
import { useEffect } from "react";
import { useAxios } from "hooks";
import Paper from "@material-ui/core/Paper";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

MyApp.getInitialProps = async (appContext) => {
  const session = await getSession(appContext.ctx);

  const signInUrl = "/api/auth/signin";

  if (!session && appContext.ctx.pathname !== signInUrl && appContext.ctx.res) {
    appContext.ctx.res.writeHead(302, { Location: signInUrl });
    appContext.ctx.res.end();
  }

  const appProps = await App.getInitialProps(appContext);
  return {
    ...appProps,
    pageProps: {
      session,
    },
  };
};

export const InitialSession = createContext(null);

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  if (typeof window !== "undefined") {
    const router = useRouter();
    useEffect(() => {
      if (router.asPath.endsWith("#")) {
        router.replace(router.asPath.slice(0, -1));
      }
    }, []);
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <InitialSession.Provider value={pageProps.session}>
          <Paper
            className="relative min-h-screen m-2 rounded-3xl"
            elevation={10}
            rounded
          >
            <Head name="top">
              <title>LeetCool</title>
            </Head>
            <Navbar session={pageProps.session} />

            <a href="#top" className="fixed z-50 bottom-20 right-20 ">
              <ArrowUpwardIcon />
            </a>
            <Component {...pageProps} />
          </Paper>
        </InitialSession.Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

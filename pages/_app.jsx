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

const axios = useAxios();

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
  console.log(pageProps.session);
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
          <div className="min-h-screen bg-white">
            <Head>
              <title>LeetCool</title>
            </Head>
            <Navbar session={pageProps.session} />
            <Component {...pageProps} />
          </div>
        </InitialSession.Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

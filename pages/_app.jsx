import "tailwindcss/tailwind.css"
import App from "next/app"
import Navbar from "../components/Base/Navbar"
import Head from "next/head"
import { createContext, useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"
import { useRouter } from "next/dist/client/router"
import { getSession } from "next-auth/client"

MyApp.getInitialProps = async appContext => {
  const session = await getSession(appContext.ctx)

  const signInUrl = "/api/auth/signin"

  if (!session && appContext.ctx.pathname !== signInUrl && appContext.ctx.res) {
    appContext.ctx.res.writeHead(302, { Location: signInUrl })
    appContext.ctx.res.end()
  }

  const appProps = await App.getInitialProps(appContext)

  return {
    ...appProps,
    pageProps: {
      session,
    },
  }
}

export const InitialSession = createContext(null)

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [queryClient] = useState(() => new QueryClient())

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
  )
}

export default MyApp

import "../styles/globals.css";
import Layout from "../components/layout";
import { AppWrapper } from "../context/state";
import { SessionProvider } from "next-auth/react"

export default function MyApp({ 
	Component, 
	pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
		<AppWrapper>
		<Layout> 
			<Component {...pageProps} />
		</Layout>
		</AppWrapper>
		</SessionProvider>
	)
  }
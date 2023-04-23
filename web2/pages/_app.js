import "../styles/globals.css";
import Layout from "../components/layout";
import { AppWrapper } from "../context/state";

export default function MyApp({ Component, pageProps }) {
	return (
		<AppWrapper>
		<Layout> 
			<Component {...pageProps} />
		</Layout>
		</AppWrapper>
	)
  }
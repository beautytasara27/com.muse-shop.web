import { AppWrapper } from "../context/auth";
import "../styles/globals.css";
import Header from "../components/header";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
    <Header/>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "../styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

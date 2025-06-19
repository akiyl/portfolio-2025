import "@styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

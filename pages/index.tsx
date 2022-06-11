import type { NextPage } from "next";
import Head from "next/head";
import App from "../components/App";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EasyHabit</title>
        <meta name="description" content="An Intuitive Habit Tracker" />
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <App />
    </>
  );
};

export default Home;

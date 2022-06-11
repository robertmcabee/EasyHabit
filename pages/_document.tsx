import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="An Intuitive Habit Tracker" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="rgb(250, 250, 250)"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="rgb(38, 38, 38)"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

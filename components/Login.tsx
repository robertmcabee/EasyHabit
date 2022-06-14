import { supabase } from "../utils/supabase";
import { useState } from "react";

interface Props {
  displayLogin: boolean;
  closeLogin: () => void;
}

function Login({ displayLogin, closeLogin }: Props) {
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = async (userEmail: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email: userEmail });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (displayLogin === false) return null;
  return (
    <div className="fixed z-50 flex h-full w-full justify-center align-bottom">
      <section className="z-50 m-auto mb-auto max-h-min max-w-[28rem] animate-dropin rounded-2xl bg-white p-10 dark:bg-neutral-700">
        <h2 className="text-lg font-bold">Login</h2>
        <div
          onClick={() => {
            closeLogin();
          }}
          className="cursor-pointer hover:text-neutral-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <p>
          Do you want to create an account to carry over your data between all
          your devices? It's free, and all you need to to is enter your email,
          and we'll send you a login link.
        </p>
        <div>
          <input
            className="my-4 h-8 w-full rounded-full border-0 border-none bg-neutral-100 p-4 text-center font-semibold caret-neutral-400 placeholder:italic placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:bg-neutral-800 dark:focus:border-neutral-50 dark:focus:ring-neutral-500"
            type="email"
            placeholder="Your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(userEmail);
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Send magic link"}</span>
          </button>
          <button
            onClick={() => {
              closeLogin();
            }}
          >
            No thanks.
          </button>
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            Log Out
          </button>
        </div>
        <p>You can log in later in the settings menu.</p>
      </section>
      <div
        onClick={() => closeLogin()}
        className="fixed top-0 z-40 h-full w-full animate-fadein bg-black opacity-50"
      ></div>
    </div>
  );
}

export default Login;

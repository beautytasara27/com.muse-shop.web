import { useRef, useContext, useEffect } from "react";
import { GetAuthentication } from "../../utils/httpHelper";
import AppContext from "../../context/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { LockClosedIcon } from "@heroicons/react/solid";


function SignIn() {
  const username = useRef();
  const password = useRef();
  const router = useRouter();
  const { setTokenInfo, isLoading, token } = useContext(AppContext);

  useEffect(() => {
    // redirect to home if already logged in
    // missing on navigate to login while logged in redirect back to previous page
    if (token) {
      //let path = sessionStorage.getItem("prevPath");
      let path = "/";

      if (path === null || path === "/login") {
        router.push("/");
      }
      router.push(path);
    }
  }, [token, isLoading]);

  async function Logon(data) {
    const token = await GetAuthentication(data);
    if (token) {
      setTokenInfo(token);

    }
  }
  function onLoginFormSubmit(event) {
    event.preventDefault();
    const enteredUserName = username.current.value;
    const enteredPassword = password.current.value;
    const data = {
      email: enteredUserName,
      password: enteredPassword,
    };
    console.log("data", data);
    Logon(data);
  }
  //console.log(isLoading, "is loading");
  return (
    <div>
      {!isLoading && !token && (
        <main>
          <div className="content-container">
            {/* Replace with your content */}
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <div className="flex justify-center">
                    <Image
                      className="object-contain"
                      src="https://midas-public-images.s3.ap-southeast-1.amazonaws.com/images/logoC99.png"
                      width={200}
                      height={50}
                      unoptimized={true}
                    />
                  </div>

                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Or{" "}
                    <Link href="/m/register">
                      <a className="font-medium text-indigo-600 hover:text-indigo-500">
                        Register a new account
                      </a>
                    </Link>
                  </p>
                </div>
                <form
                  className="mt-8 space-y-6"
                  action="#"
                  method="POST"
                  onSubmit={onLoginFormSubmit}
                >
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md shadow-sm space-y-4">
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        ref={username}
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        ref={password}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        minLength={1}
                        maxLength={15}
                        title="Password should have a minimum length of 6 and maximum length of 15."
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon
                          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                          aria-hidden="true"
                        />
                      </span>
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      )}
    </div>
  );
}
export default SignIn;

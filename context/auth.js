import { createContext, useState, useEffect } from "react";
const AppContext = createContext({
  user: null,
  token: null,
  setUserInfo: function (user) {},
  setTokenInfo: function (token) {},
  setlogOut: function () {},
});

export function AppWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const browserToken = localStorage.getItem("muse-token");
    if (browserToken) {
      console.log("count times");
      setToken(browserToken);
      setIsLoading(false);
    }
    else if(!browserToken){
      setIsLoading(false);
    }
  }, []);

  function logOut() {
   // setToken(null); // (shouldd i bother)
    localStorage.removeItem("muse-token");
  }
  function setuserInformation(user) {
    setUser(user);
  }
  function setTokenInformation(token) {
    console.log("user is logged in", token);
    setToken(token);
    localStorage.setItem("muse-token", token);
    sessionStorage.setItem("authorized", "true");
  }
  // checks if the user is authenticated or not
 
  const contextObject = {
    user: user,
    token: token,
    setUserInfo: setuserInformation,
    setTokenInfo: setTokenInformation,
    setlogOut: logOut,
    isLoading: isLoading,
  };
  return (
    <AppContext.Provider value={contextObject}>{children}</AppContext.Provider>
  );
}

// export function useAppContext() {
//   return useContext(AppContext);
// }

export default AppContext;

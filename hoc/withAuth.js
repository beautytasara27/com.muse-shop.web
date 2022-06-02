import { useContext, useEffect } from "react";
import AppContext from "../context/auth";
import { useRouter } from "next/router";

export const withAuth = (Component) => (props) => {
  const { isLoading, token } = useContext(AppContext);
  const router = useRouter();
  useEffect(() => {
    authCheck();
  }, [token, isLoading]);

  const authCheck = () => {
    const unprotectedRoutes = ["/auth/signin", "/"];
    const path = router.asPath.split("?")[0];
    console.log("auth check", path);
    if (!token && !unprotectedRoutes.includes(path)) {
      router.push({ pathname: "/auth/signin", query: { returnUrl: router.asPath } });
    } 
  };

  if (isLoading) return <div>Loading data...</div>;

  return <Component {...props} />;
};

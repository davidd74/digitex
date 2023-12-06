import axios from "axios";
import { useEffect, useState } from "react";

const useCookieVerification = (typeofRoute) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/${typeofRoute}`,
          {},
          { withCredentials: true },
        );

        const { status, isAdmin } = data;

        if (!status) {
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
          setIsAdmin(isAdmin);
        }
      } catch (error) {
        console.error("Error verifying cookie:", error);
        setIsAuthorized(false);
      } finally {
        setIsVerified(true);
      }
    };

    verifyCookie();
  }, [typeofRoute]);

  return { isAuthorized, isVerified, isAdmin };
};

export default useCookieVerification;

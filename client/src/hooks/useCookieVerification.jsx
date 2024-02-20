import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const useCookieVerification = (typeofRoute) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/${typeofRoute}`,
          {},
          { withCredentials: true },
        );

        const { status } = data;

        if (!status) {
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
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

  return { isAuthorized, isVerified };
};

export default useCookieVerification;

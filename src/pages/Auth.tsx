import { ref, set } from "@firebase/database";
import React, { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { firebaseDB } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import { RootState } from "../redux/store/store";

export type UserData = {
  id: number;
  nickname: string;
  loggedIn: boolean;
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParmas] = useSearchParams();
  const loggedInUser = useSelector(
    (state: RootState) => state.userCheckReducer.User
  );
  useEffect(() => {
    (async () => {
      const code = searchParmas.get("code");
      if (!code) {
        return <Navigate to="/login" />;
      }

      const GRANT_TYPE = "authorization_code";
      const CLIENT_ID = `${process.env.REACT_APP_KAKAO_LOGIN_API_KEY}`;
      const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;
      const response = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      const data = await response.json();
      const { access_token } = data;
      if (access_token) {
        const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });
        const userData = await userResponse.json();
        set(ref(firebaseDB, "users/" + userData.id), {
          nickname: userData.properties.nickname,
        })
          .then(() => {
            // Data saved successfully!
            dispatch(
              login({
                id: userData.id,
                nickname: userData.properties.nickname,
                loggedIn: true,
              })
            );
            navigate("/");
          })
          .catch((error) => {
            // The write failed...
            console.log(error);
          });
      }
    })();
  }, []);

  console.log(loggedInUser);

  return <div></div>;
};

export default Auth;

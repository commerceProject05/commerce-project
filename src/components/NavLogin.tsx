import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { styled } from "styled-components";
import { logout } from "../redux/actions/userActions";

const NavLogin = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(
    (state: RootState) => state.userCheckReducer.User
  );
  console.log(userInfo);

  const linkToLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.location.pathname = "/login";
  };

  const logoutHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <LoginBox>
      {userInfo.loggedIn ? (
        <>
          <p>{userInfo.nickname}님</p>
          <button onClick={logoutHandler}>로그아웃</button>
        </>
      ) : (
        <button onClick={linkToLogin}>로그인</button>
      )}
    </LoginBox>
  );
};

export default NavLogin;

const LoginBox = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.4rem;
  font-weight: 500;
  user-select: none;
  > p {
    font-size: 1.5rem;
  }
  > button {
    width: 100px;
    height: 30px;
    border: none;
    color: white;
    background-color: var(--main-bg-color);
    cursor: pointer;
  }
`;

import { styled } from "styled-components";

const Login = () => {
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;
  const CLIENT_ID = `${process.env.REACT_APP_KAKAO_LOGIN_API_KEY}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const linkToLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <Wrapper>
      <button onClick={linkToLogin}>카카오 로그인</button>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  > button {
    width: 300px;
    height: 100px;
    font-size: 30px;
    background-color: #f3f362;
    border: none;
  }
`;

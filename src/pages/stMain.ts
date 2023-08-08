import { styled } from "styled-components";

export const StMain = styled.div`
  position: relative;
  .header {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 2;
    &_box {
      width: 1280px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media (max-width: 1360px) {
        width: 90%;
      }
      img {
        width: 118px;
        height: 64px;
        cursor: pointer;
      }
      form {
        /* background-color: pink; */
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding: 9px 10px 9px 16px;
        border-radius: 30px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
        label {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2px;
          div {
            font-size: 1.2rem;
            padding-left: 8px;
            font-weight: 700;
            user-select: none;
          }
          input {
            padding: 4px 8px;
            border-radius: 16px;
            font-size: 1.4rem;
            border: none;
          }
        }
        button {
          border: none;
          border-radius: 25px;
          padding: 10px 20px;
          background-color: var(--main-bg-color);
          color: #fff;
          font-weight: 700;
          font-size: 1.4rem;
          cursor: pointer;
          user-select: none;
        }
      }
      &_login {
        font-size: 1.4rem;
        font-weight: 500;
        cursor: pointer;
        user-select: none;
      }
    }
  }
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 80px;
    margin-bottom: 120px;
    .category {
      width: 1280px;
      margin-top: 30px;
      @media (max-width: 1360px) {
        width: 90%;
      }
      ul {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        gap: 10px;
        li {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 70px;
          cursor: pointer;
          user-select: none;
          padding: 10px 0;
          border-bottom: 2px solid transparent;
          transition: all 0.15s ease-out;
          &:nth-child(1),
          &:hover {
            border-bottom: 2px solid var(--main-bg-color);
          }
          img {
            width: 30px;
          }
          p {
            font-size: 1.3rem;
            font-weight: 700;
          }
        }
      }
    }
    article {
      width: 1280px;
      margin-top: 20px;
      @media (max-width: 1360px) {
        width: 90%;
      }
      .goods {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
        @media (max-width: 1300px) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 980px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 640px) {
          grid-template-columns: repeat(1, 1fr);
        }
        &_item {
          display: flex;
          flex-direction: column;
          gap: 10px;
          cursor: pointer;
          overflow: hidden;
          border-radius: 16px;
          &_thumbnail {
            overflow: hidden;
            border-radius: 16px;
            height: 280px;
            display: flex;
            justify-content: center;
            margin-bottom: 6px;
            img {
              transition: all 0.15s ease-out;
              width: 100%;
              height: 100%;
              &:hover {
                transform: scale(1.05);
              }
            }
          }
          &_title {
            font-size: 1.6rem;
            font-weight: 700;
            padding: 0 4px;
          }
          &_price {
            font-size: 1.4rem;
            padding: 0 4px;
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1;
    background-color: #eee;
    &_box {
      width: 1280px;
      display: flex;
      font-size: 1.4rem;
      @media (max-width: 1360px) {
        width: 90%;
      }
    }
  }
`;

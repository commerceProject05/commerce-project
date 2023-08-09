import { styled } from "styled-components";

export const StDetail = styled.div`
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
      width: 1120px;
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
    .section {
      width: 1120px;
      margin-top: 30px;
      @media (max-width: 1360px) {
        width: 90%;
      }
      h1 {
        font-size: 2.6rem;
        font-weight: 500;
      }
      p {
        padding: 20px 0;
        font-size: 1.4rem;
        text-decoration: underline;
      }
      &_item_detail {
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 464px;
        border-radius: 16px;
        overflow: hidden;
        @media (max-width: 930px) {
          height: 320px;
        }
        img {
          display: flex;
        }
      }
    }
    .detail_wrapper {
      width: 1120px;
      margin-top: 30px;
      display: grid;
      grid-template-columns: 1fr 370px;
      gap: 80px;
      @media (max-width: 1360px) {
        width: 90%;
      }
      @media (max-width: 1000px) {
        grid-template-columns: 1fr 320px;
        gap: 60px;
      }
      @media (max-width: 930px) {
        grid-template-columns: 1fr;
      }
      .detail {
        &_box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 40px;
          margin-bottom: 40px;
          border-bottom: 1px solid #ddd;
          &_item {
            &_title {
              font-size: 2.2rem;
              font-weight: 700;
            }
            &_desc {
              color: #131313;
              margin-top: 10px;
              font-size: 1.6rem;
            }
            &_map {
            }
            img {
              width: 24px;
            }
          }
          &_item.profile {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #000;
            color: #fff;
            width: 50px;
            height: 50px;
            font-size: 1.8rem;
            border-radius: 50%;
          }
          &_item.map {
            height: 480px;
            width: 100%;
            background-color: #eee;
            @media (max-width: 930px) {
              height: 320px;
            }
          }
        }
        &_box.tag {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          p {
            font-size: 1.6rem;
            font-weight: 700;
            padding: 0 20px 0 10px;
          }
        }
        &_box.description {
          p {
            color: #131313;
            padding-bottom: 20px;
            &:nth-last-child(1) {
              padding-bottom: 10px;
            }
          }
        }
        &_box.column {
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }
        &_reservation {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 20px;
          max-height: 220px;
          padding: 30px 40px;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
          @media (max-width: 930px) {
            display: none;
          }
          p {
            font-size: 2.2rem;
            padding-bottom: 5px;
          }
          button {
            background-color: var(--main-bg-color);
            color: #fff;
            border: none;
            border-radius: 10px;
            width: 100%;
            height: 44px;
            font-size: 1.6rem;
          }
          &_hidden {
            display: none;
            @media (max-width: 930px) {
              width: 100%;
              height: 80px;
              background-color: #fff;
              display: flex;
              justify-content: center;
              position: fixed;
              bottom: 0;
              left: 0;
              div {
                width: 90%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                  font-size: 1.6rem;
                  color: #131313;
                }
                button {
                  border: none;
                  border-radius: 8px;
                  padding: 10px 20px;
                  background-color: var(--main-bg-color);
                  color: #fff;
                  font-weight: 700;
                  font-size: 1.4rem;
                  cursor: pointer;
                  user-select: none;
                }
              }
            }
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
    background-color: #eee;
    &_box {
      width: 1120px;
      display: flex;
      font-size: 1.4rem;
      @media (max-width: 1360px) {
        width: 90%;
      }
    }
  }
`;

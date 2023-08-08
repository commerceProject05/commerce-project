import React from "react";
import { StMain } from "./stMain";

const Main = () => {
  return (
    <StMain>
      <header className="header">
        <div className="header_box">
          <img src="./logo.svg" alt="logo" />
          <form>
            <label>
              <div>여행지</div>
              <input type="text" placeholder="여행지 입력" />
            </label>
            <button>검색</button>
          </form>
          <div className="header_box_login">로그인</div>
        </div>
      </header>
      <main>
        <div className="category">
          <ul>
            <li>
              <img src="icon_popularity.png" alt="tag-icon-popularity" />
              <p>인기 급상승</p>
            </li>
            <li>
              <img src="icon_new.png" alt="tag-icon-new" />
              <p>신규</p>
            </li>
            <li>
              <img src="icon_best-view.png" alt="tag-icon-best-view" />
              <p>최고의 전망</p>
            </li>
            <li>
              <img src="icon_beach.png" alt="tag-icon-beach" />
              <p>바닷가</p>
            </li>
          </ul>
        </div>
        <article>
          <ul className="goods">
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
            <li className="goods_item">
              <div className="goods_item_thumbnail">
                <img src="img_thumbnail.webp" alt="img_thumbnail" />
              </div>
              <p className="goods_item_title">가평군, 한국</p>
              <p className="goods_item_price">₩68,278 /박</p>
            </li>
          </ul>
        </article>
      </main>
      <footer className="footer">
        <div className="footer_box">푸터</div>
      </footer>
    </StMain>
  );
};

export default Main;

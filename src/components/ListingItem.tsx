import React from "react";
import { Link } from "react-router-dom";

type ListingItemProps = {
  item: Listing;
};

const ListingItem: React.FC<ListingItemProps> = ({ item }) => {
  const itemLocation: string = item.location.split(" ")[0];

  return (
    <Link to={`/detail/${item.id}`}>
      <li className="goods_item">
        <div className="goods_item_thumbnail">
          <img src={item.img} alt="img_detail" />
        </div>
        <p className="goods_item_title">
          {item.title}, {itemLocation}
        </p>
        <p className="goods_item_price">₩{item.price} /박</p>
      </li>
    </Link>
  );
};

export default ListingItem;

import React from "react";

type ListingItemProps = {
  item: Listing;
};

const ListingItem: React.FC<ListingItemProps> = ({ item }) => {
  const itemLocation: string = item.location.split(" ")[0];

  return (
    <li className="goods_item">
      <div className="goods_item_thumbnail">
        <img src="img_detail.webp" alt="img_detail" />
      </div>
      <p className="goods_item_title">
        {item.title}, {itemLocation}
      </p>
      <p className="goods_item_price">₩{item.price} /박</p>
    </li>
  );
};

export default ListingItem;

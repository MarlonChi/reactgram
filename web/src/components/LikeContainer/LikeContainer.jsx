import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import "./LikeContainer.css";

export const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <div id="LikeContainer">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart onClick={() => handleLike(photo)} />
          )}
          <p>{photo.likes.length} like(s)</p>
        </>
      )}
    </div>
  );
};

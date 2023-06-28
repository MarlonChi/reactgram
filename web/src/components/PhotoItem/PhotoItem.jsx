import React from "react";
import { Link } from "react-router-dom";
import { uploads } from "../../utils/config";

import "./PhotoItem.css";

export const PhotoItem = ({ photo }) => {
  return (
    <div id="PhotoItem">
      {photo.image && (
        <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
      )}
      <h2>{photo.title}</h2>
      <p className="photo-author">
        Publicada por:
        <Link to={`/users/${photo.userId}`}> {photo.userName}</Link>
      </p>
    </div>
  );
};

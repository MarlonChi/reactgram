import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { uploads } from "../../utils/config";
import { getPhoto } from "../../slices/photoSlice";

import { Message } from "../../components/Message/Message";
import { PhotoItem } from "../../components/PhotoItem/PhotoItem";

import "./Photo.css";

export const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="Photo">
      <PhotoItem photo={photo} />
    </div>
  );
};

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { uploads } from "../../utils/config";
import { getPhoto, like } from "../../slices/photoSlice";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

import { Message } from "../../components/Message/Message";
import { PhotoItem } from "../../components/PhotoItem/PhotoItem";
import { LikeContainer } from "../../components/LikeContainer/LikeContainer";

import "./Photo.css";

export const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const user = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  const handleLike = () => {
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="Photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message message={error} type="error" />}
        {error && <Message message={message} type="success" />}
      </div>
    </div>
  );
};

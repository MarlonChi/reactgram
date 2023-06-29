import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { getPhotos, like } from "../../slices/photoSlice";

import { LikeContainer } from "../../components/LikeContainer/LikeContainer";
import { PhotoItem } from "../../components/PhotoItem/PhotoItem";

import "./Home.css";

export const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  // like a photo
  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) {
    <p>Carregando...</p>;
  }

  return (
    <div id="Home">
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.lenght === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,
          <Link to={`/users/${user._id}`}> clique aqui</Link>
        </h2>
      )}
    </div>
  );
};

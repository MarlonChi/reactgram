import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { uploads } from "../../utils/config";
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

import { Message } from "../../components/Message/Message";

import "./EditProfile.css";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // fill form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // build form data
    const formData = new FormData();

    const userFormData = Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    formData.append("user", userFormData);

    await dispatch(updateProfile(userFormData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];
    setPreviewImage(image);
    setProfileImage(image);
  };

  return (
    <div id="EditProfile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você...
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input
          type="e-mail"
          placeholder="E-mail"
          disabled
          value={email || ""}
        />
        <label>
          <span>Imagem do Perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="password"
            placeholder="Digite a sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {!loading && <input type="submit" placeholder="Atualizar" />}
        {loading && <input type="submit" placeholder="Aguarde..." disabled />}
        {error && <Message message={error} type="error" />}
        {message && <Message message={message} type="success" />}
      </form>
    </div>
  );
};
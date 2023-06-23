import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Auth.css";

export const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="Register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirme a senha" />
        <input type="submit" placeholder="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </div>
  );
};

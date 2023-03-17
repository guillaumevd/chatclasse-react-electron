import { useState } from "react";
import axios from "axios";
import './style.css'
const AuthPage = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://146.59.227.84:3001/login", { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  const onSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://146.59.227.84:3001/signup", {
        username,
        secret,
        email,
        first_name,
        last_name,
      })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  return (
    <div className="background">
      <div className="row">
        <div className="column left">
          <form onSubmit={onLogin} className="form-card">
            <div className="form-title">Bienvenue 👋</div>

            <div className="form-subtitle">Connecte-toi pour continuer</div>

            <div className="auth">
              <div className="auth-label">Nom d'utilisateur</div>
              <input
                className="auth-input"
                type="text"
                name="username"
                placeholder="Utilisateur"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="auth">
              <div className="auth-label">Mot de passe</div>
              <input
                className="auth-input"
                type="password"
                name="secret"
                placeholder="Mot de passe"
                onChange={(e) => setSecret(e.target.value)}
              />
              <button className="auth-button" type="submit">
                Se connecter
              </button>
            </div>
          </form>
        </div>
        <div className="column right">
          <form onSubmit={onSignup} className="form-card">
            <div className="form-subtitle">Pas encore de compte ?</div>
            <div className="auth">
              <div className="auth-label">Nom d'utilisateur</div>
              <input
                className="auth-input"
                type="text"
                name="username"
                placeholder="Utilisateur"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="auth">
              <div className="auth-label">Mot de passe</div>
              <input
                className="auth-input"
                type="password"
                name="secret"
                placeholder="Mot de passe"
                onChange={(e) => setSecret(e.target.value)}
              />
            </div>
            <div className="auth">
              <div className="auth-label">Email</div>
              <input
                className="auth-input"
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth">
              <div className="auth-label">Prénom</div>
              <input
                className="auth-input"
                type="text"
                name="first_name"
                placeholder="Prénom"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="auth">
              <div className="auth-label">Nom de famille</div>
              <input
                className="auth-input"
                type="text"
                name="last_name"
                placeholder="Nom de famille"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <button className="auth-button" type="submit">
              Créer un compte
            </button>
          </form>
          </div>
      </div>
    </div>
  );
};

export default AuthPage;

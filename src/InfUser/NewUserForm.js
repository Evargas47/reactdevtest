import { useState } from "react";
import "./NewUserForm.css";

export default function NewUserForm({ onNewUser, user, onClose, updateUI }) {
  const [firstName = user?.firstName, setFirstName] = useState();
  const [lastName = user?.lastName, setLastName] = useState();
  const [gender, setGender] = useState(user?.gender || null);
  const [email = user?.email, setEmail] = useState();
  const [avatarURL = user?.avatar, setAvatarURL] = useState();
  const genders = ["Male", "Female"];

  const addNewUser = () => {
    onNewUser({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
      avatar: avatarURL
    });
  };

  const editUserApi = async () => {
    const newUserUpdated = {
      firstName,
      lastName,
      gender,
      email,
      avatar: avatarURL
    };
    try {
      const res = await fetch(user._links.usuario.href, {
        method: "PUT",
        body: JSON.stringify(newUserUpdated),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      if (res) {
        onClose();
        updateUI();
      }
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };
  console.log(user);
  console.log("gender", gender);

  return (
    <>
      <form>
        <div>
          <label>
            Url Foto de Perfil:
            <input
              value={avatarURL}
              onChange={(e) => setAvatarURL(e.target.value)}
              name="avatar_ur"
              placeholder="Profile picture URL"
            />
          </label>
        </div>
        <div>
          <label>
            Nombre:
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="first_name"
              placeholder="Enter your First Name"
            />
          </label>
        </div>
        <div>
          <label>
            Apellido:
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name="last_name"
              placeholder="Enter your Last Name"
            />
          </label>
        </div>
        <div>
          <label>
            Correo:
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter your Email"
            />
          </label>
        </div>
        <div>
          <label>
            Genero:
            <select name="gender" onChange={(e) => setGender(e.target.value)}>
              <option disabled selected={gender === null}>
                Selecciona un genero
              </option>
              {genders.map((g) => (
                <option value={g} selected={gender === g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>
      {!user ? (
        <button onClick={() => addNewUser()}>Añañin</button>
      ) : (
        <>
          <button onClick={() => editUserApi()}>Editar</button>
          <button onClick={() => onClose()}>Cerrar</button>
        </>
      )}
    </>
  );
}

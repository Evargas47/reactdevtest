import "./styles.css";
import InfUser from "./InfUser/InfUser";
import { useEffect, useState } from "react";
import NewUserForm from "./InfUser/NewUserForm";

export default function App() {
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");

  const getData = async () => {
    try {
      let url = "https://demoreact12345.herokuapp.com/users";
      if (query !== "") {
        url += `/search/findByLastNameLike?name=${query}`;
      }
      const res = await fetch(url);
      console.log(res);
      const json = await res.json();
      setUsers(json._embedded.users);
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };

  useEffect(() => {
    if (!users) {
      getData();
    }
  }, []);

  const removeUser = async (id) => {
    try {
      const res = await fetch(id, {
        method: "DELETE"
      });
      if (res) {
        getData();
      }
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };

  const addNewUser = async (userData) => {
    try {
      const res = await fetch("https://demoreact12345.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      if (res) {
        getData();
      }
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };

  const renderUsers = () => {
    if (users === null) return null;
    return users.map((user) => {
      return (
        <InfUser
          key={user._links.usuario.href}
          user={user}
          onDelete={removeUser}
          updateUI={getData}
        />
      );
    });
  };


  return (
    <div className="App">
      <h1>Lista de Usuario</h1>

      <NewUserForm onNewUser={addNewUser} />
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="button" onClick={getData}>
          Buscar
        </button>
      </div>
      <div className="list">{renderUsers()}</div>
    </div>
  );
}
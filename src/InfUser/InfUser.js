import "../InfUser/InfUser.css";
import Modal from "react-modal";
import { useState } from "react";
import NewUserForm from "./NewUserForm";

export default function InfUser({ user, onDelete, updateUI }) {
    const { firstName, lastName, avatar, email, gender } = user;
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
    const toggleViewMoreModal = () => {
      setIsViewModalOpen(!isViewModalOpen);
    };
  
    const toggleEditModal = () => {
      setIsEditModalOpen(!isEditModalOpen);
    };
  
    const renderAvatar = () => {
      if (avatar?.split(".").pop() === "mp4") {
        return (
          <video autoPlay loop muted>
            <source src={avatar} type="video/mp4" />
          </video>
        );
      }
      return <img src={avatar} alt={`Avatar picture for ${firstName}`} />;
    };
    return (
      <div className="container">
        {renderAvatar()}
        <div className="userInfo">
          <div>
            <div className="name">
              {firstName} {lastName}
            </div>
          </div>
          <div
            className="removeBtn"
            onClick={() => {
              onDelete(user._links.usuario.href);
            }}
          >
            Eliminar
          </div>
          <div
            className="viewMoreBtn"
            onClick={() => {
              toggleViewMoreModal();
            }}
          >
            Ver información
          </div>
          <div
            className="editBtn"
            onClick={() => {
              toggleEditModal();
            }}
          >
            Editar
          </div>
        </div>
        <Modal isOpen={isViewModalOpen} onRequestClose={toggleViewMoreModal}>
          <h1>Información de Usuario</h1>
          <h2>
            {firstName} {lastName}
          </h2>
          <div>Correo: {email}</div>
          <div>Genero: {gender}</div>
          <div
            onClick={() => {
              toggleViewMoreModal();
            }}
          >
            Cerrar
          </div>
        </Modal>
        <Modal isOpen={isEditModalOpen} onRequestClose={toggleEditModal}>
          <h1>Editar Usuario</h1>
          <NewUserForm
            user={user}
            onClose={toggleEditModal}
            updateUI={updateUI}
          />
        </Modal>
      </div>
    );
  }
  
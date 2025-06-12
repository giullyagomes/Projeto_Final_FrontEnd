'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trazerDadosUsuario, trazerQuantidadeFavoritos } from '@/app/servicos/backforapp-api/trazer-dados-usuario';
import { tornarUsuarioVendedor } from '@/app/servicos/backforapp-api/tornar-usuario-vendedor';
import useTemSessionToken from "@/app/servicos/hooks/useSessionToken";
import * as styles from './styles.module.css';

export default function Perfil () {
  const router = useRouter();
  const setTemSessionToken = useTemSessionToken(state => state.setTemSessionToken);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [quantidadeFavoritos, setQuantidadeFavoritos] = useState(0);
  const [formData, setFormData] = useState({
    nome: 'Nome',
    sobrenome: 'Sobrenome',
    email: 'exemplo@gmail.com',
    celular: '(00) 0000-0000',
    cpf: '000.000.000-00',
    dataNascimento: '00/00/0000',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Aqui você pode implementar a lógica de salvar as alterações do perfil
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTrazerDadosUsuario = async () => {
    const sessionToken = localStorage.getItem('session-token');
    const resultado = await trazerDadosUsuario(sessionToken);
    setUserData(resultado.data);
  }

  const handleTrazerQuantidadeFavoritos = async () => {
    const id = localStorage.getItem('objectId');
    const resultado = await trazerQuantidadeFavoritos(id);
    setQuantidadeFavoritos(resultado.data.results);
  }

  const handleTornarUsuarioVendedor = async () => {
    const sessionToken = localStorage.getItem('session-token');
    const resultado = await tornarUsuarioVendedor(userData.objectId, sessionToken);
    localStorage.setItem('id_vendedor', resultado.data.objectId);
  }

  const handleLogout = () => {
    setTemSessionToken(false);
    localStorage.removeItem('session-token');
    localStorage.removeItem('objectId');
    localStorage.removeItem('id_vendedor');
    localStorage.removeItem('nome_usuario');
    router.push('/login');
  };

  useEffect(() => {
    const sessionToken = localStorage.getItem('session-token');
    if (!sessionToken || sessionToken === "false") {
      router.push('/login');
    } else {
      handleTrazerDadosUsuario();
      handleTrazerQuantidadeFavoritos();
    }
  }, []);

  return (
    <div className={styles.containerPerfil}>
      <div className={styles.cardPerfil}>
        <div className={styles.avatarPerfil}>
          <span className={styles.avatarIcon}>👤</span>
        </div>
        {!isEditing ? (
          <>
            <button
              className={styles.btnEditar}
              onClick={handleEditClick}
            >
              Editar perfil
            </button>
            <button
              className={styles.btnLogout}
              onClick={handleLogout}
            >
              Sair da conta
            </button>
            <div className={styles.infoPerfil}>
              <p><strong>Nome:</strong> {userData?.username}</p>
              <p><strong>Sobrenome:</strong> {userData?.sobrenome}</p>
              <p><strong>E-mail:</strong> {userData?.email}</p>
              <p><strong>Celular:</strong> {userData?.celular}</p>
              <p><strong>CPF:</strong> {userData?.cpf}</p>
              <p><strong>Data de nascimento:</strong> {userData?.data_nascimento}</p>
            </div>
            <div className={styles.statsPerfil}>
              <div className={styles.statsItem}>
                <span className={styles.statsIcon} role="img" aria-label="favorites">❤️</span>
                <p>Meus favoritos: {quantidadeFavoritos?.length}</p>
              </div>
              {/* <div className={styles.statsItem}>
                <span className={styles.statsIcon} role="img" aria-label="ads">📣</span>
                <p>Anúncios de venda: 1</p>
              </div> */}
              <div className={styles.statsItem}>
                <span className={styles.statsIcon} role="img" aria-label="settings">⚙️</span>
                <p>Configurações</p>
              </div>
            </div>
            {userData?.tipo === 'usuario' ? (
              <button
                className={styles.btnVendedor}
                onClick={() => handleTornarUsuarioVendedor()}
              >
                Ser vendedor
              </button>
            ) : (
              <div className={styles.vendedorMsg}>
                <p className={styles.vendedorMsgText}>
                  Você já é um vendedor
                </p>
              </div>
            )}
          </>
        ) : (
          <div className={styles.editInputs}>
            {userData && (<>
              <input name="nome" value={userData?.username} onChange={handleChange} />
              <input name="sobrenome" value={userData?.sobrenome} onChange={handleChange} />
              <input name="email" value={userData?.email} onChange={handleChange} />
              <input name="celular" value={userData?.celular} onChange={handleChange} />
              <input name="cpf" value={userData?.cpf} onChange={handleChange} />
              <input name="dataNascimento" value={userData?.data_nascimento} onChange={handleChange} />
              <button className={styles.btnSalvar} onClick={handleSaveClick}>
                Salvar
              </button>
            </>)}
          </div>
        )}
      </div>
    </div>
  );
};
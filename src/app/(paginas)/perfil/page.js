'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trazerDadosUsuario, trazerQuantidadeFavoritos } from '@/app/servicos/backforapp-api/trazer-dados-usuario';
import { set } from 'react-hook-form';
import { tornarUsuarioVendedor } from '@/app/servicos/backforapp-api/tornar-usuario-vendedor';

const Profile = () => {
  const router = useRouter();
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
    console.log('Saving:', formData);
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
    await tornarUsuarioVendedor(userData.objectId, sessionToken);
  }

  useEffect(() => {
    const sessionToken = localStorage.getItem('session-token');
    if (!sessionToken) {
      router.push('/login');
    } else {
      handleTrazerDadosUsuario();
      handleTrazerQuantidadeFavoritos();
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: '20px 20px 40px' }}>
      <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '12px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', maxWidth: '700px', width: '100%', margin: '20px auto 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <div style={{ width: '150px', height: '150px', backgroundColor: '#e5e7eb', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ color: '#6b7280', fontSize: '70px' }}>👤</span>
          </div>
        </div>
        {!isEditing ? (
          <>
            <button
              onClick={handleEditClick}
              style={{ width: '100%', backgroundColor: '#1F314F', color: 'white', padding: '15px 40px', borderRadius: '24px', fontSize: '22px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: '0.2s' }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#fff';
                e.target.style.outline = '#1F314F solid 1px';
                e.target.style.color = '#1F314F';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#1F314F';
                e.target.style.outline = 'none';
                e.target.style.color = 'white';
              }}
            >
              Editar perfil
            </button>
            <div style={{ marginTop: '30px', color: '#1F314F', fontWeight: '600', fontSize: '24px', lineHeight: '1.6' }}>
              <p><strong>Nome:</strong> {userData?.username}</p>
              <p><strong>Sobrenome:</strong> {userData?.sobrenome}</p>
              <p><strong>E-mail:</strong> {userData?.email}</p>
              <p><strong>Celular:</strong> {userData?.celular}</p>
              <p><strong>CPF:</strong> {userData?.cpf}</p>
              <p><strong>Data de nascimento:</strong> {userData?.data_nascimento}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', color: '#1F314F', fontWeight: '600', fontSize: '18px' }}>
              <div style={{ textAlign: 'center' }}>
                <span role="img" aria-label="favorites" style={{ fontSize: '24px' }}>❤️</span>
                <p>Meus favoritos: {quantidadeFavoritos?.length}</p>
              </div>
              {/* <div style={{ textAlign: 'center' }}>
                <span role="img" aria-label="ads" style={{ fontSize: '24px' }}>📣</span>
                <p>Anúncios de venda: 1</p>
              </div> */}
              <div style={{ textAlign: 'center' }}>
                <span role="img" aria-label="settings" style={{ fontSize: '24px' }}>⚙️</span>
                <p>Configurações</p>
              </div>
            </div>
            {userData?.tipo === 'usuario' ? (
            <button
                style={{
                  width: '100%',
                  backgroundColor: '#186FA5',
                  color: 'white',
                  padding: '15px 40px',
                  borderRadius: '24px',
                  fontSize: '22px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '20px',
                  transition: '0.2s'
                }}
                onClick={() => handleTornarUsuarioVendedor()}
              >
                Ser vendedor
              </button> ) : (
                 <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px',
                    width: '100%',
                  }}>
                    <p style={{
                      textAlign: 'center',
                      color: '#2196f3',
                      fontWeight: 'bold',
                      fontSize: '22px',
                      background: '#e3f2fd',
                      borderRadius: '18px',
                      padding: '12px 0',
                      width: '100%'
                    }}>
                      Você já é um vendedor
                    </p>
                  </div>
              )}
          </>
        ) : (
          <div>
          {userData && (<>
            <input name="nome" value={userData?.username} onChange={handleChange} style={{ width: '100%', marginBottom: '15px', padding: '12px', fontSize: '18px', border: '1px solid #ccc', borderRadius: '6px' }} />
            <input name="sobrenome" value={userData?.sobrenome} onChange={handleChange} style={{ width: '100%', marginBottom: '15px', padding: '12px', fontSize: '18px', border: '1px solid #ccc', borderRadius: '6px' }} />
            <input name="email" value={userData?.email} onChange={handleChange} style={{ width: '100%', marginBottom: '15px', padding: '12px', fontSize: '18px', border: '1px solid #ccc', borderRadius: '6px' }} />
            <input name="celular" value={userData?.celular} onChange={handleChange} style={{ width: '100%', marginBottom: '15px', padding: '12px', fontSize: '18px', border: '1px solid #ccc', borderRadius: '6px' }} />
            <input name="cpf" value={userData?.cpf} onChange={handleChange} style={{ width: '100%', marginBottom: '15px', padding: '12px', fontSize: '18px', border: '1px solid #ccc', borderRadius: '6px' }} />
            <input name="dataNascimento" value={userData?.data_nascimento} onChange={handleChange} style={{ width: '100%', marginBottom: '15px', padding: '12px', fontSize: '18px', border: '1px solid #ccc', borderRadius: '6px' }} />
            <button onClick={handleSaveClick} style={{ width: '100%', backgroundColor: '#1F314F', color: 'white', padding: '15px 40px', borderRadius: '24px', fontSize: '22px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: '0.2s' }}>
              Salvar
            </button>
            
          </>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
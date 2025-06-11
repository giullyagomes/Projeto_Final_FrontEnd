'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { listarCarros } from '@/app/servicos/backforapp-api/listagem-veiculos'; // ajuste o caminho se necessário

const Home = () => {
  const [destaques, setDestaques] = useState([]);

  const steps = [
    { number: '1', text: 'Encontre o carro ou moto ideal' },
    { number: '2', text: 'Agende uma visita' },
    { number: '3', text: 'Finalize com segurança' },
  ];

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const veiculos = await listarCarros();
        setDestaques(veiculos.data.results.slice(0, 3));
      } catch (error) {
        setDestaques([]);
      }
    };
    fetchVeiculos();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Boas-vindas */}
        <div style={{ backgroundColor: '#ffffff', padding: '32px 20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ color: '#1F314F', fontSize: '28px', marginBottom: '10px', fontWeight: 'bold' }}>Bem-vindo ao seu AutoFácil</h1>
          <p style={{ color: '#1F314F', fontSize: '18px', margin: 0 }}>
            Aqui você encontra os melhores carros e motos para comprar ou anunciar. Aproveite para explorar as ofertas em destaque e descubra como é fácil negociar com segurança e praticidade!
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ color: '#1F314F', fontSize: '20px', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Destaques</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
            {destaques.length === 0 ? (
              <p style={{ color: '#1F314F', width: '100%', textAlign: 'center' }}>Nenhum veículo encontrado.</p>
            ) : (
              destaques.map((destaque, index) => (
                <div key={destaque.objectId} style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '8px', width: '30%', minWidth: '250px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                  <div style={{ height: '150px', backgroundColor: '#e5e7eb', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                    {destaque.fotos ? (
                      <img src={destaque.fotos[index]} alt={destaque.modelo} style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: '4px' }} />
                    ) : (
                      "🚗"
                    )}
                  </div>
                  <h3 style={{ fontSize: '16px', marginBottom: '5px', color: '#1F314F', fontWeight: '600' }}>{destaque.modelo || 'Modelo'}</h3>
                  <p style={{ color: '#1F314F', fontWeight: '600', marginBottom: '10px' }}>{destaque.preco ? `R$${destaque.preco}` : ''}</p>
                  <Link href={`/veiculos/${destaque.tipo_veiculo?.toLowerCase()}s/${destaque.objectId}`}>
                    <button style={{ backgroundColor: '#1F314F', color: '#ffffff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Ver Detalhes</button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Como Funciona Section */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ color: '#1F314F', fontSize: '20px', marginBottom: '20px', fontWeight: 'bold' }}>Como Funciona?</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
            {steps.map((step, index) => (
              <div key={index} style={{ width: '30%', minWidth: '200px', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#e5e7eb', borderRadius: '50%', width: '50px', height: '50px', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F314F', fontWeight: '600', fontSize: '18px' }}>
                  {step.number}
                </div>
                <p style={{ color: '#1F314F', fontSize: '14px' }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Garantia e Confiança Section */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <h2 style={{ color: '#1F314F', fontSize: '20px', marginBottom: '20px', fontWeight: 'bold', width: '100%' }}>Garantia e Confiança</h2>
          
          <p style={{ color: '#1F314F', fontSize: '14px', flex: '1', textAlign: 'left', margin: '0' }}>
            Ao utilizar nossa plataforma, você concorda com nossos termos de uso, que garantem a proteção dos seus dados e a segurança em todas as transações. Nosso site utiliza tecnologia de ponta para proteger suas informações pessoais e oferece um ambiente seguro para compra, venda e negociação de veículos. Recomendamos que nunca compartilhe dados sensíveis com terceiros e, em caso de dúvidas, consulte sempre nossa política de privacidade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
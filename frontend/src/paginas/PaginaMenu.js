
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'para-empezar', title: 'PARA EMPEZAR', image: '/assets/images/para-empezar.jpg' },
  { id: 'sopas', title: 'SOPAS', image: '/assets/images/sopas.jpg' },
  { id: 'carnes', title: 'CARNES', image: '/assets/images/carnes.jpg' },
  { id: 'parrilla', title: 'PARRILLA', image: '/assets/images/parrilla.jpg' },
  { id: 'especiales', title: 'ESPECIALES', image: '/assets/images/especiales.jpg' },
  { id: 'ensaladas', title: 'ENSALADAS', image: '/assets/images/ensaladas.jpg' },
  { id: 'hamburguesas', title: 'HAMBURGUESAS', image: '/assets/images/hamburguesas.jpg' },
  { id: 'infantil', title: 'INFANTIL', image: '/assets/images/infantil.jpg' },
  { id: 'cafes', title: 'CAFÉS', image: '/assets/images/cafes.jpg' },
  { id: 'jugos', title: 'JUGOS', image: '/assets/images/jugos.jpg' },
  { id: 'bebidas', title: 'BEBIDAS', image: '/assets/images/bebidas.jpg' },
  { id: 'licores', title: 'LICORES', image: '/assets/images/licores.jpg' },
];

const PaginaMenu = () => {
  return (
    <main className="vista-menu menu-landing">
      <div className="menu-header" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
        <div className="menu-titulo" style={{ width: '100%', textAlign: 'center' }}>
          <h1>Nuestro Menú</h1>
        </div>
      </div>

      <section className="menu-grid-container">
        <div className="menu-grid">
          {categories.map((c) => (
            <article className="menu-card" key={c.id}>
              <Link to={`/menu/${c.id}`} className="menu-card-link">
                <div className="menu-card-img">
                  <img src={c.image} alt={c.title} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span className="menu-card-btn">{c.title}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PaginaMenu;

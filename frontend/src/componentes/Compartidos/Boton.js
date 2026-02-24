/**
 * ============================================
 * BOOKIT - Componente Boton Reutilizable
 * Archivo: componentes/Compartidos/Boton.js
 * ============================================
 * 
 * Props:
 *   - children: Contenido del botón (texto, iconos)
 *   - variante: 'primario' (amarillo), 'secundario' (outline), 'peligro' (rojo)
 *   - onClick: Función al hacer clic
 *   - disabled: Deshabilitar el botón
 *   - tipo: Tipo HTML del botón ('button', 'submit')
 */

import React from 'react';

// Prefer CSS-driven classes but keep inline fallbacks for safety
const estilosVariante = {
  primario: {
    backgroundColor: '#FDB022',
    color: '#1e3a5f',
    border: 'none',
    fontWeight: '700',
  },
  secundario: {
    backgroundColor: 'transparent',
    color: '#718096',
    border: '1.5px solid #e2e8f0',
    fontWeight: '500',
  },
  peligro: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    fontWeight: '600',
  },
};

const Boton = React.forwardRef(({ children, variante = 'primario', onClick, disabled = false, tipo = 'button', className = '' }, ref) => {
  const estilos = {
    ...estilosVariante[variante],
    padding: '10px 22px',
    borderRadius: '10px',
    fontSize: '0.9rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: '0.2s ease',
    fontFamily: 'inherit',
  };

  // prefer CSS class .btn when available for full design control
  const clase = `btn btn--${variante} ${className}`.trim();

  // Determine if there is any children to render
  const hasChildren = React.Children.count(children) > 0;

  // Default icon for 'peligro' when no children provided: use Icons8 image (white)
  const defaultPeligroIcon = (
    <img
      src="https://img.icons8.com/ios-filled/16/ffffff/trash--v1.png"
      alt="Eliminar"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    />
  );

  return (
    <button ref={ref} className={clase} style={estilos} onClick={onClick} disabled={disabled} type={tipo}>
      {hasChildren ? children : (variante === 'peligro' ? defaultPeligroIcon : null)}
    </button>
  );
});

export default Boton;

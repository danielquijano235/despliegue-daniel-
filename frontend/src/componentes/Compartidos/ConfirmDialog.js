import React, { useEffect, useRef } from 'react';
import Boton from './Boton';

/**
 * ConfirmDialog
 * Props:
 *  - abierto: boolean
 *  - titulo: string
 *  - mensaje: string
 *  - onConfirm: function
 *  - onCancel: function
 */
const ConfirmDialog = ({ abierto, titulo = 'Confirmar', mensaje = '¿Estás seguro?', onConfirm, onCancel }) => {
  const dialogRef = useRef(null);
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!abierto) return;

    const previouslyFocused = document.activeElement;
    const node = dialogRef.current;
    const focusable = node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel && onCancel();
      }
      if (e.key === 'Tab') {
        // trap focus inside dialog
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [abierto, onCancel]);

  if (!abierto) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 420 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
        ref={dialogRef}
      >
        <div className="modal-header">
          <h2 id="confirm-dialog-title" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 2L2 20h20L12 2z" fill="#F59E0B" />
              <path d="M11 9h2v5h-2V9zm0 7h2v2h-2v-2z" fill="#1e3a5f" />
            </svg>
            {titulo}
          </h2>
          <Boton variante="ghost" className="modal-cerrar" onClick={onCancel} aria-label="Cerrar diálogo">✕</Boton>
        </div>
        <div style={{ padding: '18px 24px' }}>
          <p id="confirm-dialog-desc" style={{ margin: 0, color: 'var(--color-texto-claro)' }}>{mensaje}</p>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', padding: '16px 24px 24px' }}>
          <Boton variante="secundario" onClick={onCancel}>Cancelar</Boton>
          <Boton variante="primario" onClick={onConfirm} ref={confirmRef}>Confirmar</Boton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

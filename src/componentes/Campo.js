import React, { useRef } from 'react';
import './Campo.css';

function Campo({ comportamento, editavel, children, onEdit, id, ...outros }) {
  const referenciaElemento = useRef(null);

  if (editavel === undefined) {
    editavel = true;
  }

  const handleBlur = () => {
    const conteudoEditado = referenciaElemento.current.textContent;
    onEdit(id, conteudoEditado);
  };

  switch (comportamento) {
    case 'h1':
      return (
        <div
          ref={referenciaElemento}
          contentEditable={editavel}
          onBlur={handleBlur}
          {...outros}
        >
          <h1>{children}</h1>
        </div>
      );

    case 'h2':
      return (
        <div
          ref={referenciaElemento}
          contentEditable={editavel}
          onBlur={handleBlur}
          {...outros}
        >
          <h2>{children}</h2>
        </div>
      );

    case 'h3':
      return (
        <div
          ref={referenciaElemento}
          contentEditable={editavel}
          onBlur={handleBlur}
          {...outros}
        >
          <h3>{children}</h3>
        </div>
      );

    case 'h4':
      return (
        <div
          ref={referenciaElemento}
          contentEditable={editavel}
          onBlur={handleBlur}
          {...outros}
        >
          <h4>{children}</h4>
        </div>
      );

    case 'h5':
      return (
        <div
          ref={referenciaElemento}
          contentEditable={editavel}
          onBlur={handleBlur}
          {...outros}
        >
          <h5>{children}</h5>
        </div>
      );

    case 'h6':
      return (
        <div
          ref={referenciaElemento}
          contentEditable={editavel}
          onBlur={handleBlur}
          {...outros}
        >
          <h6>{children}</h6>
        </div>
      );

    case 'p':
      return (
        <div
          ref={referenciaElemento}
          contentEditable={editavel}
          onBlur={handleBlur}
          {...outros}
        >
          <p>{children}</p>
        </div>
      );

    default:
      return (
        <div
          ref={referenciaElemento}
          //   contentEditable={editavel}
          onBlur={handleBlur}
          {...outros}
        >
          {children}
        </div>
      );
  }
}

export default Campo;

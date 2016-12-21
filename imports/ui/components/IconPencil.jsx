import React from 'react';

const IconPencil = (props) => {
  const fill = props.fill || 'blue'

  return (
    <svg className="pencil" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
      <title id="title">Pencil</title>
      <path fill={fill} d="M22.443 12.15l-11.286 11.3-2.606-2.606 11.292-11.294 2.6 2.6zM23.15 11.443l-2.599-2.599 1.727-1.728c0.391-0.391 1.024-0.388 1.417 0.003l1.18 1.177c0.392 0.391 0.395 1.025 0.005 1.416l-1.729 1.731zM7.904 21.611l2.495 2.495-3.135 0.617 0.64-3.113zM7 21l-1 5 5-1 14.58-14.58c0.784-0.784 0.786-2.054 0.010-2.83l-1.18-1.179c-0.779-0.779-2.037-0.783-2.83 0.010l-14.58 14.58z"></path>
    </svg>
  )
}

export default IconPencil;

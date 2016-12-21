import React from 'react';

const IconArrowDown = (props) => {
  const fill = props.fill || 'blue'

  return (
    <svg className="arrow-down-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
      <title id="title">Pencil</title>
      <path fill={fill} d="M7.406 7.828l4.594 4.594 4.594-4.594 1.406 1.406-6 6-6-6z"></path>
    </svg>
  )
}

export default IconArrowDown;

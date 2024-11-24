import React, { useContext } from 'react'
import { ThemeContext } from './../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const Button = ({ type, onAction, label, disabled = false }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <button
      id={theme}
      className={`actionButton ${type}`}
      onClick={onAction}
      disabled={disabled}
      style={{ background: disabled && 'black', color: disabled && 'white', border: disabled && 'none' }}
    >
      {
        type == "create_new" &&
        <>
          <FontAwesomeIcon icon={faPlus} />
          &nbsp;&nbsp;
        </>
      }
      

      {
        type == "edit" && <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
      }
      {
        type == "delete" && <FontAwesomeIcon icon="fa-solid fa-trash" />
      }
      {label}
    </button>
  )
}

export default Button

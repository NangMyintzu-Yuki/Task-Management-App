import { useState, useContext } from 'react'
import { ThemeContext } from './../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeToggleButton = () =>{
  const { theme, toggleTheme} = useContext(ThemeContext)

  return (
    <button
      onClick={toggleTheme}
      className="toggleThemeBtn"
      
    >
      {theme === 'dark' ? (
        <FontAwesomeIcon icon={faSun} color="#fff" size="lg" />
      ) : (
        <FontAwesomeIcon icon={faMoon} color="#fff" size="lg" />
      )}
    </button>
  )
 
}

export default ThemeToggleButton;
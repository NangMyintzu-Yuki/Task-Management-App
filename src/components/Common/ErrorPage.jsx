import React, { useContext } from 'react'
import '../css/404.css'
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { ThemeContext } from './../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
const ErrorPage = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext)
  const goBack = () => {
    navigate('/');
  }

  return (
    <div id={theme}>
      <div className="errorPageContainer">
        <h1>4<span><FontAwesomeIcon icon={faGhost} />
        </span>4</h1>
        <h2>Error: 404 page not found</h2>
        <p>Sorry, the page you're looking for cannot be accessed</p>
        <br />
        <Button type="back" label="Back" onAction={goBack} />
      </div>
    </div>
  )
}

export default ErrorPage

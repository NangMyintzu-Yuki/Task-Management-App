import React, { useEffect, useContext } from 'react'
import Header from './Header';
import Sidebar from './../components/Common/Sidebar';
import { ThemeContext } from './../ThemeContext';
const MainLayout = ({children}) => {
  const { theme } = useContext(ThemeContext)

  return (

    <div id={theme}>
      <Header />
      <main>
        <div className="mainContainer">
          {children}
        </div>
      </main>
    </div>
  )
}
export default MainLayout;

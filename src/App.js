import { createContext, useState, useEffect } from 'react'

import Header from './components/NavBar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

const ThemeContext = createContext()

function App(){
    const [darkMode, setDarkMode] = useState(()=>JSON.parse(localStorage.getItem('theme'))||false)

    useEffect(()=>{
        console.log(darkMode)  
        localStorage.setItem('theme', JSON.stringify(darkMode));
    })

    const toggleMode = () =>{
        setDarkMode(prevMode => !prevMode)
    } 

    return (
        <ThemeContext.Provider value={{darkMode, toggleMode}}>
            <div className={darkMode? "container dark" :"container"}>
                <Header />
                <MainContent />
                <Footer />
            </div>
        </ThemeContext.Provider>
    )
}

export { App, ThemeContext}
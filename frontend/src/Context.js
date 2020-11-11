import React, { useContext, useEffect, useRef, useState } from 'react'

const Context = React.createContext()

export default function ContextoComp({children}){
    const [viewport, setViewport] = useState(window.innerWidth)
    const colored = useRef(null)
    const [isColored, setIsColored] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)


    return (
        <Context.Provider value={{viewport, setViewport, colored, isColored, isDark, setIsDark, openSnackbar, setOpenSnackbar}}>
            {children}
        </Context.Provider>
    )
}

export const useDataLayer =()=> useContext(Context)
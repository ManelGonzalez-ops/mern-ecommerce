import React, {useState, useEffect} from 'react'


export default function ImagenCarr({ imagenes }) {

    const [url, setUrl] = useState(imagenes.placeholder)
    useEffect(() => {
        fetch(imagenes.src)
            .then(res => res.blob())
            .then(blob => {
                const Fr = new FileReader()
                Fr.onload = function(){
                    setUrl(this.result)
                }
                Fr.readAsDataURL(blob)
            })
    }, [])
    
   
    return (
        <div style={{backgroundImage: `url(${url})`, height: "100%"}} alt="kaka" />
    )
}

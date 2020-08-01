import React, { useEffect, useState, Fragment } from 'react'
import ImagenCarr from "./imi"



 function ImageIterator({ images }) {

    return <Fragment>{images.map((item, index) => 
   
        <ImagenCarr key={index + 1}
        imagenes={
            {
                src: item.src,
                placeholder: item.placeholder

            }} />)}</Fragment>

}




export default ImageIterator
import React, { useState, useEffect } from 'react'
import Products from "../data"

export default function Details(props) {
    const [productoSeleccion, setProductoSeleccion] = useState("")

    // useEffect(() => {
    //     const iden = props.match.params.details
    //     console.log(iden)
    //     const itemBuscado = Products.products.find(item => item._id === iden)
    //     //una puta hora perdida por no usar el spread operator,
    //     console.log(itemBuscado, "el de siempre")
    //     console.log(itemBuscado, "con spread")
    //     setProductoSeleccion(itemBuscado)
    // }, [])
    const fetchProduct = async(param)=>{
        const prod = await fetch(`http://localhost:8000/${param}`)
        const proda = await prod.json()
        return proda
    }
    useEffect(() => {
        const iden = props.match.params.details
        console.log(iden)
        fetchProduct(iden)
        .then(item=>{
            setProductoSeleccion(item)
        })
        .catch(error=>{console.log(error)})
    }, [])
    console.log(productoSeleccion)

   

    return (
        <div>
            {productoSeleccion.name}
        </div>
    )
}


//observaciones.
//Si utilizamos el filter tenemos que hacer un copia del objeto por cojones ya que si no obtenemos un nuevo objecto pero dentro de su estructura padre estructura anterior (array)

//Con el metodo fiend retornamos el valor directamente, en este caso el objecto, y no tenemos que usar spread operator.
import React, {useState, useEffect} from 'react'
import styled from "styled-components"

export default function RatingStar({rating}) {

const [estrella1, setStrella1] = useState("")
const [estrella2, setStrella2] = useState("")
const [estrella3, setStrella3] = useState("")
const [estrella4, setStrella4] = useState("")
const [estrella5, setStrella5] = useState("")

useEffect(()=>{
console.log(rating)
    setStrella1(()=>
    rating >= 1? "orange": "white")
    setStrella2(()=>
    rating >= 2? "orange": "white")
    setStrella3(()=>
    rating >= 3? "orange": "white")
    setStrella4(()=>
    rating >= 4? "orange": "white")
    setStrella5(()=>
    rating >= 5? "orange": "white")

},[])
    const fillColor = (props) =>(`
        fill: ${props.reting}
    `)

    const SvgEstrella1 = styled.svg`
    height: 25;
    width: 23;
     ${props=>fillColor(props)};
    
    `
    const SvgEstrella2 = styled.svg`
    height: 25;
    width: 23;
     ${props=>fillColor(props)};
    
    `
    const SvgEstrella3 = styled.svg`
    height: 25;
    width: 23;
     ${props=>fillColor(props)};
    
    `
    const SvgEstrella4 = styled.svg`
    height: 25;
    width: 23;
     ${props=>fillColor(props)};
    
    `
    const SvgEstrella5 = styled.svg`
    height: 25;
    width: 23;
     ${props=>fillColor(props)};
    
    `
    return (
        <div class="stars">
            <SvgEstrella1 reting={estrella1} class="estrella" height="25" width="23" >
                <polygon  points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" strokeWidth="1" stroke="black" />
            </SvgEstrella1>
            <SvgEstrella2 reting={estrella2} class="estrella" height="25" width="23">
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"  />
            </SvgEstrella2>
            <SvgEstrella3 reting={estrella3} class="estrella" height="25" width="23">
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"  />
            </SvgEstrella3>
            <SvgEstrella4 reting={estrella4} class="estrella" height="25" width="23">
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"  />
            </SvgEstrella4>
            <SvgEstrella5 reting={estrella5} class="estrella" height="25" width="23">
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
            </SvgEstrella5>
        </div>
    )
}

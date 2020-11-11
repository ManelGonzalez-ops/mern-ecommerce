import { Box, makeStyles, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import React from 'react'


const styles = makeStyles(theme=>({
    
    // root: {
    //     paddingRight: props=>props.size
    // }
}))

export default function RatingStar({ rating, display, noSpacing, size}) {

    const clases = styles({size})
    return (
        <Box component="fieldset" 
        pl={noSpacing && 0}
        pt={noSpacing && 0}
        border={noSpacing && "none"}
        ml={noSpacing && 0}
        pb={noSpacing && 0}
        position="relative"
        left={noSpacing && "-5px"}
        borderColor="transparent" style={display === "inline" ? { display: "inline" } : {}}>
            <Rating 
            value={rating}
             readOnly 
             classes={{
                 root: clases.root
             }}
             />
        </Box>
    )
}

RatingStar.defaultProps = {
    size: "inherit",
    display: "block"
}
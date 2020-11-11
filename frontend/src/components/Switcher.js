import React from "react"
import { useDataLayer } from "../Context";
import { FormControlLabel, IconButton, Switch } from "@material-ui/core";
import Brightness5Icon from "@material-ui/icons/Brightness5"
import Brightness3Icon from "@material-ui/icons/Brightness3"



export const Switcher = () => {
    const { isDark, setIsDark, viewport } = useDataLayer()

    const handleSwitch = () => {
        setIsDark(prev => !prev)
    }


    if (viewport > 700) {
        return (
            <FormControlLabel
                style={{ marginLeft: "1.2rem" }}
             
                control={
                    <Switch
                        checked={isDark}
                        onChange={handleSwitch}
                        name="checkedB"
                        size="small"
                        


                    />
                }
                label={!isDark ?
                    <Brightness5Icon style={{ position: "relative", top: "4px", color: "orange" }} /> : <Brightness3Icon style={{ position: "relative", top: "4px" }} />}
            />
        )
    }
    else {
        return (
            <div style={{ marginLeft: "0.6rem" }}>
              
                    {!isDark ?
                        <IconButton onClick={()=>{setIsDark(true)}}>
                            <Brightness5Icon style={{color: "orange"}} />
                        </IconButton> : 
                        <IconButton onClick={()=>{setIsDark(false)}}>
                            <Brightness3Icon />
                        </IconButton>
                    }
            </div>
        )
    }
}
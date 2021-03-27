import React from "react"
import { useDataLayer } from "../Context";
import { FormControlLabel, IconButton, makeStyles, Switch } from "@material-ui/core";
import Brightness5Icon from "@material-ui/icons/Brightness5"
import Brightness3Icon from "@material-ui/icons/Brightness3"
import "./switcher.scss"

const useStyles = makeStyles({
    root: {
        width: "65px"
    },
    thumb: {
        borderRadius: "50%",
        padding: "3px",
        //background: "white"
    },
    label: {
        background: "#49538b",
        borderRadius: "100%",
        padding: "3px"
    },
    thumb: {
        background: "#49538b"
    }
})

const ThumbIcon = ({ children }) => {

    const styles = useStyles()
    return (
        <div
            className={styles.thumb}
        >
            {children}
        </div>
    )
}

export const Switcher = () => {
    const { isDark, setIsDark, viewport } = useDataLayer()

    const handleSwitch = () => {
        setIsDark(prev => !prev)
    }

    const styles = useStyles()

    if (viewport > 700) {
        return (
            <FormControlLabel
                style={{ marginLeft: "1.2rem" }}
                className="switcher"
                control={
                    <Switch
                        checked={isDark}
                        onChange={handleSwitch}
                        name="checkedB"
                        icon={<Brightness3Icon />}
                        checkedIcon={<Brightness5Icon style={{ color: "orange" }} />}
                        classes={{
                            root: styles.root,
                        }}
                        edge="start"
                        disableRipple

                    />
                }
            // label={!isDark ?
            //     <Brightness5Icon style={{ position: "relative", top: "4px", color: "orange" }} /> : <Brightness3Icon style={{ position: "relative", top: "4px" }} />}
            />
        )
    }
    else {
        return (
            <div style={{ marginLeft: "0.6rem" }}>

                {!isDark ?
                    <IconButton onClick={() => { setIsDark(true) }}>
                        <Brightness5Icon style={{ color: "orange" }} />
                    </IconButton> :
                    <IconButton onClick={() => { setIsDark(false) }}>
                        <Brightness3Icon />
                    </IconButton>
                }
            </div>
        )
    }
}





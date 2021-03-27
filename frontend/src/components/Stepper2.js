import React from 'react'
import { makeStyles, MobileStepper, Step, StepLabel, Stepper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useDataLayer } from '../Context';
import { useHistory } from 'react-router';




const steps = ["signin", "shipping", "payment method", "checkout"]

const useStyles = makeStyles({
    root: {
        maxWidth: "100vw",
        flexGrow: 1,
        transition: "transform 0.5s ease"
    },
});

export const Stepper2 = () => {

    const { viewport, setOpenSnackbar } = useDataLayer()
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const { currentStep } = useSelector(state => state.currentStep)
    const { userInfo } = useSelector(state => state.userSignin)

    const removeUnderscore = (word) => {
        return word.replace(" ", "_")
    }

    const changeRoute = (label) => {
        if (label === "payment method") {
            console.log(label, "hiopoadetec")
            history.push(`/${removeUnderscore(label)}`)
            return
        }
        history.push(`/${label}`)
    }


    const handleMoveBack = (label) => {

        if (label === "signin" && !!userInfo) {
            setOpenSnackbar(true)
            return
        }
        if (steps.indexOf(label) < currentStep) {
            dispatch({ type: "SET_STEP", payload: steps.indexOf(label) })

            changeRoute(label)
        }

    }

    if (viewport < 500) {
        return (
            <MobileStepper
                variant="progress"
                steps={4}
                position="static"
                activeStep={currentStep}
                LinearProgressProps={{
                    classes: {
                        root: classes.root
                    }
                }}
            />

        )
    }

    return (
        <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}
                >
                    <StepLabel
                        onClick={() => {
                            handleMoveBack(label)
                        }}
                    >{label}</StepLabel>
                </Step>
            ))}
        </Stepper>

    )

}

import React from 'react'
import { makeStyles, MobileStepper, Step, StepLabel, Stepper } from '@material-ui/core';
import { useWindowWidth } from '../utils/useWindowWidth';
import { useSelector } from 'react-redux';
import { useDataLayer } from '../Context';




const steps = ["login", "shipping", "payment method", "checkout"]

const useStyles = makeStyles({
    root: {
      maxWidth: "100vw",
      flexGrow: 1,
      transition: "transform 0.5s ease"
    },
  });

export const Stepper2 = () => {

    //const [viewport] = useWindowWidth() 
    const {viewport} = useDataLayer()
    const classes = useStyles()

    const {currentStep} = useSelector(state=>state.currentStep)


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
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>

    )

}

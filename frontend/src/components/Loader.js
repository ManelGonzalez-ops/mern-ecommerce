import { CircularProgress } from '@material-ui/core'
import React from 'react'

export const Loader = () => {
    return (
        <span className="loader-placer">
            <CircularProgress />
        </span>
    )
}

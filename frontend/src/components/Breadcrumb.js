import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {Typography, Link, createMuiTheme, ThemeProvider} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDataLayer } from '../Context';

Breadcrumb.propTypes = {
    category: PropTypes.string,
    goBack: PropTypes.func
}

export default function Breadcrumb({category, goBack, isColored}) {
    const {isDark} = useDataLayer()
    const theme = createMuiTheme({
        palette: {
            type: isDark? "dark": isColored? "dark":"light" 
        }
    })
   
    return (
        <ThemeProvider theme={theme}>
        <Breadcrumbs 
        className="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
           
            <Link color="inherit" onClick={goBack} style={{cursor: "pointer"}}>
                Categories
        </Link>
    <Typography color="textPrimary">{category ? category: "All"}</Typography>
        </Breadcrumbs>
        </ThemeProvider>
    )
}

import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import RatingStars from "./ratingStar"
import { motion } from "framer-motion"
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, Fade, IconButton, Link, ListItemText, makeStyles, Typography, useTheme } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import clsx from 'clsx'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    borderRadius: "4px",
    background: "white",
    [theme.breakpoints.up("xs")]: {
      //maxHeight: "200px",
      height: "200px",
      objectFit: "contain"
    },

  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  productName: {
    //maxHeight: 150
    lineHeight: 1.4,
    fontWeight: 600,
    color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.primary.dark
  },
  cardContent: {
    padding: theme.spacing(2),
    "&$:last-child": {
      padding: theme.spacing(2)
    }
  },
  card: {
    alignSelf: "end",
    [theme.breakpoints.up("xs")]: {
      margin: "0 calc(1rem + 2%)"
    },
    [theme.breakpoints.up("sm")]: {
      margin: "unset"
    },
    backgroundColor: theme.palette.type === "dark" ? "#303030" : "inherit",
    //boxShadow: "0 10px 6px -6px rgba(119, 119, 119, 0.2), 0px 2px 1px -1px rgba(0,0,0,0.1), 0px 1px 1px 0px rgba(0,0,0,0.07), 0px 1px 3px 0px rgba(0,0,0,0.05)"
  },
  headerBox: {
    backgroundColor: theme.palette.type === "dark" ? "#303030" : "inherit"
  },
  icon: {
    fill: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.primary.main
  }

}));

export default function Products({ item, setSelection, isSelected, openAside }) {
  const classes = useStyles();

  const history = useHistory()

  const imgi = useRef()
  const [productHovered, setProductHovered] = useState(false)
  const [cartHovered, setCartHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const transition = { duration: 0.4, ease: [0.6, 0.01, -0.05, 0.9] }
  const [imgLoaded, setImgLoaded] = useState(false)

  const handlePointerEvents = (activate) => {
    activate ?
      imgi.current.style.pointerEvents = "auto"
      :
      imgi.current.style.pointerEvents = "none"
  }

  useEffect(() => {
    imgi.current.addEventListener("ontransitionstart", () => {
      handlePointerEvents(false)
    })

  }, [])



  const handleOpen = () => {
    if (openAside) {
      setTimeout(() => {
        isSelected ?
          setSelection("")
          :
          setSelection(item._id)
      }, 600)
    }
    else {
      isSelected ?
        setSelection("")
        :
        setSelection(item._id)
    }

  }


  const theme = useTheme()
  return (

    <Card
      className={classes.card}
      elevation={2}
    >
      <CardActionArea>
        <motion.div
          ref={imgi}
          onClick={handleOpen}
          style={theme.palette.type === "dark" ? { margin: "5px" } : null}
          className={clsx("img-prud", {
            abridor: isSelected
          })}
          //layout
          layout={isSelected}
          onTransitionEnd={() => {
            handlePointerEvents(true)
          }}
        >
          <Fade in={imgLoaded}>
            <img
              className={classes.media}
              //component="img"
              onLoad={() => { setImgLoaded(true) }}
              src={item.image}
              title="Paella dish"
              style={{ display: imgLoaded ? "block" : "none" }}
            />
          </Fade>
          {/* {!imgLoaded && <CircularProgress color="secondary" />} */}


        </motion.div>
      </CardActionArea>
      <CardContent
        // classes={{root: classes.cardContent}}
        style={{
          padding: theme.spacing(1),
          paddingTop: 0,
          paddingLeft: "14px",
          paddingBottom: 0
        }}
      >
        <Box
          component="div"
          my={1}
          textOverflow="ellipsis"
          overflow="hidden"
          bgcolor="background.paper"
          classes={{ root: classes.headerBox }}
        >
          <Typography variant="h6" gutterBottom
            classes={{ root: classes.productName }}
          //color="primary"
          >
            <Link
              onClick={() => { history.push(`/product/${item._id}/`) }}
              color="inherit"
              underline="none"
            >
              {item._id}
              {item.name.length > 40 ? `${item.name.slice(0, 38)}...` : item.name}
            </Link>
          </Typography>
          <Typography color="textSecondary" variant="caption" >
            {item.brand}
          </Typography>
        </Box>

        <RatingStars
          rating={item.rating}
          noSpacing
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <ListItemText >
            <Chip label={`${item.price} $`} aria-label="price" />


          </ListItemText>
          <IconButton aria-label="see more"
            onClick={() => { history.push(`/product/${item._id}/`) }} >
            <ShoppingBasketIcon
              classes={{ root: classes.icon }}
            />
          </IconButton>
        </Box>
      </CardContent>

    </Card>

  )
}



export const LoaderPnp = () => <div className="svggWrapper"><svg width="250" height="250" viewBox="0 0 312 312" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="luader">

  <g id="loading-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(156.000000, 156.000000) rotate(45.000000) translate(-156.000000, -156.000000) translate(46.000000, 46.000000)">

    <rect id="purple" fill="#BD0FE1" x="0" y="0" width="103" height="103" />

    <rect id="aqua" fill="#0EE1BE" x="0" y="117" width="103" height="103" />

    <rect id="red" fill="#E10E32" x="117" y="0" width="103" height="103" />

    <rect id="green" fill="#32E10E" x="117" y="117" width="103" height="103" />
  </g>
</svg>
</div >

export const Loader1 = () => <div className="svggWrapper"><div className="contain">

  <svg height="80" className="kakaka" viewBox="-30 0 255 80" width="255">
    <ellipse cx="25" cy="20" fill="none" rx="10" ry="10"></ellipse>
  </svg>
  <svg height="80" className="kakaka" viewBox="-30 0 255 80" width="255">
    <ellipse cx="25" cy="20" fill="none" rx="10" ry="10"></ellipse>
  </svg>
  <svg height="80" className="kakaka" viewBox="-30 0 255 80" width="255">
    <ellipse cx="25" cy="20" fill="none" rx="10" ry="10"></ellipse>
  </svg>
  <svg height="80" className="kakaka" viewBox="-30 0 255 80" width="255">
    <ellipse cx="25" cy="20" fill="none" rx="10" ry="10"></ellipse>
  </svg>
  <svg height="80" className="kakaka" viewBox="-30 0 255 80" width="255">
    <ellipse cx="25" cy="20" fill="none" rx="10" ry="10"></ellipse>
  </svg>
  <svg height="80" className="kakaka" viewBox="-30 0 255 80" width="255">
    <ellipse cx="25" cy="20" fill="none" rx="10" ry="10"></ellipse>
  </svg>
  <svg height="80" className="kakaka" viewBox="-30 0 255 80" width="255">
    <ellipse cx="25" cy="20" fill="none" rx="10" ry="10"></ellipse>
  </svg>
  <svg height="80" className="kakaka" viewBox="-30 0 255 80" width="255">
    <ellipse cx="25" cy="20" fill="none" rx="10" ry="10"></ellipse>
  </svg>
  <svg height="80" className="kakaka" viewBox="-30 0 255 80" width="255">
    <ellipse cx="25" cy="20" fill="none" rx="10" ry="10"></ellipse>
  </svg>
  <svg height="80" className="kakaka" viewBox="-30 0 255 80" width="255">
    <ellipse cx="25" cy="20" fill="none" rx="10" ry="10"></ellipse>
  </svg>
</div>
</div>
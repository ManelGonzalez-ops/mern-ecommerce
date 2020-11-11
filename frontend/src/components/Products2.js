import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Image from "../media/images/p3.jpg"
import RatingStars from "./ratingStar"
import { motion } from "framer-motion"
import { Avatar, Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Chip, IconButton, Link, ListItemText, makeStyles, Paper, Typography, useTheme } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
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
      maxHeight: "200px",
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
    [theme.breakpoints.up("xs")]:{
      margin: "0 calc(1rem + 2%)"
    },
    [theme.breakpoints.up("sm")]:{
      margin: "unset"
    },
    backgroundColor: theme.palette.type === "dark"? "#303030": "inherit",
    //boxShadow: "0 10px 6px -6px rgba(119, 119, 119, 0.2), 0px 2px 1px -1px rgba(0,0,0,0.1), 0px 1px 1px 0px rgba(0,0,0,0.07), 0px 1px 3px 0px rgba(0,0,0,0.05)"
  },
  headerBox: {
    backgroundColor: theme.palette.type === "dark"? "#303030": "inherit"
  },
icon:{
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
        style={theme.palette.type === "dark"? {margin: "5px"}: ""}
        className={clsx("img-prod", {
          abridor: isSelected
        })}

        layout
        onTransitionEnd={() => {
          handlePointerEvents(true)
        }}
      >
       
        <CardMedia
          className={classes.media}
          component="img"

          image={item.image}
          title="Paella dish"
        />

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
          classes={{root: classes.headerBox}}
        >
          <Typography variant="h6" gutterBottom
          classes={{root: classes.productName}}
          //color="primary"
          >
            <Link
             onClick={()=>{history.push(`/product/${item._id}/`)}}
             color="inherit"
             underline="none"
             
             >
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
          <Chip label={`${item.price} $`} aria-label="price"/>
          

          </ListItemText>
          <IconButton aria-label="see more"
          onClick={()=>{history.push(`/product/${item._id}/`)}} >
            <ShoppingBasketIcon 
            classes={{root: classes.icon}}
            />
          </IconButton>
        </Box>
      </CardContent>

    </Card>
   
  )
}


const CartSvg = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cartt">
  <path d="M15.55 13C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.9643 5.32843 21.0075 5.15747 21.0054 4.98406C21.0034 4.81064 20.956 4.64077 20.8681 4.49126C20.7803 4.34175 20.6548 4.21778 20.5043 4.13162C20.3538 4.04546 20.1834 4.00009 20.01 4H5.21L4.27 2H1V4H3L6.6 11.59L5.25 14.03C4.52 15.37 5.48 17 7 17H19V15H7L8.1 13H15.55ZM6.16 6H18.31L15.55 11H8.53L6.16 6ZM7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" />
</svg>


const CircleSvg = () => <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12.5" cy="12.5" r="12.5" fill="#ED053D" />
</svg>

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
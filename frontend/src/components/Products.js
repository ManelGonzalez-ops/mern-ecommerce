import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Image from "../media/images/p3.jpg"
import RatingStars from "./ratingStar"


export default function Products({ item }) {

    const [productHovered, setProductHovered] = useState(false)
    const [cartHovered, setCartHovered] = useState(false)


    return (
        <div
            className={productHovered ? "product hovered" : "product"}
            onMouseOver={() => { setProductHovered(true) }}
            onMouseOut={() => { setProductHovered(false) }}
            >
            <Link to={`product/${item._id}/`}><div style={{backgroundImage: `url(${item.image})`}} className="img-product" ></div></Link>
            <div className="cart-body">
                <p className={item.name.length <= 60 ? "producto__nombre":"producto__nombre encojer"}>
                    <Link
                        to={`/product/${item._id}/`}>{item.name}</Link></p>
                <p className="producto__brand">{item.brand}</p>
              <RatingStars rating={item.rating}/>
                <div className="flex-wrapper">
                    <p className="producto__price">
                        $ {item.price}
                    </p>
                   
                    <Link
                    to={`/product/${item._id}/`}
                    className={cartHovered ? "pseudo-wrap hovered" : "pseudo-wrap"}
                        onMouseOver={() => { setCartHovered(true) }}
                        onMouseOut={() => { setCartHovered(false) }}
                    >
                        <CartSvg />
                    </Link>
                   
                </div>
            </div>
        </div>
    )
}


const CartSvg = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cartt">
    <path d="M15.55 13C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.9643 5.32843 21.0075 5.15747 21.0054 4.98406C21.0034 4.81064 20.956 4.64077 20.8681 4.49126C20.7803 4.34175 20.6548 4.21778 20.5043 4.13162C20.3538 4.04546 20.1834 4.00009 20.01 4H5.21L4.27 2H1V4H3L6.6 11.59L5.25 14.03C4.52 15.37 5.48 17 7 17H19V15H7L8.1 13H15.55ZM6.16 6H18.31L15.55 11H8.53L6.16 6ZM7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z"  />
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

export const Loader1 =()=><div className="svggWrapper"><div class="contain">

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
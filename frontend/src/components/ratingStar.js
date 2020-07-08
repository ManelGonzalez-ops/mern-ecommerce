import React from 'react'


export default function ratingStar({rating, display}) {


    return (
        <div class="stars" className={display === "inline"? "inlinee": ""}>
            <svg height="25" width="23" class="star rating" >
                <polygon className="estrella1" points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={rating >= 1? {fill: "orange"}:{fill:"white"}} />
            </svg>
            <svg height="25" width="23" class="star rating">
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={rating >= 2? {fill: "orange"}:{fill:"white"}}  />
            </svg>
            <svg height="25" width="23" class="star rating">
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={rating >= 3? {fill: "orange"}:{fill:"white"}}  />
            </svg>
            <svg height="25" width="23" class="star rating">
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={rating >= 4? {fill: "orange"}:{fill:"white"}}  />
            </svg>
            <svg height="25" width="23" class="star rating">
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={rating >= 5? {fill: "orange"}:{fill:"white"}}  />
            </svg>
        </div>
    )
}

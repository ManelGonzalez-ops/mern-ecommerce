import React, { Fragment, useState, useRef } from 'react'
import Product from "./Products2"
import { motion, useDomEvent } from 'framer-motion'
import { Button } from '@material-ui/core'



export default function ProductDispatcher({ products, openAside}) {

    const [selection, setSelection] = useState("")

    useDomEvent(useRef(window), "scroll", () => selection && setSelection(""));

    return (
        <Fragment>
            <motion.div className={selection ? "img-overlay open" : "img-overlay"}
                animate={selection ? { opacity: 1 } : { opacity: 0 }}
                onClick={() => { setSelection("") }}
            ></motion.div>

            {products && products.map(item => {

                return item && <Product setSelection={setSelection} isSelected={selection === item._id} key={item._id} item={item}
                    openAside={openAside} />
            })
                
            }

        </Fragment>

    )
}

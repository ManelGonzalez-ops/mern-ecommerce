import React, { Fragment, useState, useRef } from 'react'
import Product from "./Products2"
import { motion, useDomEvent } from 'framer-motion'
import { ErrorMsg } from "./ProductSection2"

export const ProductDispatcher = React.forwardRef(
    ({ products, openAside, goBack }, ref) => {

        const [selection, setSelection] = useState("")

        useDomEvent(useRef(window), "scroll", () => selection && setSelection(""));


        if (!products.length) {
            return <ErrorMsg error="no results found"
                {...{ goBack }}
            />
        }
        console.log(selection, "seleccion")
        return (
            <div
                className="product-grid"
                ref={ref}
            >
                <motion.div className={selection ? "img-overlay open" : "img-overlay"}
                    animate={selection ? { opacity: 1 } : { opacity: 0 }}
                    onClick={() => { setSelection("") }}
                ><div
                    className="gallery-placer"
                >
                        <motion.img
                            className="image-selection"
                            data-isOpen={!!selection.image}
                            src={selection.image}
                            alt={selection.name}
                            layout
                        />
                    </div>
                </motion.div>

                {products && products.map(item => {

                    return item && <Product setSelection={setSelection} isSelected={selection.id === item._id} key={item._id} item={item}
                        openAside={openAside} />
                })

                }

            </div>

        )
    }
)

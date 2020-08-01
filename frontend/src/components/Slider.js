import React from "react"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Imagenes from "./imagenCarr"
import Imigin from "./imi.js"
import ShopButton from "./ButtonShop"


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1// optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};


class Slider extends React.Component {

  state = {
    anchura: "",
    images: [
      {
       
        
      }
    ],
  }

  handleResize =()=>{
    this.setState({anchura: window.innerWidth})
  }

  componentWillMount() {
    this.setState({ anchura: window.innerWidth }, () => {

      this.setState({
        images: [
        {
          placeholder: "https://source.unsplash.com/68_PLKkF_ww/10x10",
          src: `https://source.unsplash.com/68_PLKkF_ww/${this.state.anchura}x600`
        },
        {
          placeholder: "https://source.unsplash.com/R2aodqJn3b8/10x10",
          src: `https://source.unsplash.com/R2aodqJn3b8/${this.state.anchura}x600`
        },
        {
          placeholder: "https://source.unsplash.com/du8AbwM5z2g/10x10",
          src: `https://source.unsplash.com/du8AbwM5z2g/${this.state.anchura}x600`
        }
      ]
      })
    })
  }

  componentDidMount(){
    document.addEventListener("resize", this.handleResize)
  }
 
  componentWillUnmount(){

    document.removeEventListener("resize", this.handleResize)
  }
  

  render() {
    const { images } = this.state

    return (
      <div className="wrapper-carru">
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        // means to render carousel on server-side.
        infinite={true}
          autoPlay={this.props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all .5s"
        transitionDuration={500}

        containerClass="carousel-container "
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {images && images.map(data=>
          <Imigin imagenes={data} />
        )}
   
      </Carousel>
      <ShopButton/>
      </div>
    )
  }
  
}


export default Slider
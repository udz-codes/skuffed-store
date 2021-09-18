import React from 'react'

const ImageHelper = ({item}) => {
    
    const imageURL = item ? item.image : `https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081` 
    
    return (
        <div className="d-flex justify-content-center"
        style={{
            height:"100%",
            overflow: "hidden",
            backgroundImage: `url(${imageURL})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center top',
            backgroundColor: "#E6E5E9",
            borderRadius: "1em"
        }}></div>
    )
}

export default ImageHelper
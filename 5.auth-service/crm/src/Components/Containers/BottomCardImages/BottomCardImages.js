import React from 'react'
import './BottomCardImages.scss'
import HallCardImage from '../../CustomComponents/HallCardImage/HallCardImage'


const BottomCardImages = ({ images, isEditMode }) => {

    return (

        <div className="flex-row spaced-evenly full-width">
            {images.map((img, index) => <HallCardImage url={""} key={index} isEditMode={isEditMode} />)}
        </div>
    )


}


export default BottomCardImages
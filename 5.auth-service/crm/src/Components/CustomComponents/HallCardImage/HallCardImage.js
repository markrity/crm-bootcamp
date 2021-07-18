import React from 'react'
import ExButton from '../../Decorations/ExButton/ExButton'
import './HallCardImage.scss'

const HallCardImage = ({ uri, isEditMode }) => {
    return (
        <div className="wrap">
            <ExButton isVisible={isEditMode} size={15} onClickFunc={() => console.log("Ex")} />
            <img className="bottom-card-img" src="https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/11/Terra-Caesarea.jpg" alt="img" />
        </div>
    )


}

export default HallCardImage
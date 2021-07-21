import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ExButton from '../../Decorations/ExButton/ExButton'
import './HallCardImage.scss'
import { removeHallImage, toggleMain } from '../../../actions/buisness'
import MainImgButton from '../../Decorations/MainImgButton/MainImgButton'

const HallCardImage = ({ img, isEditMode, hallID }) => {
    console.log(hallID)
    const { buisnessID } = useSelector(state => state.buisness)
    const dispatch = useDispatch()
    return (
        <div className="wrap">
            <ExButton isVisible={isEditMode} size={15} onClickFunc={() => dispatch(removeHallImage(img.imgID, buisnessID))} />
            <img className="bottom-card-img" src={`http://localhost:991/imgs/${img.url}`} alt="img" />
            <MainImgButton isVisible={isEditMode} isMain={img.isMain === "1"} size={20} onClickFunc={() => dispatch(toggleMain(hallID, buisnessID, img.imgID))} />
        </div>
    )
}

export default HallCardImage
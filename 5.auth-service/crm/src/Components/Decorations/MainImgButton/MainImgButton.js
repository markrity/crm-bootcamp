import React from 'react'
import { FaCrown } from "react-icons/fa";

const MainImgButton = ({ isVisible, size, onClickFunc, isMain }) => {
    { console.log(isMain) }
    return (
        <div id="main-img-button">
            {isVisible && <FaCrown color={isMain ? 'green' : 'black'} size={size} onClick={onClickFunc} />}
        </div>
    )
}

export default MainImgButton
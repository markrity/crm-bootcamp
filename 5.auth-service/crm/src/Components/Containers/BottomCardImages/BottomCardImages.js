import React, { useEffect, useState } from 'react'
import './BottomCardImages.scss'
import HallCardImage from '../../CustomComponents/HallCardImage/HallCardImage'
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { uploadHallImg } from '../../../actions/buisness'

const BottomCardImages = ({ images, isEditMode, hallID }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const dispatch = useDispatch()
    const { buisnessID } = useSelector(state => state.buisness)

    useEffect(() => {
        if (selectedFile) {
            console.log(selectedFile.name)
            let fd = new FormData();
            fd.append('image', selectedFile, selectedFile.name);
            dispatch(uploadHallImg(fd, buisnessID, hallID, selectedFile.name, images.length === 0))
            setSelectedFile(null)
        }
    }, [selectedFile])

    const fileSelect = event => {
        setSelectedFile(event.target.files[0])
    }
    return (
        <>
            <div className="flex-row spaced-evenly align-items-center full-width">
                {images && images.map((img, index) => <HallCardImage img={img} key={index} hallID={hallID} isEditMode={isEditMode} />)}
                {images && images.length < 3 && <>
                    <input type="file" className="inputfile" id={hallID} onChange={fileSelect} />
                    <label htmlFor={hallID}>
                        <AiOutlinePlusSquare size={60} />
                    </label>
                </>
                }
            </div>
        </>
    )


}


export default BottomCardImages
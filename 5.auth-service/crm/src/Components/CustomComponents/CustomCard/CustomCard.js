import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AuthForm from '../../Auth/AuthForm';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CustomModal from '../../Containers/CustomModal/CustomModals';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import BottomCardImages from '../../Containers/BottomCardImages/BottomCardImages';
import './CustomCard.scss'
import ExButton from '../../Decorations/ExButton/ExButton';
import EditButton from '../../Decorations/EditButton/EditButton';
import AcceptChangesButton from '../../Decorations/AcceptChangesButton/AcceptChangesButton';
import { editHallFields } from '../../../scripts/formFields'
import MyHalls from '../../WorkSpace/MyHalls';


const CustomCard = ({ hall }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [delModalVisible, setDelModalVisible] = useState(false)
  const deleteModal = () => <AuthForm hallID={hall.hallID} mode='Remove Hall'
    closeModal={() => setDelModalVisible(false)} formFields={[]} />

  console.log('hall', hall.hallID, hall)
  const body = () => isEditMode ?
    <AuthForm mode="Edit Hall"
      initValues={{ capacity: hall.capacity, price: hall.price, name: hall.name }}
      formFields={editHallFields}
      hallID={hall.hallID} />
    : <div className="flex-col">
      <div className="flex-row spaced-between">
        <div className="flex-col">
          <span> Capacity: </span>
          <span>{hall.capacity} People</span>
        </div>
        <div className="flex-col">
          <span>Original Price: </span>
          <span>{hall.price} NIS</span>
        </div>
      </div>
    </div>
  const mainImg = hall.urls.filter((img) => img.isMain === "1")
  return (
    <div className="card-outer-container" style={{ position: 'relative', maxWidth: 350 }}>
      <ExButton isVisible={isEditMode} onClickFunc={() => setDelModalVisible(true)} />
      <EditButton isClicked={isEditMode} onClickedFunc={() => {
        setIsEditMode(!isEditMode)
      }} />
      <CustomModal isVisible={delModalVisible} setIsVisible={() => setDelModalVisible(false)} body={deleteModal()} />
      <Card style={{
        width: '100%'
      }}>
        < CardActionArea >
          <CardMedia
            component="img"
            alt="Hall Image"
            height="140"
            image={mainImg && mainImg.length === 1 ? `http://localhost:991/imgs/${mainImg[0].url}`
              : "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/11/Terra-Caesarea.jpg"}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {hall.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="span">
              {body()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ height: '70px' }}>
          <BottomCardImages images={hall.urls} hallID={hall.hallID} isEditMode={isEditMode} />
        </CardActions>
      </Card>
    </div >
  )

}

export default CustomCard
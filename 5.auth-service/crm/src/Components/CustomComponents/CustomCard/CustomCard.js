import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AuthForm from '../../Auth/AuthForm';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CustomModal from '../../Containers/CustomModal/CustomModals';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BottomCardImages from '../../Containers/BottomCardImages/BottomCardImages';
import './CustomCard.scss'
import ExButton from '../../Decorations/ExButton/ExButton';
import EditButton from '../../Decorations/EditButton/EditButton';
import AcceptChangesButton from '../../Decorations/AcceptChangesButton/AcceptChangesButton';


const CustomCard = ({ id }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [delModalVisible, setDelModalVisible] = useState(false)

  const deleteModal = () => <AuthForm employeeID={id} mode='Remove Employee'
    closeModal={() => setDelModalVisible(false)} formFields={[]} />

  const body = () => isEditMode ?
    <AuthForm mode="Edit Hall" formFields={[]} />
    : <div className="flex-col">
      <div className="flex-row spaced-between">
        <div className="flex-col">
          <span> Capacity: </span>
          <span>800 People</span>
        </div>
        <div className="flex-col">
          <span>Original Price: </span>
          <span>20,000 NIS</span>
        </div>
      </div>
    </div>

  return (
    <div className="card-outer-container" style={{ position: 'relative', maxWidth: 350 }}>
      <ExButton isVisible={isEditMode} onClickFunc={() => setDelModalVisible(true)} />
      <EditButton isClicked={isEditMode} onClickedFunc={() => {
        setIsEditMode(!isEditMode)
      }} />
      <AcceptChangesButton isVisible={isEditMode} onClickFunc={() => console.log("Vi")} />
      <CustomModal isVisible={delModalVisible} setIsVisible={() => setDelModalVisible(false)} body={deleteModal()} />
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/11/Terra-Caesarea.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Autumn Falls
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {body()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ height: '70px' }}>
          <BottomCardImages images={[{}, {}, {}]} isEditMode={isEditMode} />
        </CardActions>
      </Card>
    </div>
  )

}

export default CustomCard
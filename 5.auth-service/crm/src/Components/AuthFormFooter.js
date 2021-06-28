import React from 'react'
import ClickableTxt from './ClickableTxt'
import { useHistory } from 'react-router-dom';
const labels = [`I Already Have An Account`, `I Dont Have An Account, Lets Signup`, 'Forgot My Password']

const FormFooter = ({ isNewBuisness, setIsNewBuisness }) => {
    const history = useHistory()
    return (
        <>{
            isNewBuisness ?
                <>
                    <ClickableTxt txt={labels[0]} onClickFunc={() => setIsNewBuisness(!isNewBuisness)} />

                </> :
                <>
                    <ClickableTxt txt={isNewBuisness ? labels[0] : labels[1]} onClickFunc={() => setIsNewBuisness(!isNewBuisness)} />
                    <ClickableTxt txt={labels[2]} onClickFunc={() => history.push('/resetPassword')} />
                </>}
        </>
    )
}

export default FormFooter
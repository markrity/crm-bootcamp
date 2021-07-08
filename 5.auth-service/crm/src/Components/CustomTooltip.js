import React from 'react'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const CustomTooltip = (props) => {
    console.log(props)
    return (
        <Tooltip arrow title={props.title} placement="right">
            <Button>
                {props.children}
            </Button>
        </Tooltip>

    )

}


export default CustomTooltip
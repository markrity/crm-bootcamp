import React from 'react'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const CustomTooltip = (props) => {
    return (
        <Tooltip arrow title={<div className="tooltip">{props.title}</div>} placement="right">
            <Button onClick={props.func}>
                {props.children}
            </Button>
        </Tooltip>
    )
}


export default CustomTooltip
import React from 'react';
import Media from './Media'

import Button from '../../../components/UI/Buttons/Button'

const MediaModal = (props) => {
    return (
        <div>
            {/* <Media isModal={true} currentImages={props.currentImages}></Media> */}
            <Button onClick={props.handleClose}>Cancel</Button>
            
        </div>
    );
};

export default MediaModal;
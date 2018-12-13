import React, { Component } from 'react';

import UploadButton from '../../../components/UI/Buttons/UploadButton'

import { imagesRef }from '../../../index'

class Media extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
      }

    handleFiles = () => {
        console.log(this.fileInput)
        alert(
            `Selected file - ${
              this.fileInput.current.files[0].name
            }`
        );

        let file = this.fileInput
        
        imagesRef.put(file).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
        });
    }


    render() {
        return (
            <div>
                <input type="file" ref={this.fileInput} onChange={this.handleFiles}></input>

                <UploadButton upload={true}>Upload</UploadButton>
            </div>
        );
    }
}

export default Media;
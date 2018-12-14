import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios'
import firebase from "firebase";
import UploadButton from '../../../components/UI/Buttons/UploadButton'

import { imagesRef }from '../../../index'
import classNames from 'classnames'

import styled from 'styled-components';

import Button from '../../../components/UI/Buttons/Button'

class Media extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
      }


    componentDidMount(){
        // firebase.auth().onAuthStateChanged(function(user) {
        //     if (user) {
        //       // User is signed in.
        //       console.log('user is signed in')
        //     } else {
        //       // No user is signed in.
        //       console.log(' No user is signed in.')
        //       firebase.auth().signInWithEmailAndPassword('test@test.com', 'qwerty')
        //       .then(res => {
        //           console.log(res)
        //       })
        //       .catch(function(error) {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         // ...
        //       });
        //     }
        //   });


        

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

    onDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files

        console.log('accepted', acceptedFiles)
        console.log('rejected',rejectedFiles)

        const file = acceptedFiles[0]
        const url = 'https://firebasestorage.googleapis.com/v0/b/react-boiler-5ecbd.appspot.com/o'
        const uploadInfo  = {
            name: 'djHire',
            auth: this.props.isAuthenticated,
             
        }
        


        imagesRef.put(file)
        .then(snapshot => {
            console.log('Uploaded a blob or file!');
            console.log(snapshot);
        })
        .catch(err => {
            console.log(err);
        })


      }

      signout = () => {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
      }

    render() {
        console.log('media props', this.props)
        console.log(imagesRef)
        return (
            <div>
                <input type="file" ref={this.fileInput} onChange={this.handleFiles}></input>
                <UploadButton upload={true}>Upload</UploadButton>
                <Button onClick ={this.signout}>signout</Button>
                <Dropzone 
                    onDrop={this.onDrop}
                    multiple={false}
                    accept="image/*">
                    {({getRootProps, getInputProps, isDragActive}) => {
                    return (
                        <StyledDropArea
                        {...getRootProps()}
                        className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                        >
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>Drop files here...</p> :
                            <p>Try dropping some files here, or click to select files to upload.</p>
                        }
                        </StyledDropArea>
                    )
                    }}
                </Dropzone>

            </div>
        );
    }
}

const StyledDropArea = styled.div`
    border-style: dotted;
    padding: 5px 20px;
    cursor:pointer;

    /* desktop */
    @media (min-width: 500px) {
        min-width: 455px;

    }


`


export default Media;
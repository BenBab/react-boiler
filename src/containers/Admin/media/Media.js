import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import firebase from "firebase";

import { siteName } from '../../../App_config'
import { storageRef } from '../../../index'
import classNames from 'classnames'

import styled from 'styled-components';
import Button from '../../../components/UI/Buttons/Button'
import Paper from '@material-ui/core/Paper';

import ImgGridList from '../../../components/UI/ImgGridList'



class Media extends Component {

    state ={ 
        uploadOpen: false,
        error : null,
        imageURLs: []
    }

    componentDidUpdate(prevProps){
        if(this.props.currentImages === null) return;
        if(this.props.currentImages !== prevProps.currentImages){
            const that = this
            Object.keys(this.props.currentImages).map((key, i) => {
                const img = this.props.currentImages[key]
                storageRef.child(`${siteName}/${img}`).getDownloadURL()
                .then(url => {
                    that.setState(prevState => ({
                        imageURLs: [...prevState.imageURLs, {title: img  , img: url}]
                    }))
                })
                .catch(error => {
                    // Handle any errors
                    console.log(error)
                });   
            })
        }
         
        

        

    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        console.log('accepted', acceptedFiles)
        console.log('rejected',rejectedFiles)
        if (rejectedFiles.length !== 0){
            this.setState({ error: 'Rejected upload, incompatable file detected' })
            return;
        }

        const user = firebase.auth().currentUser;
        if (user) {
            console.log('user is signed in')
            const file = acceptedFiles[0]
            if (this.checkFileAlreadyExists(file)){
                this.setState({ error : `${file.name} already exists, please remove the old image first`})
                return;
            }

            storageRef.child(`${siteName}/${file.name}`).put(file)
            .then(snapshot => {
                console.log('Uploaded a blob or file!');
                console.log(snapshot);
                this.addImageRefToDb(file)
            })
            .catch(err => {
                console.log(err);
            })

        } else {
            // No user is signed in.
            console.log(' No user is signed in.')
            this.props.isTimedOut(true)
        } 
    }

    checkFileAlreadyExists = (file) => {
        if (this.props.currentImages === null) return;

        const findImageRef = Object.keys(this.props.currentImages).filter((key, i) => {
            const img = this.props.currentImages[key]
            return img === file.name           
        })

         return !findImageRef.length ? false : true

    }

    addImageRefToDb = (file) => {
        var newPostKey = firebase.database().ref().child(`${siteName}/images`).push().key;
        var updates = {[newPostKey]: file.name};
        const that = this

        return firebase.database().ref().child(`${siteName}/images`).update(updates , function(error) {
            if (error) {
              // The write failed...
              console.log('image ref in db write failed...', error)
            } else {
              // Data saved successfully!
              console.log('image ref in db saved successfully')
              that.props.refreshState()
            }
          })
    }

    handleUploadOpen = () => {
        this.setState({ uploadOpen: !this.state.uploadOpen})
    }


    render() {
        console.log('media props', this.props)
        const { error, uploadOpen } = this.state

        let dropZone = null

        if (uploadOpen){
            dropZone = <Dropzone 
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
        }

        return (
            <div>
                <Button onClick={this.handleUploadOpen}>
                    {uploadOpen ? 'Close DropZone' : 'Upload Media'}
                </Button>
                {dropZone}
                {error && <div>{error}</div> }
                <Paper>
                  <ImgGridList tileData={this.state.imageURLs}/> 
                </Paper>


            </div>
        );
    }
}

const StyledDropArea = styled.div`
    border-style: dotted;
    padding: 5px 20px;
    margin: 20px 5px;
    cursor:pointer;

    /* desktop */
    @media (min-width: 500px) {
        min-width: 455px;

    }


`


export default Media;
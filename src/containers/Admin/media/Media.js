import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import firebase from "firebase";

import { siteName } from '../../../App_config'
import { storageRef } from '../../../index'
import classNames from 'classnames'

import styled from 'styled-components';
import Button from '../../../components/UI/Buttons/Button'
import Input from '../../../components/UI/Input' 

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ImgGridList from './ImgGridList'



class Media extends Component {

    state ={ 
        uploadOpen: false,
        error : null,
        customURL: false
    }

    componentDidUpdate(prevProps){
        if(this.props.currentImages === null) return;

        
        
        if(this.props.currentImages !== prevProps.currentImages ){
            this.getImageUrls()
        }
    }

    getImageUrls = () =>{
        const that = this
        let imageContainer = [];
        let imageCount = Object.keys(this.props.currentImages).length
        let returnedCount = 0;

        Object.keys(this.props.currentImages).map((key, i) => {
            const img = this.props.currentImages[key]
            storageRef.child(`${siteName}/${img}`).getDownloadURL()
            .then(url => {
                imageContainer = [...imageContainer, {title: img  , img: url}]
                returnedCount++

                if (imageCount === returnedCount){
                    that.props.setMediaImages(imageContainer)
                }

            })
            .catch(error => {
                // Handle any errors
                console.log(error)
            });   
        })
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

    deleteImage = (imgUrl, name) => {
        console.log(imgUrl, name)



    }

    handleUploadOpen = () => {
        this.setState({ uploadOpen: !this.state.uploadOpen})
    }


    render() {
        console.log('media props', this.props)
        const { error, uploadOpen, customURL } = this.state

        let dropZone = null
        let mediaTemplate = null

        if (uploadOpen && !this.props.isModal){
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


        if (!this.props.isModal){
            mediaTemplate =
              <div>
                <Button onClick={this.handleUploadOpen}>
                    {uploadOpen ? 'Close DropZone' : 'Upload Media'}
                </Button>
                    {dropZone}
                    {error && <div>{error}</div> }
                <Paper elevation={7}>
                    <ImgGridList 
                        tileData={this.props.imageURLs} 
                        isModal={false}
                        deleteImage={this.deleteImage}/>
                </Paper>
              </div>
        } else {
          mediaTemplate =
            <div>
              <Paper elevation={5}>
                  <ImgGridList 
                    tileData={this.props.imageURLs} 
                    isModal={true}
                    />
              </Paper>
              <Input inputElement='input' disabled />
              <Divider/>
              <Button onClick={() => {this.setState({customURL: !customURL })}}> {!customURL ? 'Use' : 'Close'} custom URL location?</Button>
                {customURL &&
                    <Input inputElement='input' label='If you want to use an image stored elsewhere, enter the Url address bellow' ></Input>
                }
              <Divider/>
              
              <Button onClick={this.props.handleClose}>Cancel</Button>
              <Button >Confirm Image</Button>

            </div>
        }

        return (
            <>
            {mediaTemplate}
            </>
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
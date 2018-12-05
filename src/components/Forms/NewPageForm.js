import React, { Component } from 'react'
import { connect } from 'react-redux';
import Input from '../UI/Input'
import Flex from '../UI/Wrappers/Flex'

import * as actions from '../../store/actions/index';

export class NewPageForm extends Component {
  state = {
    title: '',
    checked : false,
    selectVal: null
  }

  componentDidMount(){
    if(this.props.navigationItems.length > 0){
      this.setState({selectVal: this.props.navigationItems[0].title})
    }
  }

  handleCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onSelectChange = (event) => {
    this.setState({selectVal: event.target.value});
  }

  onInputChange = (event) => {
    const {value, name} = event.target
    this.setState({ [name]: value })
  }

  render() {
      console.log('newpageForm props', this.props)
    return (
      <div>
        <form>
        <Input inputtype="input" label="Page Title" name="title" value={this.state.value} onChange={this.onInputChange}/>
        {this.props.navigationItems.length > 0 &&
            <div>
                <Input inputtype="checkbox" sideLabel="Is this a dropdown SubPage" checked={this.state.checked} handleChange={this.handleCheckbox}/>
                <br/>
                {this.state.checked &&
                <Input 
                    inputtype="select"
                    value={this.state.selectVal}
                    label="Choose the parent page for this Subpage"
                    items={this.props.navigationItems} 
                    onSelectChange={this.onSelectChange} />
                } 
            </div>
        }
        </form>
        <Flex justifyContent="flex-end" margin="5px">
          <button onClick={this.props.handleClose} >
            Cancel
          </button>
          <button onClick={() => this.props.handleSubmit(this.state)} >
            Confirm
          </button>
        </Flex>
        
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
      updateNewPageData: () => dispatch(actions.newPageData()),
  }
}

export default connect(null, mapDispatchToProps)(NewPageForm)


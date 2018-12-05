import React, { Component } from 'react'

import Input from '../UI/Input'

export class NewPageForm extends Component {
  state = {
    title: '',
    checked : false,
    selectVal: null
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
      </div>
    )
  }
}

export default NewPageForm


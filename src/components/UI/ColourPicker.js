import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class ColourPicker extends React.Component {
  state = {
    displayColorPicker: false,
    hex: '#FFFFFF',
    color: {
      r: '255',
      g: '255',
      b: '255',
      a: '1',
    },
  };

  componentDidMount(){

      if (this.props.value){
        const hex = this.props.value.replace('#','');
        const r = parseInt(hex.substring(0,2), 16);
        const g = parseInt(hex.substring(2,4), 16);
        const b = parseInt(hex.substring(4,6), 16);
        
        const rgb = {
            r,
            g,
            b,
            a: 1
        }
        this.setState({ color: rgb})
      }

  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb, hex: color.hex })
    if(this.props.changeColour){
        const id = this.props.pageId
        const parent = this.props.parentId || null
        const newevent =  {
            target: {
                name: this.props.name,
                value: color.hex
            }
        }
        this.props.changeColour(newevent, id, parent, )
    }
    
  };

  render() {

    console.log('hex', this.state.hex)

    const styles = reactCSS({
      'default': {
        color: {
          width: '12vw',
          height: '17px',
          borderRadius: '2px',
          background:`rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          marginTop: '6px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>

            
            <div style={ styles.swatch } onClick={ this.handleClick }>
                <div style={ styles.color } />
            </div>
        
        { this.state.displayColorPicker 
          ? 
          <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>
            <SketchPicker color={ this.state.color } onChange={ this.handleChange } disableAlpha={true} />
          </div>
         : null }
      </div>
    )
  }
}

export default ColourPicker
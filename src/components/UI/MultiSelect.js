import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import styled from 'styled-components';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class MultiSelect extends React.Component {
  state = {
    name: [],
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
    if(this.props.handleChange){
      this.props.handleChange(event)
    }
  };

  render() {
    const { label, items, name, value, margin, width } = this.props;

    return (
      <StyledSelect margin={margin} width={width}>
        <FormControl >
          <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
          <Select
            multiple
            value={value || this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            name={name}
            renderValue={selected => (
              <div className={'chips'}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={'chip'} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {items.map(name => (
              <MenuItem key={name} value={name} >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledSelect>
    );
  }
}

const StyledSelect = styled.div`
    display: flex;
    flex-wrap: wrap;    
    margin: ${props => props.margin || '8px'};

    div {
      /* margin: ${props => props.margin || '8px'}; */
      width: ${props => props.width || '400px'};
      /* min-width: ${props => props.minwidth || '200px'}; */
      max-width: ${props => props.minwidth || '450px'};

      .chips {
        min-width:auto;
        display: flex;
        flex-wrap: wrap;
        

        .chip{
          margin: 2px;
          flex-wrap: wrap;
          width: auto;
        }

      }

    }

`;




export default MultiSelect;
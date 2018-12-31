import React, { Component } from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/AddCircle';
import MinusIcon from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import Flex from './Flex'
import Collapse from '@material-ui/core/Collapse';


class Minimizer extends Component {
    state = {
        isOpen: false
    }
    
    handleMinimizer = () => {
        console.log(this.state.isOpen)
        this.setState({ isOpen: !this.state.isOpen })
    }


    render() {
        const { isOpen }= this.state

        return (
            <StyledMinimizer >
              <Flex margin='0'>
                <IconButton aria-label="Add" color="primary" onClick={this.handleMinimizer}>
                    {isOpen
                        ? <MinusIcon />
                        : <AddIcon />
                    }
                </IconButton>
                {isOpen
                    ? <small onClick={this.handleMinimizer}>Click to minimise options</small>  
                    : <small onClick={this.handleMinimizer}>Click to expand further options</small>  
                }
              </Flex>
            <Collapse in={isOpen} >
              {isOpen
                ?
                <div>
                    {this.props.children}
                </div>
                :
                <Emtpy emptyHeight={this.props.emptyHeight}/>
              }
            </Collapse>
        </StyledMinimizer>
        );
    }
}

const Emtpy = styled.div`
    height: ${props => props.emptyHeight || '500px'};
`;

        
const StyledMinimizer = styled.div`
    border: 2px solid rgba(0,0,0,0.2);
    border-top: 0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-bottom: 35px;

    > div small{
        cursor:pointer;
    }
 
`


export default Minimizer;
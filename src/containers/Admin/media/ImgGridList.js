import React, {Component} from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import styled from 'styled-components';

class TitlebarGridList extends Component {

  state = {
    columns: 5,
    spacing: 20,
    activeIndex : null,
    selectedValue: '',
    selectedName: ''

  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    const windowSize = window.innerWidth;
    const columns = (windowSize > 768 && 5) || (windowSize <= 480 && 1) || 3;
    const spacing = (windowSize > 768 && 20) || 8;

    this.setState({
      columns,
      spacing
     });
  };


  handleSelect = (event, index, tile) => {
    this.props.selectedImage(index, tile) 
  }

  render(){
  const { tileData } = this.props;
  if (!tileData  || !tileData.length) return <div></div>;


    return (
      <StyledGrid>
        <GridList cellHeight={180} className='gridList' cols={this.state.columns} spacing={this.state.spacing}>
         <GridListTile key="Subheader" cols={this.state.columns} style={{ height: 'auto' }}>
            <ListSubheader component="div">This is where your current websites images located.</ListSubheader>
         </GridListTile> 
          {
            tileData.map( (tile, index) => {
            const gridTileClass = this.props.selectedIndex === index ? 'media active' : 'media';

            return (
            <GridListTile key={tile.title} className={gridTileClass} onClick={(e) => this.handleSelect(e, index, tile)}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                actionIcon={!this.props.isModal
                  ? <IconButton className='gridIcon' onClick={() => this.props.deleteImage(tile.img, tile.title)} >
                      <InfoIcon />
                    </IconButton>
                  : false
                }
              />
            </GridListTile>
            )})
          }
        </GridList>
      </StyledGrid>
    );
  }
}

const StyledGrid = styled.div`
      display: flex;
      flex-wrap: wrap;
      /* justify-content: space-around; */
      overflow: hidden;
      margin: 20px 0;
      padding: 10px;

      .gridlist {
          width: 100%;
          height: 450px;
      }

      .media {
        padding: 3px;
        cursor: pointer;
        -webkit-transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        -moz-transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        -ms-transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        -o-transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      }

      .media.active{
          border: 1px solid #09c;
          border-radius: 5px;
          box-shadow: 1px 1px 7px rgba(0, 200, 204, 0.7);
          outline: none;
      }

      .gridIcon {
          color: rgba(255, 255, 255, 0.54)
      }

`

export default (TitlebarGridList);

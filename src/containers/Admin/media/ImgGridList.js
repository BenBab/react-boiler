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
    const columns = (windowSize >= 768 && 5) || 2;
    const spacing = (windowSize >= 768 && 20) || 8;

    this.setState({
      columns,
      spacing
     });
  };

  render(){
  const { tileData } = this.props;
  if (!tileData  || !tileData.length) return <div></div>;
    return (
      <StyledGrid>
        <GridList cellHeight={180} className='gridList' cols={this.state.columns} spacing={this.state.spacing}>
        <GridListTile key="Subheader" cols={this.state.columns} style={{ height: 'auto' }}>
            <ListSubheader component="div">This is where your current websites images located.</ListSubheader>
          </GridListTile>
          {tileData.map(tile => (
            <GridListTile key={tile.title}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                actionIcon={
                  <IconButton className='gridIcon'>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </StyledGrid>
    );
  }
}

const StyledGrid = styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      overflow: hidden;
      margin: 20px 0;
      padding: 10px;

      .gridlist {
          width: 100%;
          height: 450px;
      }

      .gridIcon {
          color: rgba(255, 255, 255, 0.54)
      }

`

export default (TitlebarGridList);

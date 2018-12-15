import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import styled from 'styled-components';

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function TitlebarGridList(props) {
  const { tileData } = props;
  if (!tileData  || !tileData.length) return <div></div>;

  return (
    <StyledGrid>
      <GridList cellHeight={180} className='gridList'>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: author</span>}
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

const StyledGrid = styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      overflow: hidden;

      .gridlist {
          width: 100%;
          height: 450px;
      }

      .gridIcon {
          color: rgba(255, 255, 255, 0.54)
      }

`

export default (TitlebarGridList);

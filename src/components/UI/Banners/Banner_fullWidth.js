import React from 'react';
import styled from 'styled-components';

const BannerFullWidth = (props) => {
    const banner_image_url = 'https://i.imgur.com/jCi5m2s.png'

    return (
        <StyledBanner style={{ backgroundImage : `url(${banner_image_url})`}}>
                
        </StyledBanner>
    );
};

const StyledBanner = styled.div`

`;

export default BannerFullWidth;
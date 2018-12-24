import React from 'react';
import styled from 'styled-components';

import Button from '../../UI/Buttons/Button'

const BannerFullWidth = (props) => {
    const banner_image_url = 'https://i.imgur.com/jCi5m2s.png'
    console.log('full_bannerProps', props )
    const { title } = props.pageInfo
    return (
        <StyledBanner style={{ backgroundImage : `url(${banner_image_url})`}} {...props}>
            <div className='banner-content'>
              <h2 className=''> {title} </h2>
              <h4> Subtitle stuff that should explain more </h4>
              <Button>Get Started</Button>
            </div>
        </StyledBanner>
    );
};

const StyledBanner = styled.div`
	height: 460px;
    margin-top: ${props => props.template.transparentHeader ? '-56px' : 0};
    
	/* Position and center the image to scale nicely on all screens */
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;

    > div {
        padding: 80px 0 0 10vw;
    }
`;

export default BannerFullWidth;
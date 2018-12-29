import React from 'react';
import styled from 'styled-components';

import Logo from '../../../components/Logo/Logo'
import Button from '../../UI/Buttons/Button'

const BannerFullWidth = (props) => {
    const banner_image_url = 'https://i.imgur.com/jCi5m2s.png'
    console.log('full_bannerProps', props )
    const { history } = props
    const { img, halfwidth, isLogo, title, subTitle, description, btnText, btnLink } = props.bannerData
    return (
        <StyledBanner style={{ backgroundImage: `url(${banner_image_url})`}} {...props}>
            <div>
             {isLogo &&
                  <Logo siteLogo={props.template.siteLogo} width='50%'/>
             }<div className='banner-content'>
              <h1>{title}</h1>
              <h3>{subTitle}</h3>
              <p>{description}</p>
              {btnText &&
                <Button onClick={() => { history.push(btnLink) }}>{btnText}</Button>
              }
             </div>
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
        padding: 80px 80px 0 10vw;
        text-align: ${props => props.bannerData.textRightSide ? 'right' : 'left'};
        color: ${props => props.bannerData.lightTheme ? props.theme.bannerLightColour : props.theme.bannerDarkColour};
        

        .banner-content {
            margin: 0 20px;
        }
    }
`;

export default BannerFullWidth;
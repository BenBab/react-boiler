import React from 'react';
import styled from 'styled-components';

import Logo from '../../../components/Logo/Logo'
import Button from '../../UI/Buttons/Button'

const BannerFullWidth = (props) => {
    const banner_image_url = 'https://i.imgur.com/jCi5m2s.png'
    console.log('full_bannerProps', props )
    const { history } = props
    const { img, halfwidth, textRightSide, isLogo, title, subTitle, description, btnText, btnLink } = props.bannerData
    return (
        <StyledBanner style={{ backgroundImage: `url(${banner_image_url})`}} {...props}>
            <div className='banner-content'>
             {isLogo &&
                  <Logo siteLogo={props.template.siteLogo} width='50%'/>
             }
              <h2>{title}</h2>
              <h4>{subTitle}</h4>
              <p>{description}</p>
              {btnText &&
                <Button onClick={() => { history.push(btnLink) }}>{btnText}</Button>
              }
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

        .banner_logo{

        }
    }
`;

export default BannerFullWidth;
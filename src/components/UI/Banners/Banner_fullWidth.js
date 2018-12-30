import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';

import Logo from '../../../components/Logo/Logo'
import Button from '../../UI/Buttons/Button'

class BannerFullWidth extends Component {

    state= {
        loading: true,
        showLogo: false,
        showBannerContent: false
    }

    // componentWillMount(){
    //     if (this.props.bannerData.isLogo){
    //         const img = new Image()
    //         img.src = this.props.template.siteLogo
    //     }
    // }

    componentDidMount(){
        if(this.props.bannerData.isLogo){
          setTimeout(() => {  this.setState({showLogo: true}); }, 500 );
          setTimeout(() => {  this.setState({showBannerContent: true});  }, 700 );
        }
        else {
            this.setState({showBannerContent: true}); 
        }

    }

    handleLogoLoaded = () => {
        this.setState({ loading: false });
    }

    render(){
    const { img, halfwidth, fadeContent, title, subTitle, description, btnText, btnLink } = this.props.bannerData
    const banner_image_url = img
    //'https://i.imgur.com/jCi5m2s.png'
    const { history, template } = this.props
    const logo = template.siteLogo;
    
    console.log('full_bannerProps', this.props )
        return (
            <StyledBanner style={{ backgroundImage: `url(${banner_image_url})`}} {...this.props}>
                <div>
                {this.state.showLogo &&
                <BannerLogo fadeContent={fadeContent}>
                    <Logo siteLogo={logo} onLoad={this.handleLogoLoaded} width='50%'/>
                </BannerLogo>
                }
                {this.state.showBannerContent &&
                    <div className='banner-content'>
                        <h1>{title}</h1>
                        <h3>{subTitle}</h3>
                        <p>{description}</p>
                        {btnText &&
                            <Button onClick={() => { history.push(btnLink) }}>{btnText}</Button>
                        }
                    </div>
                }           
                </div>
            </StyledBanner>
        );
    }
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40%);
  }
  50% {
    opacity: 1;
    transform: translateY(-20%);
    
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const animation = props =>
  css`
    1s ${fadeIn} ease-out
  `

const BannerLogo = styled.div`
    animation: ${props => props.fadeContent ? animation : 'none'};
`;

const StyledBanner = styled.div`
	height: 460px;
    margin-top: ${props => props.template.transparentHeader && props.position === 'top' ? '-56px' : 0};
    
	/* Position and center the image to scale nicely on all screens */
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;

    > div {
        padding: 80px 10vw 0 10vw;
        text-align: ${props => props.bannerData.textRightSide ? 'right' : 'left'};
        color: ${props => props.bannerData.lightTheme ? props.theme.bannerLightColour : props.theme.bannerDarkColour};
        
        .banner-content {
            margin: 0 20px;
            animation: ${props => props.bannerData.fadeContent ? animation : 'none'};
        }
    }
`;

export default BannerFullWidth;
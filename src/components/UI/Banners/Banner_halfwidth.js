import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';

import Logo from '../../../components/Logo/Logo';
import Button from '../../UI/Buttons/Button';
import Grid from '../../UI/Wrappers/Grid';
class BannerHalfWidth extends Component {

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
    const { img, textRightSide, fadeContent, title, subTitle, description, btnText, btnLink } = this.props.bannerData
    const banner_image_url = img
    //'https://i.imgur.com/jCi5m2s.png'
    const { history, template } = this.props
    const logo = template.siteLogo;

    let bannerContent = 
        <div>
            {this.state.showLogo &&
                <BannerLogo fadeContent={fadeContent}>
                    <Logo siteLogo={logo} onLoad={this.handleLogoLoaded} width='50%'/>
                </BannerLogo>
            }
                <BannerContent {...this.props}>
                    <h1>{title}</h1>
                    <h3>{subTitle}</h3>
                    <p>{description}</p>
                    {btnText &&
                        <Button onClick={() => { history.push(btnLink) }}>{btnText}</Button>
                    }
                </BannerContent>
        </div>
    
    console.log('half_bannerProps', this.props )
        return (
          <Grid  colGap ='0'>
            {this.state.showBannerContent && !textRightSide &&
                bannerContent
            }   
            <StyledBanner style={{ backgroundImage: `url(${banner_image_url})`}} {...this.props}/>
            {this.state.showBannerContent && textRightSide &&
                bannerContent
            }           
          </Grid>
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

const BannerContent = styled.div`
    text-align: ${props => props.bannerData.textRightSide ? 'right' : 'left'};
    color: ${props => props.bannerData.lightTheme ? props.theme.bannerLightColour : props.theme.bannerDarkColour};
    margin: 0 50px;
    animation: ${props => props.bannerData.fadeContent ? animation : 'none'};
    position: relative;
    top: ${props => props.bannerData.isLogo ? 0 : '-65px'}

`

const StyledBanner = styled.div`
	height: 400px;
    margin-top: ${props => props.template.transparentHeader  && props.position === 'top' ? '-56px' : 0};
    
	/* Position and center the image to scale nicely on all screens */
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;

`;

export default BannerHalfWidth;
import React from 'react';

import styled from 'styled-components';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <NavigationItems>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/">Book Now</NavigationItem>
    </NavigationItems>
);

const NavigationItems = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;

    @media (min-width: 500px) {
        flex-flow: row;
}
    
`;

export default navigationItems;
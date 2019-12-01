import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
    display : flex;
    align-items : center;
    padding : 1rem;
    &>:last-child {
        margin-left :auto;
    }
`;
const Title = styled.h1`
    margin : 0;
`;
const Menu = styled.div`
     display : flex;
     & > div{
        margin-left : 1rem;
     }
`;

const Header = ({ ...props }) => {
    return (
        <Wrapper>
            <Title>TODO APP</Title>
            <Menu>
                <div>
                    Sign up
                </div>
                <div>
                    Login
                </div>
            </Menu>
        </Wrapper>
    )
}

export default Header;
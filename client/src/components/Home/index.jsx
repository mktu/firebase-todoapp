import React, { useState } from 'react';
import styled from 'styled-components';
import { ContainedButton } from '../Button';
import {SigninModal} from '../Modal';

const Wrapper = styled.div`
`;

const Title = styled.h2`
    text-align : center;
    margin-bottom : 2rem;
`;

const ButtonWrapper = styled.div`
    display : flex;
    justify-content : center;
`;

const ActionButton = styled(ContainedButton).attrs({
    variant: 'secondary'
})`
    display : block;
    height : 50px;
    font-size : 1.2rem;
    margin-right : 1rem;
`;

const Home = ({ ...props }) => {
    const [showLogin, setShowLogin] = useState(false);
    return (
        <Wrapper>
            <Title>Select mode</Title>
            <ButtonWrapper>
                <ActionButton>
                    START WITH ANONUMOUS
                    </ActionButton>
                <ActionButton onClick={()=>{setShowLogin(true)}}>
                    START WITH LOGIN
                    </ActionButton>
            </ButtonWrapper>
            <SigninModal isOpen={showLogin} onBackgroundClick={()=>{setShowLogin(false)}} />
        </Wrapper>
    )
}

export default Home;
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ContainedButton } from '../Button';
import { SigninModal } from '../Modal';
import { ThemeContext } from '../../contexts';

const Wrapper = styled.div(({ theme }) =>`
    background-color: ${theme.bgcolor};
`);

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

const VisitorPage = ({ ...props }) => {
    const [showLogin, setShowLogin] = useState(false);
    const theme = useContext(ThemeContext);

    const toggleModal = (show) => () => {
        setShowLogin(show);
    };
    return (
        <Wrapper theme={theme}>
            <Title>Select mode</Title>
            <ButtonWrapper>
                <ActionButton>
                    START WITH ANONUMOUS
                    </ActionButton>
                <ActionButton onClick={toggleModal(true)}>
                    START WITH SIGN UP
                    </ActionButton>
            </ButtonWrapper>
            <SigninModal
                title='Choose a provider for sign-in'
                isOpen={showLogin}
                onCancel={toggleModal(false)}
                onBackgroundClick={toggleModal(false)} />
        </Wrapper>
    )
}

export default VisitorPage;
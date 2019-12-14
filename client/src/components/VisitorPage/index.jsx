import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ContainedButton } from '../Button';
import { SigninModal } from '../Modal';
import { ErrorModal } from '../Modal';
import { ThemeContext } from '../../contexts';
import { useVisitorState } from '../../hooks';

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
    const theme = useContext(ThemeContext);
    const [modalState,loginError,loginState] = useVisitorState();
    return (
        <Wrapper theme={theme}>
            <Title>Select mode</Title>
            <ButtonWrapper>
                <ActionButton onClick={()=>{
                    loginState.anonymous();
                }}>
                    START WITH ANONUMOUS
                    </ActionButton>
                <ActionButton onClick={modalState.set(true)}>
                    START WITH SIGN UP
                    </ActionButton>
            </ButtonWrapper>
            <ErrorModal
                mainMessage={'Error'}
                detailMessage={loginError.hasError&&loginError.error.message}
                isOpen={loginError.hasError}
                onClose={loginError.refresh}
                />
            <SigninModal
                title='Choose a provider for sign-in'
                isOpen={modalState.value}
                onCancel={modalState.set(false)}
                onClickGoogle={()=>{
                    loginState.login();
                }}
                onBackgroundClick={modalState.set(false)} />
        </Wrapper>
    )
}

export default VisitorPage;
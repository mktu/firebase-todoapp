import React, { useContext } from 'react';
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
    const {signinModalState, errorModalState} = useVisitorState();
    return (
        <Wrapper theme={theme}>
            <Title>Select mode</Title>
            <ButtonWrapper>
                <ActionButton onClick={signinModalState.handleAnonymousLogin}>
                    START WITH ANONUMOUS
                    </ActionButton>
                <ActionButton onClick={signinModalState.show}>
                    START WITH SIGN UP
                    </ActionButton>
            </ButtonWrapper>
            <ErrorModal
                mainMessage={'Error'}
                detailMessage={errorModalState.message}
                isOpen={errorModalState.isOpen}
                onClose={errorModalState.handleClose}
                />
            <SigninModal
                title='Choose a provider for sign-in'
                isOpen={signinModalState.isOpen}
                onCancel={signinModalState.handleClose}
                onClickGoogle={signinModalState.handleGoogoleLogin}
                onBackgroundClick={signinModalState.handleClose} />
        </Wrapper>
    )
}

export default VisitorPage;
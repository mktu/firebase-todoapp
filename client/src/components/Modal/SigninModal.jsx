import React from 'react';
import styled, { css } from 'styled-components';
import Modal from 'styled-react-modal'
import { FontAwesomeIcon as FontAwesomeIconBase } from '@fortawesome/react-fontawesome';
import { TextButton as TextButtonBase, ContainedButton as ContainedButtonBase } from '../Button';
import { Fadein } from '../Animation';
import { auth } from '../../services';

const StyledModal = Modal.styled`
    display : grid;
    width : 400px;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    align-items: center;
    background-color: white;
    font-size : 1.2rem;
    border-radius : 5px;
    ${css`
        animation : 0.8s ${Fadein};
    `}
`;

const Title = styled.div`
    padding : 1rem;
`;
const Content = styled.div`
    & > div{
        padding : 1rem;
        display : flex;
        justify-content : center;
    }
`;
const Actions = styled.div`
    display : flex;
    justify-content : flex-end;
    padding : 1rem;
`;

const TextButton = styled(TextButtonBase).attrs({
    color : 'textPrimary'
})`
    font-size : 1rem;
`;

const LoginButton = styled(ContainedButtonBase)`
    font-size : 1.2rem;
    width : 100%;
    background-color : #4285F4;
`;

const FontAwesomeIcon = styled(FontAwesomeIconBase)`
    margin-right : 1rem;
`;

const SigninModal = ({ title, onCancel, ...props }) => {
    return (
        <StyledModal {...props}>
            <Title>{title}</Title>
            <Content>
                <div>
                    <LoginButton onClick={auth.loginByGoogle}>
                        <FontAwesomeIcon icon={['fab', 'google']} />
                        <span>Google</span>
                    </LoginButton>
                </div>
            </Content>
            <Actions>
                <TextButton onClick={onCancel}>CANCEL</TextButton>
            </Actions>
        </StyledModal>
    )
}

export default SigninModal;
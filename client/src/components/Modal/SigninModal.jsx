import React from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal'
import { auth } from '../../services';

const StyledModal = Modal.styled`
    padding : 1rem;
    display : grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    align-items: center;
    background-color: white;
`;

const Title = styled.h2`
    margin : 0;
`;
const Content = styled.div``;
const Actions = styled.div``;

const SigninModal = ({ onCancel, ...props }) => {
    return (
        <StyledModal {...props}>
            <Title>Choose Acount</Title>
            <Content><button onClick={auth.loginByGoogle}>LOGIN</button></Content>
            <Actions>
                <button onClick={onCancel}>CANCEL</button>
            </Actions>
        </StyledModal>
    )
}

export default SigninModal;
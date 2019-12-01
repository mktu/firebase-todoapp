import React from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal'

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

const SigninModal = ({ ...props }) => {
    return (
        <StyledModal {...props}>
            <Title>Choose Acount</Title>
            <Content>Content</Content>
            <Actions>Actions</Actions>
        </StyledModal>
    )
}

export default SigninModal;
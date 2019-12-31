import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {TextButton as TextButtonBase} from '../Button';

const Wrapper = styled.div`
`;

const TextButton = styled(TextButtonBase)`
    font-size : 1rem;
`;

const CustomIcon = styled(FontAwesomeIcon)(({ iconsize }) => `
    font-size : ${iconsize};
    margin-right : 0.5rem;
`);

const TodoMenuItems = ({ className, handleSort, deleteCompletedList }) => {
    return (
        <Wrapper className={className}>
            <div><TextButton onClick={handleSort}><CustomIcon icon={['fas', 'sort']} iconsize='1.2rem'/>SORT BY DATE</TextButton></div>
        </Wrapper>
    );
}

export default TodoMenuItems;
import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import Text from './Text';

const Wrapper = styled.div`
    display : flex;
    align-items : center;
`

const Checkbox = ({ className, label, checked, onCheck, onClick }) => {
    return (
        <Wrapper className={className}>
            <Box checked={checked} onCheck={onCheck}/>
            <Text checked={checked} label={label}/>
        </Wrapper>
    )
};
export default Checkbox;
export {Box,Text}
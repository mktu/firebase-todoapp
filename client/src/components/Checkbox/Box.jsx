import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = styled.input.attrs({
    type: 'checkbox'
})`
    display : none;
`;

const Label = styled.label`
    position : relative;
    cursor : pointer;
`
const Checkmark = styled(FontAwesomeIcon)(({ checked, theme }) => `
    color : ${theme.s};
    margin-right : 0.5rem;
    background-color : none;
    &:hover{
        color : ${theme.sLight};
    }
`);

const Box = ({ className, checked, onCheck }) => {
    const faCheckmark = checked ? 'check-square' : 'square';
    const theme = useContext(ThemeContext);
    return (
        <Label className={className} checked={checked} onClickCapture={(e) => {
            e.stopPropagation();
        }}>
            <Input onChange={onCheck} />
            <Checkmark theme={theme} icon={['far', faCheckmark]} />
        </Label>
    )
};
export default Box;
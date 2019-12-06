import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = styled.input.attrs({
    type: 'checkbox'
})`
    display : none;
`;

const Text = styled.span(({ checked, theme }) => `
    position : relative;
    ${checked ? `
        color:${theme.textS};
        ` : `
        color:${theme.textP};
        `}
    &:after {
        content:'';
        height:2px; 
        ${checked ? `
        width:90%;
        ` : `
        width:0;
        ]`}
        left : 0;
        bottom:50%; 
        position:absolute;
        background:${theme.s}; 
        transition:0.2s ease all; 
    }
`);

const Label = styled.label`
    position : relative;
    cursor : pointer;
`

const Wrapper = styled.div`
    display : inline-block;
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

const Checkbox = ({ className, label, checked, onCheck }) => {
    const faCheckmark = checked ? 'check-square' : 'square';
    const theme = useContext(ThemeContext);
    return (
        <Wrapper className={className}>
            <Label checked={checked}>
                <Input onChange={onCheck} />
                <Checkmark theme={theme} icon={['far', faCheckmark]} />
            </Label>
            <Text checked={checked} theme={theme}>{label}</Text>
        </Wrapper>
    )
};
export default Checkbox;
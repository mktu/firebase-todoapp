import React, {useContext} from 'react';
import { rgba } from "polished"
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';

const Wrapper = styled.div(({theme,isDragging})=>`
    padding : 1rem;
    display : grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    border-bottom : 1px solid ${theme.divider};
    
    ${isDragging ? `
        opacity:1.0;
        background-color : ${rgba(theme.textP,theme.overlays.hover)};
        cursor : move;
    ` : `
        &:hover {
            background-color : ${rgba(theme.textP,theme.overlays.hover)};
            cursor : pointer;
        }
    `}
`);

const ListItem = ({ className, primaryAction, isDragging, secondaryAction, children, ...props }) => {
    const theme = useContext(ThemeContext);
    return (
        <Wrapper draggable isDragging={isDragging} className={className} theme={theme} {...props}>
        {children}
        </Wrapper>
    );
}

export const PrimaryAction = styled.div`
    margin-right : 1rem;
`;

export const SecondaryAction = styled.div`
    margin-left : 1rem;
`;

export default ListItem;
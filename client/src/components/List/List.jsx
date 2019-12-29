import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Container, Draggable } from 'react-smooth-dnd';
import {useDnDList} from '../../hooks';

const Wrapper = styled.div`
`;

const List = ({ items = [], onSort, sorter=(i1,i2)=>i1-i2, children }) => {
    const {onDrop,sortedItems} = useDnDList(items,sorter,onSort);
    return (
        <Wrapper >
            <Container onDrop={onDrop}>
                {
                    useMemo(()=>{
                        return sortedItems.map((item,idx) => {
                            return (
                                <Draggable key={idx}>
                                    {children(item)}
                                </Draggable>
                            )
                        })
                    },[sortedItems,children])
                }
            </Container>
        </Wrapper>
    )
}

export default List;
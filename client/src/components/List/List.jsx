import React, { useState, useEffect, useRef } from 'react';
import {spliceAndInsert} from '../../utils';
import styled from 'styled-components';

const Wrapper = styled.div`
`;

const List = ({ items=[],children }) => {
    const [indexMap, setIndexMap] = useState([]);
    const [draggingItem, setDraggingItem] = useState(null);

    useEffect(()=>{
        const newIndexMap = items.sort((i1,i2)=>{
            if(i1.index!==undefined && i2.index!==undefined){
                return i1.index-i2.index;
            }
            return i1.name-i2.name;
        }).map((item,i)=>{
            return i;
        });
        setIndexMap(newIndexMap);
    },[items]);

    const onTouchStart = idx => e => {
        setDraggingItem(items[idx]);
    }

    const onDragEnd = idx => e => {
        setDraggingItem(null);
    }

    const onDragOver = (val,idx) => e =>{
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        
        e.dataTransfer.dropEffect = 'move';
        
        const overred = items[val]===draggingItem;

        if(!overred){
            const srcIdx = items.findIndex(v=>v===draggingItem);
            const draggingIndex = indexMap.findIndex(v=>v===srcIdx);
            const nextIndices = spliceAndInsert(indexMap,idx,draggingIndex);
            setIndexMap(nextIndices);
        }
    };
    const onDrop = (val,idx) => e =>{

        if (e.stopPropagation) {
            e.stopPropagation(); 
        }
    };

    return (
        <Wrapper >
            {
                indexMap.map((val,idx)=>{
                    return children(items[val],{
                        onDragStart : onTouchStart(val),
                        onDragEnd : onDragEnd(val),
                        isDragging : items[val]===draggingItem,
                        onDragOver : onDragOver(val,idx),
                        isDragMoving : draggingItem !== null
                    });
                })
            }
        </Wrapper>
    )
}

export default List;
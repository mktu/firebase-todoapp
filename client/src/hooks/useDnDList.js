import { useState, useEffect, useMemo } from 'react';
import { spliceAndInsert } from '../utils';

export default function(items,sorter,onSort){
    const [indexMap, setIndexMap] = useState([]);
    useEffect(() => {
        const newIndexMap = items.sort(sorter).map((_, i) => i);
        setIndexMap(newIndexMap);
    }, [items,sorter]);
    const onDrop = ({ removedIndex, addedIndex }) => {
        if(addedIndex!==null&&removedIndex!==null){
            const newIndexMap = spliceAndInsert(indexMap, addedIndex,removedIndex);
            setIndexMap(newIndexMap);
            onSort(newIndexMap.map(val=>items[val]));
        }
      };
    const sortedItems = useMemo(()=>{
        return indexMap.filter(val=>items[val]).map((idx) => items[idx]);
    },[items,indexMap]);
    return {
        onDrop,
        sortedItems
    }
}
import React from 'react';
import Default from './Default';
import Contained from './Contained';
import Multiline from './Multiline';

const TextInput = ({ 
    variant = 'default',
    ...props }) => {
    if(variant==='default') return <Default {...props} />;
    if(variant==='contained') return <Contained {...props} />;
    if(variant==='multiline') return <Multiline {...props}/>;
};

export {
    Default,
    Contained
}

export default TextInput;
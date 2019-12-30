import React, {forwardRef} from 'react';
import Default from './Default';
import Contained from './Contained';
import Multiline from './Multiline';

const TextInput = forwardRef(({ 
    variant = 'default',
    ...props }, _ref) => {
    if(variant==='default') return <Default {...props} />;
    if(variant==='contained') return <Contained ref={_ref} {...props} />;
    if(variant==='multiline') return <Multiline {...props}/>;
});

export {
    Default,
    Contained
}

export default TextInput;
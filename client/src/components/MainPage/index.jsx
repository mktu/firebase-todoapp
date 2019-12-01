import React from 'react';
import Presenter from './Presenter';


const MainPage = ()=>{
    return (
        <Presenter 
            renderFooter={()=>(<div>footer</div>)}
        />
    )
}

export default MainPage;
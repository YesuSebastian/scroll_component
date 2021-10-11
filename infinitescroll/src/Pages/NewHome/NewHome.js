import React from 'react';
import ScrollContainer from '../../Components/ScrollContainer';
import ScrollItems from '../../Components/ScrollItems';
import './newhome.css';
const NewHome =() =>{
    return(
        <div className='div-newhome'>
            <ScrollContainer>
                <ScrollItems />
            </ScrollContainer>
        </div>
    )
}

export default NewHome;
import React from 'react';


const Items=({name,id})=>{
    return(
        <div>
            <h1>Drink Choice Model</h1>
            <h2 key={id}>{name}</h2>
            
        </div>
    )
}

export default Items;
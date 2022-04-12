import React from 'react';

const Results =({response})=>{

    return(
        <div>
            <h1>Decision</h1>
            <p1>
                Your response: {response.decision}
            </p1>
        </div>
    )

    
}




export default Results;
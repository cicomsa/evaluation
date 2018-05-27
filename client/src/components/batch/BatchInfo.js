import React from 'react'

export const batchInfo = (batch) => {

    return (
        <div>
            <p> Number: {batch.batchNumber}</p>
            <p> Start Date: {batch.startDate}</p>
            <p> End Date: {batch.endDate}</p> 
        </div>
    )

}
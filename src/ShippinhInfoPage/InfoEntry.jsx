import React from 'react'
import Shipping from "./Shipping.module.css"
const InfoEntry = ({infoType,infoValue}) => {
  return (
    <div className={Shipping.infoEntry} >
              <span>{infoType}</span><span> {infoValue}</span>
                
    </div>
  )
}

export default InfoEntry
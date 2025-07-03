import React from 'react'

const AdressComponent = ({name,options}) => {
  return (
    <div><select name={name} id={name}>
      {options.map((option)=><option value={option}>{option}</option>)}</select></div>
  )
}

export default AdressComponent
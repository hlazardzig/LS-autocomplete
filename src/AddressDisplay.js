import React from 'react'
import { addressDisplayStyles } from './styles'

const AddressDisplay = ({address}) => {
  const classes = addressDisplayStyles()
  return (
    <div className={classes.container}>
      {JSON.stringify(address)}
    </div>
  )
}
export default AddressDisplay
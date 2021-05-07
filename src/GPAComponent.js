import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

const GPAComponent = () => {
  const [value, setValue] = React.useState(null)

  return (
    <div>
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: setValue,
        }}
      />
    </div>
  )
}

export default GPAComponent
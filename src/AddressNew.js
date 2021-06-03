import React from 'react'
import AnalyzeGoogleAddress from './AnalyzeGoogleAddress'
import AddressDisplay from './AddressDisplay'

export const AddressNew = () => {

  const initialAddress = React.useMemo(() => {
    //
    // inital values for address
    //
    // using React.useMemo() just to avoid complaints from the React engine;
    // also see below
    //
    return {
      street_name: '', street_number: '',
      postal_code: '', city: '', country: '',
      googleMapLink: '',
      lat: '', lng: ''
    }
  }, [])

  const [address, setAddress] = React.useState(initialAddress) 
  const [autocomplete, setAutocomplete] = React.useState(null)

  const handlePlaceSelect = React.useCallback(() => {
    //
    // what to do when a place is selected
    //
    // using React.useCallback() just to avoid complaints from te React engine;
    // also see above
    //
    let addressObject = autocomplete.getPlace()
    
    // console.log(addressObject)
    
    if (addressObject.address_components) {
      setAddress({
        ...AnalyzeGoogleAddress(addressObject.address_components),
        googleMapLink: addressObject.url,
        lat: addressObject.geometry.location.lat(),
        lng: addressObject.geometry.location.lng()
      })
    } else {
      setAddress(initialAddress())
    }
  }, [autocomplete, initialAddress])

  React.useEffect(() => {
    //
    // initializing state variable autocomplete; runs once when component is rendered 
    //
    setAutocomplete(new window.google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),{
        language: 'de'
      })
    )
  }, [])

  React.useEffect(() => {
    //
    // runs whenever autocomplete is set (initially to null, see above) 
    // or changed (because of "if" condition also just once, as soon as
    //  autocomplete is set)
    //
    if (autocomplete) {
      setAutocomplete(ac => {
        let nextAc = ac
        nextAc.addListener("place_changed", handlePlaceSelect)
        return nextAc
      })
      console.log('useEffect, depending on autocomplete, which is', autocomplete)  
    }
  }, [autocomplete, handlePlaceSelect, initialAddress])

  const inputRef = React.createRef()

  const handleChange = (evt) => {
    let name = evt.target.name
    let value = evt.target.value
    console.log(name, value)
    setAddress((before) => {
      return {...before, [name]: value}
    })
  }

  const handleReset = (evt) => {
    evt.preventDefault()
    console.log(evt)
    document.getElementById("myForm").reset()
    setAddress(initialAddress)
  }

  console.log(address)
  return (
    <div>
        <form id='myForm'>
          <input id="autocomplete"
            className="input-field"
            ref={inputRef}
            type="text"
            size='60'
          />
          <br />
          <br />
          <br />
            <input 
              name={"street_name"}
              value={address.street_name}
              placeholder={"Straßenname"}
              onChange={handleChange}
            />
            <input 
              name={"street_number"}
              value={address.street_number}
              placeholder={"Nummer"}
              onChange={handleChange}
            />
            <input 
              name={"postal_code"}
              value={address.postal_code}
              placeholder={"PLZ"}
              onChange={handleChange}
            />
            <input 
              name={"city"}
              value={address.city}
              placeholder={"Stadt"}
              onChange={handleChange}
            />
            <input 
              name={"country"}
              value={address.country}
              placeholder={"Land"}
              onChange={handleChange}
            />
            <button onClick={handleReset}>Reset</button>
        </form>
        <AddressDisplay address={address} />
    </div>
  )
}
import React from 'react'

class AddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState()
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.autocomplete = null
  }

  componentDidMount() {
    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      {
        language: 'de'
      }
    )
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
  }

  initialState() {
    return {
      street_name: '',
      street_number: '',
      city: '',
      state: '',
      zip_code: '',
      googleMapLink: '',
      lat: '',
      lng: ''
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    // this.props.dispatch(addParlor(this.state))
    console.log(this.state)
    console.log(event)
    document.getElementById("myForm").reset()
    this.setState(this.initialState())
  }

  handlePlaceSelect() {
    let addressObject = this.autocomplete.getPlace()
    let address = addressObject.address_components
    console.log(addressObject)
    console.log(addressObject?.geometry?.location.lat())
    console.log(addressObject?.geometry?.location.lng())
    
    if (address) {
      this.setState({
        street_name: address[1].long_name,
        street_number: address[0].long_name,
        city: address[4].long_name,
        // state: address[6]?.short_name,
        zip_code: '', // address[8]?.short_name,
        googleMapLink: addressObject.url,
        lat: addressObject.geometry.location.lat(),
        lng: addressObject.geometry.location.lng()
      })  
    } else {
      this.setState(this.initialState())
    }
  }

  render() {
    const input = React.createRef()

    return(
      <div>
        <h1>Google Maps Address Autocomplete</h1>
        <ul>
          <li>
            First enter <i>Schulterblatt 65</i> and select the corresponding entry shown in the dropdown.
          </li>
          <li>
            Then reset the form and enter <i>Schulterblatt</i>, without street number, and select the corresponding entry 
          </li>
          <li>
            Once again reset the form and enter <i>Eppendorfer Weg</i>, without street number, and select the corresponding entry 
          </li>
          <li>
            And now reset the form and enter <i>Eppendorfer Landstraße</i>, without street number, and select the corresponding entry 
          </li>
        </ul>
        <form id='myForm' onSubmit={this.handleSubmit}>
          <input id="autocomplete"
            className="input-field"
            ref={input}
            type="text"
            size='60'
          />
          <br />
          <br />
          <br />
            <input 
              name={"street_name"}
              value={this.state.street_name}
              placeholder={"Straßenname"}
              onChange={this.handleChange}
            />
            <input 
              name={"street_number"}
              value={this.state.street_number}
              placeholder={"Nummer"}
              onChange={this.handleChange}
            />
            <input 
              name={"city"}
              value={this.state.city}
              placeholder={"Stadt"}
              onChange={this.handleChange}
            />
            <input 
              name={"zip_code"}
              value={this.state.zip_code}
              placeholder={"PLZ"}
              onChange={this.handleChange}
            />
            <button onSubmit={this.handleSubmit}>Reset</button>
        </form>
        <p>
          Based on these experiments, I am afraid we will have to check the user input very 
          intensively for errors before we can use it. Additionally, the Maps Autocomplete 
          call does not return a zip code! This can only be determined in a second API call 
          based on longitude and latitude, thus doubling the number API calls necessary.
        </p>
        <br />
        {this.state.lat? `Latitude: ${this.state.lat}` : ''}
        {this.state.lng? ` Longitude: ${this.state.lng}` : ''}
      </div>
    )
  }

}

export default AddressForm
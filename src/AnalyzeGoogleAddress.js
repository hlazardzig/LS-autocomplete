//
// gets Google Adress result, analyzing and mapping it
// to an object of transparently named key/value pairs
//
const AnalyzeGoogleAddress = (address) => {
  let street_number = ''
  let street_name = ''      // Straße, e.g. "Glashütten"
  let urban_district = ''   // Ortsteil, e.g. "Glashütten"
  let city = ''             // Stadt, e.g. Rickenbach
  let county = ''           // Kreis, e.g. "Waldshut"
  let district = ''         // Regierungsbezirk, e.g. "Freiburg"
  let state = ''            // Bundesland, e.g. "Baden-Württemberg"
  let country = ''          // Land, e.g. "Deutschland"
  let postal_code = ''
  let len = address?.length ? address.length : 0

  //
  // need to loop through the array, and depending on type set the value!
  //
  // this could be optimized by using the same keys as Google, for example
  // 'administrative_area_level_1' instead of 'state' or 'locality' instead
  // of 'city', 'route' instead of 'street_name' ... which might make sense
  // when going international. For the moment though I feel better with the
  // traditional labels used here.
  //
  for (let i=0; i<len; i++) {
    let type = address[i].types[0]
    let value = address[i].long_name

    switch(type) {
      case 'country':
        // Staat, e.g. 'Deutschland'
        country = value
      break
      case 'administrative_area_level_1':
        // Bundesland, e.g. 'Baden-Württemberg'
        state = value
      break
      case 'administrative_area_level_2':
        // Bezirk, e.g. 'Freiburg'
        district = value
      break
      case 'administrative_area_level_3':
        // Landkreis, e.g. 'Lörrach', 'Waldshut-Tiengen'
        county = value
      break
      case 'postal_code':
        postal_code = value
      break
      case 'locality':
        city = value
      break
      case 'sublocality_level_1':
        urban_district = value
      break
      case 'route':
        street_name = value
      break
      case 'street_number':
        street_number = value
      break
      default:
        console.log(`unknown type ${type} with value ${value}`)
      break
    }
  }

  return {
    street_number, street_name,
    postal_code, urban_district, city,
    county, district, state, country
  }
}

export default AnalyzeGoogleAddress

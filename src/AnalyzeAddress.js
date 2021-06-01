//
// gets Google Adress result, analyzing and mapping it
// to an object of transparently named key/value pairs
//
const AnalyzeAddress = (address) => {
  let street_number = ''
  let street_name = ''      // Straße, e.g. "Glashütten"
  let urban_district = ''   // Ortsteil, e.g. "Glashütten"
  let city = ''             // Stadt, e.g. Rickenbach
  let county = ''           // Kreis, e.g. "Waldshut"
  let district = ''         // Regierungsbezirk, e.g. "Freiburg"
  let state = ''            // Bundesland, e.g. "Baden-Württemberg"
  let country = ''          // Land, e.g. "Deutschland"
  let zip_code = ''
  let len = address?.length ? address.length : 0

  // Notiz: array umdrehen, von hinten her lesen, breaks entfernen 
  // let lastIndex = address?.length ? address.length -1 : -1

  switch(len) {
    case 1: 
      country = address[0].short_name
    break
    case 2:
      state = address[0].long_name
      country = address[1].short_name
    break
    case 3:
      county = address[0].long_name
      state = address[1].long_name
      country = address[2].short_name
    break
    case 4:
      city = address[0].long_name
      county = address[1].long_name
      state = address[2].long_name
      country = address[3].short_name
    break
    case 5:
      street_name = address[0].long_name
      city = address[1].long_name
      county = address[2].long_name
      state = address[3].long_name
      country = address[4].short_name
    break
    case 6:
      street_name = address[0].long_name
      urban_district = address[1].long_name
      city = address[2].long_name
      county = address[3].long_name
      state = address[4].long_name
      country = address[5].short_name
    break
    case 7:
      urban_district = address[0].long_name
      city = address[1].long_name
      county = address[2].long_name
      district = address[3].long_name
      state = address[4].long_name
      country = address[5].short_name
      zip_code = address[6].long_name > 0 ? address[6].long_name : ''
    break
    case 8:
      street_number = address[0].long_name
      street_name = address[1].long_name    // route
      urban_district = address[2].long_name // sublocality_level1
      city = address[3].long_name           // locality
      county = address[4].long_name   // ?? bugs me
      district = address[4].long_name // ?? bugs me
      state = address[5].long_name
      country = address[6].short_name
      zip_code = address[7].long_name > 0 ? address[7].long_name : ''
    break
    case 9:
      street_number = address[0].long_name
      street_name = address[1].long_name
      urban_district = address[2].long_name
      city = address[3].long_name
      county = address[4].long_name
      district = address[5].long_name
      state = address[6].long_name
      country = address[7].short_name
      zip_code = address[8].long_name > 0 ? address[8].long_name : ''
    break
    default:
      console.log('length of adress is ', len)
    break
  }

  return {
    street_number, street_name,
    zip_code, urban_district, city, county,
    district, state, country
  }
}

export default AnalyzeAddress

import './App.css'
// import { Router, Link } from "@reach/router"
import { Router } from "@reach/router"
import AddressForm from './AddressForm.js'
import { AddressNew } from './AddressNew.js'

export const App = () => {
  return (    
    <div className="App">
      <Router>
        <AddressNew path="/" />
        <AddressForm path="/old" />
      </Router>
    </div>
  )
}

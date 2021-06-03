import './App.css'
// import { Router, Link } from "@reach/router"
import { Router } from "@reach/router"
import AddressFormClass from './AddressFormClass.js'
import { AddressFormFunc } from './AddressFormFunc.js'

export const App = () => {
  return (    
    <div className="App">
      <Router>
        <AddressFormFunc path="/" />
        <AddressFormClass path="/old" />
      </Router>
    </div>
  )
}

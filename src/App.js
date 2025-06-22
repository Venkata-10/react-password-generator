import React,{ useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [passwordPattern, setPasswordPattern] = useState({
    passwordLength : 12,
    includeUpperCase : true,
    includeLowerCase : true,
    includeSpecialCharacters : true,
    includeNumbers : true
  })
  const [password, setPassword] = useState('')

  useEffect(() => {
      generatePassword(passwordPattern)
  },[passwordPattern])

  const generatePassword = (passwordPattern) => {
    const capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const smalls = 'abcdefghijklmnopqrstuvwxyz'
    const numbers  = '0123456789'
    const specials = "!@#$%^&*()_+[]{}|;:,.<>?" 
    
    
    let chars = ""
    if(passwordPattern.includeUpperCase) chars += capitals
    if(passwordPattern.includeLowerCase) chars += smalls
    if(passwordPattern.includeNumbers) chars += numbers
    if(passwordPattern.includeSpecialCharacters) chars += specials

    if(!chars){
       toast.error("Please select at least one option!.")
       return
    }

    let createPassword = ""

    if(passwordPattern.includeUpperCase){
      createPassword += capitals.charAt(Math.floor(Math.random() * capitals.length));
    }
    if(passwordPattern.includeLowerCase){
       createPassword += smalls.charAt(Math.floor(Math.random() * smalls.length));
    }
    if(passwordPattern.includeNumbers){
      createPassword += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    if(passwordPattern.includeSpecialCharacters){
      createPassword += specials.charAt(Math.floor(Math.random() * specials.length));
    }

    const exactLength = passwordPattern.passwordLength - createPassword.length

    for(let i = 0; i < exactLength; i++){
      const index = Math.floor(Math.random() * chars.length)
      createPassword += chars[index]
    }

    createPassword = createPassword.split('').sort(() => Math.random() - 0.5).join('');

    setPassword(createPassword)
  }

  const copyPassword = () => {
    if(!password){
      return
    }
    navigator.clipboard.writeText(password)
    toast.success('Passoword Copied Successfully')
  }

  return (
     <div className="App">
        <h1>Password Generator</h1>
          <div className="output">
            <input 
              type="text" 
              value={password} 
              readOnly
            />
            <button onClick={() => copyPassword()}>Copy</button>
          </div>
         <div className="controls">
          <div className=".form-group">
              <label>
              Password Length : &nbsp;
              <input 
                type="number"
                min='4'
                max='32'
                value={passwordPattern.passwordLength}
                onChange={e => setPasswordPattern({...passwordPattern,passwordLength: e.target.value})}
              />
            </label>
          </div>
          <div className=".form-group">
              <label> 
                <input 
                  type="checkbox"
                  checked={passwordPattern.includeUpperCase}
                  onChange={e => setPasswordPattern({...passwordPattern,includeUpperCase: !passwordPattern.includeUpperCase})}
                />
                Include UpperCase
              </label>
          </div>
          <div className=".form-group">
             <label>
              <input 
                type="checkbox"
                checked={passwordPattern.includeLowerCase}
                onChange={() => setPasswordPattern({...passwordPattern,includeLowerCase: !passwordPattern.includeLowerCase})}
              />
            Include LowerCase
             </label>
          </div>
           <div className=".form-group">
            <label>
              <input 
                type="checkbox"
                checked={passwordPattern.includeNumbers}
                onChange={() => setPasswordPattern({...passwordPattern,includeNumbers: !passwordPattern.includeNumbers})}
              />
              Include Numbers
            </label>
          </div>
          <div className=".form-group">
            <label>
              <input 
                type="checkbox"
                checked={passwordPattern.includeSpecialCharacters}
                onChange={() => setPasswordPattern({...passwordPattern,includeSpecialCharacters: !passwordPattern.includeSpecialCharacters})}
              />
              Include Special Characters
            </label>
          </div>
          <button onClick={() => generatePassword(passwordPattern)}>Generate Password</button>
        </div>
        <ToastContainer />
    </div>
  )
};
export default App;
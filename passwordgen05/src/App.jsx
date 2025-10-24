import { useState,useCallback,useEffect,useRef} from 'react'
import React from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [character,setChar]=useState(false)
  const [password,setPassword]=useState("")


  const passwordRef = useRef(null)



  const passwordGenerator =useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(character) str+="!@£$%^&*()"

    for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
      
    }
    setPassword(pass)

  },[length,numberAllowed,character,setPassword])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
     window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,character,passwordGenerator])
  
  return (
   <div className='w-full min-h-screen bg-blue-300'>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 my-9 text-black bg-gray-500'>
       <h1 className='text-white text-center pt-3 mt-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className=' bg-amber-200 outline-none w-full py-1 px-3 my-6'
          placeholder='password'
          readOnly
          ref={passwordRef}
           />
           <button
           onClick={copyPasswordToClipBoard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
           >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
             <input
              type='range'
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
             />
             <label>Length:{length} </label>
            </div>
            <div className='flex items-center gap-x-1'>
             <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={()=>{
                setNumberAllowed((prev)=>{!prev})
              }}
             />
             <label htmlFor="numberInput">Numbers</label>
            </div>
            </div>
            <div className='flex items-center gap-x-1'>
             <input
              type='checkbox'
              defaultChecked={character}
              id='charInput'
              onChange={()=>{
                setChar((prev)=>{!prev})
              }}
             />
             <label htmlFor="charInput">Characters</label>
            </div>
     </div>
   </div>
  )
}

export default App

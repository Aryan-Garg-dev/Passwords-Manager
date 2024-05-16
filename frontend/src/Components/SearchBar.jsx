import React, { useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState} from 'recoil';
import { searchAtom } from '../Store/atoms';

const SearchBar = () => {
    const inputRef = useRef();
    const [ inputOnFocus, setInputOnFocus ] = useState(false);
    const setSearchValue = useSetRecoilState(searchAtom);
  return (
    <div className='my-2 mx-4 object-contain flex items-center relative group'>
      <input className='bg-gray-100 p-3 w-full rounded-full outline-none px-5 caret-red-500
      font-mono text-lg text-red-500 font-medium shadow-inner shadow-gray-400 hover:shadow-md
      hover:shadow-gray-500 focus:border-2 focus:border-slate-600 placeholder-opacity-50 placeholder-teal-900'
      placeholder='Search'
      ref={inputRef}
      onChange={(e)=>{setSearchValue(e.target.value)}}
     />
     <div className='h-8 w-8 absolute right-5'
     onClick={()=>{
        inputOnFocus ? inputRef.current.focus() : inputRef.current.blur();
        setInputOnFocus(!inputOnFocus);
     }}>
      <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M338.29 338.29L448 448"/></svg>
     </div>
    </div>
  )
}

export default SearchBar

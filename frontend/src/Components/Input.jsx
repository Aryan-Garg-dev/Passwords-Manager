import React from 'react'

const Input = ({dataField, setNew, placeholder})=>{
    return (
        <input className='w-[35%] bg-slate-100 rounded-lg text-teal-800 text-center py-1 caret-red-500
        outline-none border border-slate-500 font-mono' value={dataField}
        onChange={(e)=>{setNew(e.target.value)}}
        placeholder={placeholder}/>
    )
}

export default Input

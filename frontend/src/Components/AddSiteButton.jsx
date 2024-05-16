import React, { useState } from 'react'
import Input from './Input';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { sitesDataAtom } from '../Store/atoms';

const AddSiteButton = () => {
  const [siteName, setSiteName] = useState("");
  const [siteEmail, setSiteEmail] = useState("");
  const [sitePassword, setSitePassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const setSiteData = useSetRecoilState(sitesDataAtom);
  return (
    <div className={`flex flex-col ${clicked && 'bg-slate-400'} p-1.5 rounded-md items-center`}>
      {clicked && (<div className='flex gap-2 px-2'>
        <Input dataField={siteName} setNew={setSiteName} placeholder="Site-Name" />
        <Input dataField={siteEmail} setNew={setSiteEmail} placeholder="User-Email-ID" />
        <Input dataField={sitePassword} setNew={setSitePassword} placeholder="Password" />
      </div>)}
      <div className='flex items-center gap-1'>
        <div className={` ${clicked && ' mt-2'} bg-slate-200 shadow-md shadow-slate-500 active:translate-y-0.5
        cursor-pointer p-1 px-2 m-1 rounded-md`}
        onClick={async ()=>{
          if (clicked && siteName && siteName && sitePassword){
            const saved = await axios.post("http://localhost:3000/api/v1/site/save", {
              site: siteName,
              email: siteEmail,
              password: sitePassword
            });
            const siteData = await axios.get("http://localhost:3000/api/v1/site/fetchAll");
            setSiteData(siteData.data);
            setSiteEmail("");
            setSiteName("");
            setSitePassword("");
          }
          setClicked(!clicked);
        }}>
          <p className='text-slate-700 font-semibold'>{clicked ? "Click to save" : "Add New"}</p>
        </div>
        {clicked && (<div className='h-7 w-7 active:translate-y-0.5 flex items-center top-2 mt-1 bg-red-200 rounded-full border border-red-600 shadow-md shadow-slate-600'
        onClick={()=>setClicked(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>
        </div>)}
      </div>
    </div>
  )
}

export default AddSiteButton

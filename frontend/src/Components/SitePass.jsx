import React, { useCallback, useState } from 'react'
import axios from 'axios'
import Input from './Input';

const SitePass = ({ siteName, siteEmail, sitePassword, siteId, setSiteData}) => {
    const [ locked, setLocked ] = useState(true);
    const [ editable, setEditable ] = useState(false);
    const [ inputSiteName, setSiteName ] = useState(siteName);
    const [ inputSiteEmail, setSiteEmail ] = useState(siteEmail);
    const [ inputSitePassword, setSitePassword ] = useState(sitePassword);
    const copyToClipboard = useCallback((text)=>{
        navigator.clipboard.writeText(text)
        .then(()=>alert("Text copied to clipboard: " + text));
    }, [])
  return (
    <div className='bg-gray-400 rounded-md flex items-center justify-between px-5 cursor-pointer'>
        <div className={`flex justify-around py-2 gap-4 mr-2 w-[90%]`}>
            {editable
                ? (<Input dataField={inputSiteName} setNew = {setSiteName} />)
                : (<div className='text-slate-900 font-medium'>{siteName}</div>)
            }
            {editable
                ? (<Input dataField={inputSiteEmail} setNew = {setSiteEmail} />)
                : (<div className='text-slate-600 hover:text-slate-800'>{siteEmail}</div>)
            }
            {editable
                ? (<Input dataField={inputSitePassword} setNew = {setSitePassword} />)
                : (<div className={`${locked ? 'text-slate-800' : 'text-slate-100'}`}>
                    {
                        locked
                            ? '***********'
                            : sitePassword
                    }</div>)
            }
            
        </div>
        <div className='flex gap-2'>
            <div className='h-4 w-5 active:translate-y-0.5'
                onClick={()=>{
                    setLocked(!locked);
                }}>
                    {locked 
                    ? <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M336 208v-95a80 80 0 00-160 0v95" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><rect x="96" y="208" width="320" height="272" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M336 112a80 80 0 00-160 0v96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><rect x="96" y="208" width="320" height="272" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>}
            </div>
            <div className='h-5 w-5 active:translate-y-0.5'
            onClick={async()=>{
                if (editable){
                    await axios.put("http://localhost:3000/api/v1/site/update", {
                        site: inputSiteName,
                        email: inputSiteEmail,
                        password: inputSitePassword
                    }, {
                        headers: { siteid: siteId }
                    })
                    const siteData = await axios.get("http://localhost:3000/api/v1/site/fetchAll");
                    setSiteData(siteData.data);
                }
                setEditable(!editable);
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"/></svg>    
            </div>
            <div className='h-5 w-5 active:translate-y-0.5'
            onClick={()=>{
                copyToClipboard(siteEmail);
                copyToClipboard(sitePassword);
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M336 64h32a48 48 0 0148 48v320a48 48 0 01-48 48H144a48 48 0 01-48-48V112a48 48 0 0148-48h32" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><rect x="176" y="32" width="160" height="64" rx="26.13" ry="26.13" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/></svg>
            </div>   
            <div className='h-4 w-5 active:translate-y-0.5'
            onClick={async()=>{
                await axios.delete("http://localhost:3000/api/v1/site/delete", {
                    headers: { siteid: siteId }
                })
                const siteData = await axios.get("http://localhost:3000/api/v1/site/fetchAll");
                setSiteData(siteData.data);
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
            </div>
        </div>
    </div>
  )
}



export default SitePass

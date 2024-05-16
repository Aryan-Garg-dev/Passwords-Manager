import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { searchAtom, sitesDataAtom } from '../Store/atoms'
import SitePass from './SitePass';
import AddSiteButton from './AddSiteButton';

const SiteData = () => {
  const [ sitesData, setSitesData ] = useRecoilState(sitesDataAtom); 
  const searchValue = useRecoilValue(searchAtom);
  return (
    <div className='flex flex-col gap-2 mx-4 px-2 pt-2'>
      {sitesData.sites.map((site, index)=>(
        site.site.includes(searchValue) && (<SitePass key={index} siteName = {site.site} siteEmail = {site.email} sitePassword = {site.password} siteId = {site.siteid} setSiteData = {setSitesData} />)
      ))}
      <AddSiteButton />
    </div>
  )
}

export default SiteData

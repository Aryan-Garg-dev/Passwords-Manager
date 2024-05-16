import { selector, atom, atomFamily, selectorFamily } from "recoil";
import axios from 'axios'

export const sitesDataAtom = atom({
    key: "sitesDataAtom",
    default: selector({
        key: "sitesDataSelector",
        get: async()=>{
            const res = await axios.get("http://localhost:3000/api/v1/site/fetchAll");
            return res.data;
        }
    })
})

export const searchAtom = atom({
    key: "SearchAtom",
    default: ""
})
import './home.css'
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { oauthStateLocalStorageKey } from './constants/constants';

function Home() {
    const { hash } = useLocation();
    const [userData, setUserData] = useState({})
    const [authToken, setAuthToken] = useState()
    const [error, setError] = useState("")

    useEffect(() => {
       const hashKeyValuePairs = fromUrlHashToKeyValuePairs(hash)
       if(hashKeyValuePairs[`state`] !== localStorage.getItem(oauthStateLocalStorageKey)) {
            console.log(`CSRF attack`)
            setError("Possible CSRF attack")
            return
       }

       const accessToken = hashKeyValuePairs["access_token"]
       if(accessToken) {
        const token = `Bearer ${hashKeyValuePairs["access_token"]}`
        fetchUserProfile(token)
            .then(profile => setUserData(profile))
            .catch(err => setError(err.message))
        setAuthToken(token)
        }
    }, [])
    
    const fetchUserProfile = useCallback(async (token) => {
        return await axios.get(process.env.REACT_APP_GOOGLE_USER_INFO_URL, {
            headers: {
                Authorization: token
                }})
                .then(responseData => {
                    if(responseData.status === 200){
                        return {email: responseData.data.email}
                    }
                else {
                    throw new Error("Cannot get data from google")
                }
            })
    }, [])
        
    const fromUrlHashToKeyValuePairs = (hash) => {
        const resultMap = {}
        if(!hash || hash.length == 0){
            return {}
        }
        const actualHash = hash.startsWith("#") ? hash.slice(1) : hash
        actualHash.split("&").forEach(fragmetKeyValue => {
            const [key, value] = fragmetKeyValue.split("=")
            resultMap[key] = value
        })
        return resultMap
    }

    return (
        <div className='center'>
            <div>
                <h1>
                    Hello there
                </h1>
                    {userData && userData.email && error === ""  && 
                    <div> Your email fetched from Google is:  
                        <div id='email'>{userData.email}</div>
                        Yout token is:
                        <div>{authToken}</div>
                    </div> 
                }
                {error && <div>{error}</div>}
            </div>
        </div>
    )
}

export default Home;
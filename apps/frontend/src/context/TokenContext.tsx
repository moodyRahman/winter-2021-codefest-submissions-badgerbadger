
import { createContext } from 'react'

export const TokenContext = createContext({
	loggedinUser:"", 
	setLoggedin:(username:string):void => {}, 
	token:"", 
	setToken:(token: string): void => {}
});

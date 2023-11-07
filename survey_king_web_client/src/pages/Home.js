import {Login} from "./Login";

export function Home({userLoggedIn}){
    if(userLoggedIn){
        return (
            <>
            </>
        )
    }else{
        return <Login/>
    }
}
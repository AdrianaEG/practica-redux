import { signInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = (email, password)=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = ()=>{
    return async (dispatch)=>{
        dispatch(checkingCredentials())
        const result = await signInWithGoogle();
        if(!result.ok){
            return dispatch(logout(result.errorMessage))
        }
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName})=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials());
        const {ok, uid, photoUrl, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});
        if( !ok ) return dispatch( logout ({errorMessage}))
        dispatch(login({uid, displayName, email, photoUrl}))
    }
}

export const startLoginWithEmailPassword = ({email, password})=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials());
        const result = await loginWithEmailPassword({email, password})
        if(!result.ok){
           return dispatch(logout(result))
        }
        dispatch(login(result))
    }
}

export const startLogout = ()=>{
    return async(dispatch)=>{
        await logoutFirebase();
        dispatch(clearNotesLogout())
        dispatch(logout({}));
    }
}
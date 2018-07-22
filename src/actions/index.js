
import * as ActionType from './ActionType';

export const isRated = (payload) => {
    return {
        type: ActionType.ON_RATED,
        payload
    }
}
export const isMyPics = (payload) => {
    return {
        type: ActionType.GET_MY_PICS,
        payload
    }
}
export const isSuccess = (payload) => {
    return {
        type: ActionType.ON_SUCCESS,
        payload
    }
}
export const isLoading = (status) => {
    return {
        type: ActionType.ON_LOADING,
        status
    }
}
export const isError = (status) => {
    return {
        type: ActionType.ON_ERROR,
        status
    }
}
export const isSaved = () => {
    return {
        type: ActionType.IS_SAVED,
    }
}
export const isSignin = (user) => {
    return {
        type: ActionType.ON_SIGNIN,
        user
    }
}
export const resetAll = () => {
    return {
        type: ActionType.SIGN_OUT
    }
}
export const isNotSave = () => {
    return {
        type: ActionType.IS_NOT_SAVE,
    }
}
export const getValue = (value) => {
    return {
        type: ActionType.GET_SEARCH,
        value
    }
}
export const showDialog = () => {
    return {
        type: ActionType.SHOW_DIALOG,

    }
}

export const signup = (user) => {
    return postData('/signup', user, isSignin);
}
export const signin = (user) => {
    return postData('/signin', user, isSignin);
}
export const signout = () => {
    return getData('/signout', resetAll);
}
export const addNewPics = (payload) => {
    return postData('/savepics', payload, isSaved);
}
export const deletePics = (book) => {
    return postData('/deletePics', book, isSaved);
}
export const getMyPics = () => {
    return getData('/mypics', isMyPics);
}
export const getPics = () => {
  return getData('/allpics', isSuccess);
}
export const onRate = (payload) => {
    return postData('/ratepics', payload, isSuccess);
}

export const getData = (url, done) => {
  return (dispatch) => {
      // dispatch(isLoading(true));
        fetch(url,
          {
             headers: {
               'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
          })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
              //  dispatch(isLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((response) => {
                dispatch(done(response));
            })
            .catch(() => dispatch(isError(true)));
    }
}

const postData = (url, payload, done) => {
     return (dispatch) => {
       fetch(url, {
           method: 'POST',
           body: JSON.stringify(payload),
           credentials: 'same-origin',
           headers: new Headers({
              'Content-Type': 'application/json'
           })
       })
         .then(res => {
             if(!res.ok){
                 throw Error(res.statusText);
             }
            // dispatch(isLoading(false));
             return res;
         })
         .then(res => res.json())
         .then(res => {
             dispatch(done(res))
        })
         .catch(() => dispatch(isError(true)));
   }
}

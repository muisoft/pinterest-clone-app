import { push } from 'react-router-redux';
import {
    signin, signup, signout, onRate, resetAll, getPics, getMyPics,
    deletePics, showDialog, addNewPics
} from '../../../../actions';

export const mapStateToProps = ({ pinterest }) => {
    return {
        user: pinterest.user,
        pics: pinterest.pics,
        mypics: pinterest.mypics,
        partialState: pinterest.partialState,
        visible: pinterest.dialog.visible,
        dialog: pinterest.dialog,
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => {
            dispatch(signin(user))
        },
        signout: () => {
            dispatch(signout())
        },
        signup: (user) => {
            dispatch(signup(user))
        },
        resetAll: () => {
            dispatch(resetAll())
        },
        getAllPics: () => {
            dispatch(getPics())
        },
        getMyPics1: () => {
            dispatch(getMyPics())
        },
        toMyPics: () => {
            dispatch(push('/mypics'))
        },
        toAllPics: () => {
            dispatch(push('/allpics'))
        },
        removePics: (data) => {
            dispatch(deletePics(data))
        },
        showDialog: () => {
            dispatch(showDialog())
        },
        addNewPics: (payload) => {
            dispatch(addNewPics(payload))
        },
        newBook: () => {
            dispatch(push('/newbook'))
        },
        toLogin: () => {
            dispatch(push('/account/login'))
        },
        onRate: (payload) => {
            dispatch(onRate(payload))
        }
    }
}

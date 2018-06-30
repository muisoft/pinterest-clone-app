
//Here we wrap all our actions we wanted to perform on this App 
export const actionsWrapper = (props) => {
    return {
        renderAllPics: () => {
            props.getAllPics();
           // if (props.user.username) {
               // props.login(props.user);
           // }
        },
        renderMyPics: () => {
            props.getMyPics();
           // if (props.user.username) {
               // props.login(props.user);
           // }
        },
        ratePics: (payload) => {
            props.onRate(payload);
        },
        saveNewPics: (e) => {
            e.preventDefault();
            //We display form for user in order to supply his data
            props.showDialog();
            // We send save new pics request through redux middleware to server
            props.addNewPics({ ...props.partialState, id: props.user._id });
            // then alert that everything goes well
            alert('Successfully added new pics');
            // then stay on the thesame page 
            // without redirecting to another page
            props.toMyPics();
        },
        cancelNewPics: () => {
            props.showDialog();
            props.toMyPics();
        },
        handleChange: (e, m) => {
            const target = m.target;
            const value = target.value;
            const name = target.name;
            props.partialState[name] = value;
        },
        deletePics: (data) => {
            props.removePics({ id: data.id });
            alert('Successfully deleted');
            //props.login(props.user);
            props.toMyPics();
        },
        handleSignout: () => {
            //props.resetAll();
            props.signout();
        },
        onSignin: (e) => {
            e.preventDefault();
            props.login(props.partialState);
            
        },
        onSignup: (e) => {
            e.preventDefault();
            props.signup(props.partialState);
        },
        gotoMyPics: () => {
            props.toMyPics();
        },
        gotoAllPics: () => {
            props.toAllPics();
        }
    }
}
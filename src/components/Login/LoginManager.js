import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFrameWork = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { photoURL, displayName, email } = res.user;
      const singedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      return singedInUser;
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode, errorMessage, email, credential);
    });
};

export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;
      user.success = true;
      return user;
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      const signOutUser = {
        isSignIn: false,
        name: "",
        photo: "",
        email: "",
        error: "",
        success: false,
      };
      return signOutUser;
    })
    .catch((error) => console.log(error));
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
    .then(function () {
      // Update successful.
      console.log("Update successful");
    })
    .catch(function (error) {
      // An error happened.
      console.log("An error happened", error);
    });
};

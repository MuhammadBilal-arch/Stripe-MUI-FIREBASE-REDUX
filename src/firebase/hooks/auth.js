import { auth, usersRef } from "../index";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, where, query, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { onShowToast } from "../../redux/slices/toast";
import {
  onStoreUserData,
  onLogoutUserData,
} from "../../redux/slices/user/user";

export const useCreateAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { verfiy } = useVerificationEmail();
  const onCreateNewAccount = (userdata) => {
    createUserWithEmailAndPassword(auth, userdata?.email, userdata?.password)
      .then(async (response) => {
        await setDoc(doc(usersRef, response.user.uid), {
          firstName: userdata?.firstName,
          lastName: userdata?.lastName,
          email: userdata?.email,
          uId: response.user.uid,
        });
        dispatch(
          onShowToast({
            type: "success",
            text: "You have successfully created account.",
          })
        );

        // await verfiy(userdata.email);
        navigate("/home");
      })
      .catch((error) =>
        dispatch(
          onShowToast({
            type: "error",
            text: "email already exist.",
          })
        )
      );
  };
  return { onCreateNewAccount };
};

export const useSignInAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        dispatch(
          onShowToast({
            type: "success",
            text: "You are successfully logged in.",
          })
        );

        const q = query(usersRef, where("email", "==", response?.user?.email));

        const querySnapshot = await getDocs(q);
        let user = {};
        querySnapshot.forEach((doc) => {
          user = doc.data();
        });

        // console.log(user);

        dispatch(onStoreUserData(user));

        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          onShowToast({
            type: "error",
            text: "email or password doesn't match",
          })
        );
      });
  };
  return { onSignIn };
};

export const useSignOutAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSignOut = async () => {
    await signOut(auth)
      .then(() => {
        dispatch(onLogoutUserData());
        navigate("/");
        dispatch(
          onShowToast({
            type: "success",
            text: "You are successfully logged out.",
          })
        );
      })
      .catch((error) =>
        dispatch(
          onShowToast({
            type: "error",
            text: "something went wrong.",
          })
        )
      );
  };
  return { onSignOut };
};

export const useUserEmail = () => {
  const [emailExist, setemailExist] = useState(true);
  const onCheckEmail = async (email) => {
    const q = query(usersRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //     console.log(doc.id, ' => ', doc.data())
    // })
    // console.log(querySnapshot.docs.length)
    if (querySnapshot.docs.length > 0) {
      //   showToast("Email is already registered", TOAST_TYPE.error);
      setemailExist(true);
    } else {
      setemailExist(false);
      // console.log('No such document!')
    }
  };

  return { onCheckEmail, emailExist };
};

export const useCheckEmailExist = () => {
  const [emailExist, setemailExist] = useState(false);
  const onCheckEmail = async (email) => {
    const q = query(usersRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //     console.log(doc.id, ' => ', doc.data())
    // })
    // console.log(querySnapshot.docs.length)

    if (querySnapshot.docs.length > 0) {
      setemailExist(true);
    } else {
      //   showToast("Please enter valid email", TOAST_TYPE.error);
      setemailExist(false);
    }
  };

  return { onCheckEmail, emailExist };
};

export const useVerificationEmail = () => {
  const verfiy = (email) => {
    console.log(email);
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // showToast("Email verification sent!", TOAST_TYPE.success);
      })
      .catch((error) => showToast(error.message, TOAST_TYPE.error));
  };
  return { verfiy };
};

export const onCheckEmailVerified = () => {
  return auth?.currentUser?.emailVerified;
};

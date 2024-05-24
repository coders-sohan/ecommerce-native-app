import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserData, removeUserData, useUserRegisterMutation } from '../../store/features/user/userSlice';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { Settings } from 'react-native-fbsdk-next';
import { showMessage } from 'react-native-flash-message';



const useFirebase = () => {
    const [userRegister, { data, error: userDetailsError, isLoading: userDetailsLoading }] = useUserRegisterMutation();
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [token, setToken] = useState("");
    const [userDetails, setUserDetails] = useState(null)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    //    goole sigin in process 
    async function onGoogleButtonPress() {
        setLoading(true)
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential).then(res => {
            showMessage({
                type: 'success',
                message: 'Login successfull'
            })
        }).catch(error => {
            setLoading(false)
            showMessage({
                type: 'danger',
                message: 'Login failed',
                duration: 3000
            })
        }).finally(() => {

            // setLoading(false)

        })
    }

    async function onFacebookButtonPress() {
        Settings.initializeSDK()
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }
    // profile update after sign in or others 
    async function profileUpdate(data) {
        auth().currentUser.updateProfile({ displayName: data.name }).then(res => {
            // showMessage({
            //     type: 'success',
            //     message: 'Name update successfull'
            // })
        }).catch(error => {
            setLoading(false)
            showMessage({
                type: 'danger',
                message: 'Something went wrong'
            })
        })


        userRegister(data)
    }
    useEffect(() => {
        if (userDetailsError) {
            setLoading(false)
            setUser(null);

            setToken('')
            showMessage({
                type: 'warning',
                message: 'server error'
            })
        }
        if (data?.user) {
            setUserDetails(data?.user)
            setLoading(false)
        }
    }, [data, userDetailsError])
    //email password signin
    async function createUserEmailPassword(data) {
        setLoading(true)
        const { email, password } = data;
        auth().createUserWithEmailAndPassword(email, password).then(res => {
            if (res?.user?.email) {
                profileUpdate(data)
            }
            showMessage({
                type: 'success',
                message: 'sign up successfull'
            })
        }).catch(error => {
            setLoading(false)
            if (error.code === 'auth/email-already-in-use') {
                showMessage({
                    type: 'danger',
                    message: 'That email address is already in use!'
                })
            }

            if (error.code === 'auth/invalid-email') {
                showMessage({
                    type: 'danger',
                    message: 'That email address is invalid!'
                })
            }
            else {
                showMessage({
                    type: 'danger',
                    message: error?.message
                })
            }
        }).finally(() => {
            // setLoading(false)
        })

    }
    //password reset email 
    const passwordResetEmail = async (email) => {
        return await auth().sendPasswordResetEmail(email)
    }
    //signin email password
    async function signInEmailPassword(email, password) {
        setLoading(true)
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                showMessage({
                    type: 'success',
                    message: 'user sign in successfull '
                })
            })
            .catch(error => {
                setLoading(false)
                if (error.code === 'auth/email-already-in-use') {
                    showMessage({
                        type: 'danger',
                        message: 'That email address is already in use!'
                    })
                }

                if (error.code === 'auth/invalid-email') {
                    showMessage({
                        type: 'danger',
                        message: 'That email address is invalid!'
                    })
                }
                else {
                    showMessage({
                        type: 'danger',
                        message: error?.message
                    })
                }

            }).finally(() => {
                // setLoading(false)
            })
    }
    // Handle user state changes
    function onAuthStateChanged(user) {
        // setLoading(true)
        if (user) {
            setUser(user)
            user.getIdToken().then((token => {
                setToken(token)
            }))
        } else {
            setUser(null)
            setToken('')
        }

        if (initializing) setInitializing(false);
        // setLoading(false)
    }
    // save user based on user status 
    useEffect(() => {
        if (token && user) {
            userRegister({ email: user.email, name: user?.displayName, uid: user.uid })
        }
    }, [token, user])

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        return subscriber; // unsubscribe on unmount
    }, []);

    const logOut = () => {
        setLoading(true)
        auth()
            .signOut()
            .then(() => {
                setUser(null)
                setToken('')
                setUserDetails(null)
            })
            .catch(error => {
                showMessage({
                    type: 'warning',
                    message: 'Try again!'
                })
            }).finally(() => {
                // setLoading(false)
            }
            )
    }
    const phoneNumberVerification = () => {
        auth().settings.setAutoRetrievedSmsCodeForPhoneNumber()
    }
    const init = () => {

    }

    useEffect(() => {
        if (token && userDetails) {
            dispatch(addUserData({ user: userDetails, token: token }))
            setLoading(false)
        } else {
            dispatch(removeUserData({}))
            setUserDetails(null)
            setLoading(false)
        }
        setLoading(false)
    }, [userDetails])
    return {
        onGoogleButtonPress,
        init,
        logOut,
        onFacebookButtonPress,
        createUserEmailPassword,
        signInEmailPassword,
        loading,
        userDetails,
        token,
        userDetailsError,
        userDetailsLoading,
        passwordResetEmail
    }
}
export default useFirebase
import * as yup from 'yup'


// regular expression for validate mobile number 
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
//validation schema
const signupValidationSchema = yup.object().shape({
    fristName: yup
        .string()
        .required(),

    lastName: yup
        .string()
        .required(),

    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Email address is Required"),

    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required("Password is Required"),

    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required("Confirm password is required"),

    PhoneNumber: yup.
        string()
        .required("Phone number is requried")
        .min(11, ({ min }) => `Phone Number must be at least ${min} digit`)
        .max(12, ({ max }) => `Phone Number must be in ${max} digit`)
        .matches(phoneRegExp, 'Phone number is not valid'),
    acceptCondition: yup.boolean() // use bool instead of boolean
        .oneOf([true], "You must accept the terms andconditions"),
})


const updateProfileSchema = yup.object().shape({
    name: yup
        .string()
        .required(),
    PhoneNumber: yup.
        string()
        .required("Phone number is requried")
        .min(11, ({ min }) => `Phone Number must be at least ${min} digit`)
        .max(12, ({ max }) => `Phone Number must be in ${max} digit`)
        .matches(phoneRegExp, 'Phone number is not valid'),
    city: yup
        .string()
        .required("City is Required"),
    upazila: yup
        .string()
        .required("upazila is Required"),
    village: yup
        .string()
        .required("village is Required"),
    house: yup
        .string()
        .required("house is Required"),
    ZipCode: yup
        .string()


})

const UsevalidationSchema = () => {
    return {
        signupValidationSchema,
        updateProfileSchema,
    }
}


export default UsevalidationSchema;
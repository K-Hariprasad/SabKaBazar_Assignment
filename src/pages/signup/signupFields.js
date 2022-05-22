export const signUpFields = [
    {
        type:"text",
        fieldname: "First Name",
        id:"firstName",
        name:"firstName",
        autocomplete:"given-name",
        placeholder:" ",
        pattern:/^[A-Za-z0-9]{4,}$/,
        errMsg: "First Name should have atleast 4 characters and shouldn't include any special character!",
        'aria-invalid':"true",
        'aria-errormessage':"first_name_error"
    },
    {
        type:"text",
        fieldname: "Last Name",
        id:"lastName",
        name:"lastName",
        autocomplete:"given-name",
        placeholder:" ",
        pattern:/^[A-Za-z0-9]{1,}$/,
        errMsg: "Last Name should have atleast 1 character and shouldn't include any special character!",
        'aria-invalid':"true",
        'aria-errormessage':"first_name_error"
    },
    {
        type:"email",
        fieldname: "Email",
        id:"email",
        name:"email",
        autocomplete:"email",
        placeholder:" ",
        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        errMsg: "Email should be in valid format!",
        'aria-invalid':"true",
        'aria-errormessage':"email_error"
    },
    {
        type:"password",
        fieldname: "Password",
        id:"password",
        name:"password",
        autocomplete:"password",
        placeholder:" ",
        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        errMsg: "Password should have minimum six characters, at least one letter, one number and one special character!",
        'aria-invalid':"true",
        'aria-errormessage':"password_error"
    },
    {
        type:"password",
        fieldname: "Confirm Password",
        id:"confirmPassword",
        name:"confirmPassword",
        autocomplete:"password",
        placeholder:" ",
        'aria-invalid':"true",
        'aria-errormessage':"password_error"
    },
]
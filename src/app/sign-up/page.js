'use client'

import { Label } from '@/components/ui/label'
import { initialSignUpFormData, userRegistrationFormControls } from '../utils'
import CommonFormElement from '@/form-element/page';
import { useState } from 'react';


const SignUp = () => {

    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    console.log("signUpFormData: ", signUpFormData);

    return (
        <div>
            <h1>Registration</h1>
            <form>
                {
                    userRegistrationFormControls.map((controlItem) => (
                        <div key={controlItem.name}>
                            <Label>{controlItem.label}</Label>
                            <CommonFormElement 
                                currentItem={controlItem} 
                                value={signUpFormData[controlItem.name]}
                                onChange={(event) => 
                                    setSignUpFormData({
                                        ...signUpFormData,
                                        [event.target.name]: event.target.value
                                    })
                                }
                            />
                        </div>
                    ))
                }
            </form>
        </div>
    )
}

export default SignUp
import s from "./Blank.module.css"
import openEye from "../../icons/openEye.png"
import closeEye from "../../icons/closeEye.png"
import React, {useState} from "react";
import {mocFetch} from "../API/FetchFunc";

const Blank = (props) => {

    const [seePassMode, setSeePassMode] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const [isEmailError, setEmailError] = useState(false)
    const [isPassError, setPassError] = useState(false)
    const [success, setSuccess] = useState(false)

    const validEmail = /^[a-zA-Z0-9]+.[a-zA-Z0-9]+@[a-z]+.[a-z]{2,4}$/
    const validPass = /^[a-zA-Z0-9]{6,20}$/

    const submit = () => {
        const emailIsValid = validEmail.test(emailValue);
        const passIsValid = validPass.test(passValue);

        setEmailError(!emailIsValid);
        setPassError(!passIsValid);

        if (emailIsValid && passIsValid) {
            props.fetch('/login')
                .then(response => {
                    console.log(response.status);
                    return response.json();
                })
                .then(setSuccess(true),
                    green());
        }
    }

    const green = () => {
        document.getElementById('BlankContaner').style.boxShadow = '0px 10px 60px 0px green'

    }


    const changeSeePassModeFalse = () => {
        setSeePassMode(!seePassMode)

        let input = document.getElementsByClassName('InputPass');
        if (input[0].getAttribute('type') == 'password') {
            input[0].setAttribute('type', 'text');
        } else if (input[0].getAttribute('type') == 'text') {
            input[0].setAttribute('type', 'password');
        }

    }

    const onChangeEmailInput = (e) => {
        setEmailValue(e.target.value)
        if (validEmail.test(e.target.value)) {
            setEmailError(false)
        }
    }

    const onChangePassInput = (e) => {
        setPassValue(e.target.value)
        if (validPass.test(e.target.value)) {
            setPassError(false)
        }
    }

    const passRef = React.createRef()
    const emailRef = React.createRef()

    return (
        <div>

            <div id={'BlankContaner'} className={s.BlankContaner}>
                {success ? <div className={s.Login}>Успешно!</div> : <div className={s.Login}>Вход</div>}
                <div>
                    <div className={s.InputNameTitle}>Login</div>
                </div>
                <div className={s.InputUserNameContaner}>
                    <div>
                        <input type={"email"} value={emailValue} onChange={onChangeEmailInput} ref={emailRef}
                               className="InputName"/>
                    </div>
                    <div>{isEmailError ? <div className={s.emailError}>Введите Email</div> : null}</div>
                </div>
                <div>
                    <div className={s.InputPassTitle}>Password</div>
                </div>
                <div className={s.InputPasswordContaner}>
                    <div>
                        <input maxLength={20} value={passValue} onChange={onChangePassInput} ref={passRef}
                               type={"password"} className="InputPass"/>
                    </div>
                    <div onClick={changeSeePassModeFalse}>
                        {seePassMode ? <img className={s.Eye} src={closeEye}></img> :
                            <img className={s.Eye} src={openEye}></img>}
                    </div>
                    <div>{isPassError ?
                        <div className={s.passError}>Латиница, от 5 до 20 символов</div> : null}</div>
                </div>
                <div className={s.ButtonContaner}>
                    <button onClick={submit} className={s.Button}>Submit</button>
                </div>
            </div>
        </div>
    )
}

const BlankContaner = () => {

    const fetch = (url) => {
        return mocFetch(url)
    }

    return (
        <div>
            <Blank fetch={fetch}/>
        </div>
    )
}

export default BlankContaner
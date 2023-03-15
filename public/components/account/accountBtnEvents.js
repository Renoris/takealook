import {validateNickname} from "../util/validationNickName.js";

export async function signUpBtnEventListener(e, signupInfo, genderList, validateDom) {
    e.preventDefault();
    const {email, emailDomain, nickName, firstName, lastName} = signupInfo;
    const {usableNickName, duplicateNickName, usableEmail, duplicateEmail, unUsableNickName, fail} = validateDom;
    if (!validateNickname(nickName)) {
        unUsableNickName.classList.add("valid_show");
        usableEmail.classList.remove("valid_show");
        duplicateEmail.classList.remove("valid_show");
        duplicateNickName.classList.remove("valid_show");
        usableNickName.classList.remove("valid_show");
        return;
    }
    unUsableNickName.classList.remove("valid_show");
    let gender = '';
    genderList.forEach((node) => {
        if (node.checked) {
            gender = node.id;
        }
    });
    const body = {
        email: `${email}@${emailDomain}`,
        firstName: firstName,
        nickName: nickName,
        lastName: lastName,
        gender: gender
    };
    try {
        e.preventDefault();
        const response = await fetch('/api/signup', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(body)
        });
        const result = await response.json();

        if (result.message !== 'success') {
            fail.innerText = result.message;
            throw Error(result.message);
        }
        alert("회원가입이 완료 되었습니다.");
        window.location.href = `${window.location.protocol}//${window.location.host}`;
    } catch (error) {
        //이메일 검증 먼저 들어감
        fail.classList.add("confirm_log_show");
        if (error.message.includes("해당 이메일이 존재합니다")) {
            duplicateEmail.classList.add("valid_show");
        } else if (error.message.includes("해당 닉네임이 존재합니다")) {
            usableEmail.classList.add("valid_show");
            duplicateEmail.classList.remove("valid_show");
            duplicateNickName.classList.add("valid_show");
            usableNickName.classList.remove("valid_show");
        } else {
            usableEmail.classList.remove("valid_show");
            duplicateEmail.classList.remove("valid_show");
            duplicateNickName.classList.remove("valid_show");
            usableNickName.classList.remove("valid_show");
        }
    }
}

export async function validate_nick_btnClickEventListener(e, dom_nick_name, usableNickName, duplicateNickName, unUsableNickName, onClassName) {
    e.preventDefault();
    const nickName = dom_nick_name.value;
    const url = `/api/signup/valid/nickname?${new URLSearchParams({query: nickName})}`;
    try {
        if (!validateNickname(nickName)) {
            unUsableNickName.classList.add(onClassName);
            duplicateNickName.classList.remove(onClassName);
            usableNickName.classList.remove(onClassName);
            return;
        }
        unUsableNickName.classList.remove(onClassName);
        const response = await (await fetch(url)).json();

        if (!response.isExist) {
            usableNickName.classList.add(onClassName);
            duplicateNickName.classList.remove(onClassName);
        } else {
            duplicateNickName.classList.add(onClassName);
            usableNickName.classList.remove(onClassName);
        }
    } catch (error) {
        alert("서버에 문제가 생겼습니다.");
        console.log(error);
    }
}
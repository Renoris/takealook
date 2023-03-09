
export async function signUpBtnEventListener(e, signupInfo, genderList, validateDom) {
    e.preventDefault();
    const {email, emailDomain, nickName, firstName, lastName} = signupInfo;

    let gender = '';
    genderList.forEach((node) => {
        if (node.checked) {
            gender = node.id;
        }
    });
    const body = {
        email: `${email}@${emailDomain}`,
        firstName : firstName,
        nickName : nickName,
        lastName : lastName,
        gender : gender
    };
    try {
        e.preventDefault();
        const response = await fetch('/api/signup', {method : 'POST', headers : {
                'Content-Type' : 'application/json',
            }, body : JSON.stringify(body)});
        const result = await response.json();

        if (result.message !== 'success') {
            validateDom.fail.innerText = result.message;
            throw Error (result.message);
        }
        alert("회원가입이 완료 되었습니다.");
        window.location.href = `${window.location.protocol}//${window.location.host}`;
    }catch (error) {
        //이메일 검증 먼저 들어감
        validateDom.fail.classList.add("confirm_log_show");
        if (error.message.includes("해당 이메일이 존재합니다")) {
            validateDom.duplicateEmail.classList.add("valid_show");
        } else if (error.message.includes("해당 닉네임이 존재합니다")) {
            validateDom.usableEmail.classList.add("valid_show");
            validateDom.duplicateEmail.classList.remove("valid_show");
            validateDom.duplicateNickName.classList.add("valid_show");
            validateDom.usableNickName.classList.remove("valid_show");
        } else {
            validateDom.usableEmail.classList.remove("valid_show");
            validateDom.duplicateEmail.classList.remove("valid_show");
            validateDom.duplicateNickName.classList.remove("valid_show");
            validateDom.usableNickName.classList.remove("valid_show");
        }
    }
}

export async function validate_nick_btnClickEventListener(e, dom_nick_name, usableNickName, duplicateNickName, onClassName) {
    e.preventDefault();
    const nickName = dom_nick_name.value;
    const url = `/api/signup/valid/nickname?${new URLSearchParams({query:nickName})}`;
    try{
        const response = await (await fetch(url)).json();
        if (!response.isExist) {
            usableNickName.classList.add(onClassName);
            duplicateNickName.classList.remove(onClassName);
        } else {
            duplicateNickName.classList.add(onClassName);
            usableNickName.classList.remove(onClassName);
        }
    } catch (error){
        alert(error.message);
    }
}
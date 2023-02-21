
export async function signUpBtnEventListener(e, email, emailPlatform, nickName, firstName, lastName, genderList, fail) {
    e.preventDefault();
    let gender = '';
    genderList.forEach((node) => {
        if (node.checked) {
            gender = node.id;
        }
    });
    const body = {
        email: `${email.value}@${emailPlatform.value}`,
        firstName : firstName.value,
        nickName : nickName.value,
        lastName : lastName.value,
        gender : gender
    };
    try {
        e.preventDefault();
        const response = await fetch('/api/signup', {method : 'POST', headers : {
                'Content-Type' : 'application/json',
            }, body : JSON.stringify(body)});
        if (response.status !== 200) throw Error("기입된 정보중 올바르지 않은 정보가 있습니다.");
        const result = await response.json();
        if (result.message !== 'success') throw Error (result.message);
        window.location.href = `${window.location.protocol}//${window.location.host}`;
    }catch (error) {
        fail.classList.add("confirm_log_show");
        console.log(error.message);
    }
}

import authFetch from "../fetchs/AuthFetch.js";

export async function submitBtnClickEventListener(e, nickName, favorite1, favorite2, favorite3, profileImage ,loadingModal) {
    let favorite = `${(favorite1.value)? favorite1.value : 'ALL'},${(favorite2.value)? favorite2.value : 'ALL'},${(favorite3.value)? favorite3.value : 'ALL'}`;
    const img = profileImage.src;
    try {
        loadingModal.classList.add('modal_on');
        await authFetch('/api/member/my', 'PUT',{nickName:nickName.value, favorite, profileImage:img});
        alert("수정되었습니다.");
        location.reload();
    }catch (error){
        alert("서버와의 통신에 실패하였습니다.");
    }finally {
        loadingModal.classList.remove('modal_on');
    }
}

export async function deleteBtnClickEventListener(e, loadingModal) {
    try {
        loadingModal.classList.add('modal_on');
        const flag = confirm("정말 삭제하시겠습니까?")
        if(flag) {
            await authFetch('/api/member/my','DELETE');
            alert("탈퇴 되었습니다");
            location.href = "/";
        }
    }catch (error){
        alert("서버와의 통신에 실패하였습니다.");
    }finally {
        loadingModal.classList.remove('modal_on');
    }
}
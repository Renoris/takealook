import authFetch from "../fetchs/authfetch.js";
import {spreadMovieInfo} from "./bodyBtnEvent.js";

const access = localStorage.getItem('takealook-access');
const refresh = localStorage.getItem('takealook-refresh');
async function headerInitialize () {
    if (access && refresh) {
        try {
            const response = await authFetch('/api/member/my');
            const {email, nickName} = response;
            const dom_nick_name = document.getElementById("user_nick_name");
            const dom_user_email = document.getElementById('user_email');
            dom_nick_name.innerText = nickName;
            dom_user_email.innerText = email;
        }catch (error) {
            console.log(error);
        }
    }
}

async function bodyInitialize() {
    spreadMovieInfo({limit:10, offset: 0}, access);
}

(async function initialize() {
    headerInitialize();
    bodyInitialize();
})();

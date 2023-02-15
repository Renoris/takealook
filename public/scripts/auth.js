
async function saveToken() {
    const url = window.location.href;
    console.log(url);
    const response = await fetch(url, {method:'POST'});
    const { accessToken, refreshToken} = await response.json();
    alert(`refreshToken : ${refreshToken}`);
    if (accessToken && refreshToken) {
        localStorage.setItem('takealook-access', `bearer ${accessToken}`);
        localStorage.setItem('takealook-refresh', `bearer ${refreshToken}`);
        window.location.href = `${window.location.protocol}//${window.location.host}`;
    }else {
        alert("잘못된 요청입니다. 다시 요청 부탁드립니다.");
        window.location.href = `${window.location.protocol}//${window.location.host}/login`;
    }
}

saveToken();
(async function saveToken() {
    const url = `${window.location.protocol}//${window.location.host}/api${window.location.pathname}`;
    const response = await fetch(url);
    const { accessToken, refreshToken} = await response.json();

    if (accessToken && refreshToken) {
        localStorage.setItem('takealook-access', `bearer ${accessToken}`);
        localStorage.setItem('takealook-refresh', `bearer ${refreshToken}`);
    } else {
        alert("잘못된 요청입니다. 다시 로그인 부탁드립니다.");
    }

    window.location.href = `${window.location.protocol}//${window.location.host}`;
})();
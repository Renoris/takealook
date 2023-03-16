let isChangeAccess = false;

async function authFetch(url, method = "GET" , bodyParam, contentType = 'application/json') {
    if (isChangeAccess) {
        while (true) {
            if (!isChangeAccess) {
                break;
            }
        }
    }
    const init = {
        method,
        headers : {
            'Content-Type' : contentType,
            authorization :  localStorage.getItem('takealook-access')
        }
    };
    if (bodyParam) {
        if (method === 'GET') url = `${url}?${new URLSearchParams(bodyParam).toString()}`
        else {init.body = JSON.stringify(bodyParam)}
    }
    //여기부턴 api 요청
    try {
        const response = await fetch(url, init);
        if (response.status !== 401) {
            return response.json();

        } else {
            isChangeAccess = true;
            const result = await response.json();
            if (result.message.includes("TokenExpiredError")){
                const refreshResponse = await fetch('/api/auth/refresh',
                    {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json',
                            authorization :  localStorage.getItem('takealook-access'),
                            refresh: localStorage.getItem('takealook-refresh'),
                        },
                    });
                if (refreshResponse.status !== 200) throw Error ("토큰 갱신에 실패했습니다.");
                const {accessToken} = await refreshResponse.json();
                localStorage.setItem('takealook-access', `bearer ${accessToken}`);
                init.headers.authorization = localStorage.getItem('takealook-access');
                return await (await fetch(url, init)).json();

            } else {
                throw Error("비정상적인 토큰입니다.")
            }
        }
    } catch (error) {
        localStorage.removeItem('takealook-refresh');
        localStorage.removeItem('takealook-access');
        location.href = '/';
    } finally {
        isChangeAccess = false;
    }
}

export default authFetch;
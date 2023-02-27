let isChangeAccess = false;

async function authFetch(url, bodyParam = {}, method = "GET" ,contentType = 'application/json') {
    if (isChangeAccess) return ;

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

    try {
        const response = await fetch(url, init);
        return response.json();
    } catch (error) {
        try {
            if (error.message === 'TokenExpiredError') {
                if (isChangeAccess) return ;
                isChangeAccess = true;
                const response = await fetch(url, {method : "POST", headers : {'Content-Type' : 'application/json', authorization :  localStorage.getItem('takealook-access')}});
                if (response.status !== 200) throw Error ("토큰 갱신에 실패했습니다.");
                const {accessToken} = await response.json();
                localStorage.setItem('takealook-access', accessToken);
                location.reload();
            } else {
                throw Error("비정상적인 토큰입니다.")
            }
        } catch (error2) {
            localStorage.removeItem('takealook-refresh');
            localStorage.removeItem('takealook-access');
            location.reload();
        }
    }
}

export default authFetch;
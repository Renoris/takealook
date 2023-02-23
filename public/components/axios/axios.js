/****************************************************************
 * axios instance
 ****************************************************************/
const client = axios.create({ baseURL: `${window.location.protocol}//${window.location.host}` });

export default client;

/****************************************************************
 * token handling
 ****************************************************************/
/**
 * accessToken과 refreshToken을 스토리지에 저장하고 axios 헤더에 설정합니다.
 * @param {string} accessToken
 * @param {string} refreshToken
 */
export const setToken = (accessToken, refreshToken) => {
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);
    client.defaults.headers.Authorization = `Bearer ${accessToken}`;
};
/**
 * 저장된 토큰을 세션 스토리지에서 삭제하고 axios 헤더에서 삭제합니다.
 */
export const removeToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    client.defaults.headers.Authorization = null;
};

let isRefreshing = false;
const failedTaskQueue = [];
/**
 * 요청에 실패한 요청을 resolve와 함께 큐에 쌓습니다.
 */
const enroleFailedTask = (request, resolve) => {
    failedTaskQueue.push([request, resolve]);
};
/**
 * 큐에 쌓인 실패한 요청을 모두 요청 하고 그 결과를 resolve 해줍니다.
 */
const resolveFailedTask = () => {
    const accessToken = localStorage.getItem("accessToken");
    while (true) {
        const failedTask = failedTaskQueue.shift();
        if (failedTask) {
            const request = failedTask[0];
            const resolve = failedTask[1];
            request.headers.Authorization = `Bearer ${accessToken}`;
            resolve(request);
        } else {
            break;
        }
    }
};
/**
 * 기존 토큰을 갱신하고 등록합니다.
 */
const renewToken = async () => {
    isRefreshing = true;
    const refreshToken = localStorage.getItem("refreshToken");
    try {
        const response = await axios(`${window.location.protocol}//${window.location.host}/api/auth`,{
            refreshToken: refreshToken,
        });
        setToken(response.data.access_token);
    } catch (error) {
        alert("Please login again.");
        removeToken();
        window.location.href = `${window.location.protocol}//${window.location.host}`
    }
    isRefreshing = false;
    resolveFailedTask(); // 쌓였던 실패 요청 재실행
};
/****************************************************************
 * error handling
 ****************************************************************/
client.interceptors.request.use(
    /**
     * @param {import('axios').AxiosRequestConfig} request
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    async (request) => {
            const accessToken = window.sessionStorage.getItem("accessToken");
            const JWT = decodeJWT(accessToken);
            const expireTimestamp = JWT.exp;
            const currentTimestamp = getTimestamp();
            // console.log(expireTimestamp - currentTimestamp);
            if (expireTimestamp - currentTimestamp < 60) {
                // 토큰의 유효시간이 60초 미만일 경우 토큰 재발급
                const taskPromise = new Promise((resolve) => {
                    enroleFailedTask(request, resolve);
                });
                if (!isRefreshing) renewToken();
                return taskPromise;
            } else {
                // 토큰의 유효시간이 60초 이상일 경우 정상 진행
                return Promise.resolve(request);
            }
    },
    /**
     * @param {import('axios').AxiosError} error
     * @returns {Promise<import('axios').AxiosError>}
     */
    (error) => {
        return Promise.reject(error);
    }
);
client.interceptors.response.use(
    /**
     * @param {import('axios').AxiosResponse} response
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    (response) => Promise.resolve(response),
    /**
     * @param {import('axios').AxiosError} error
     * @returns {Promise<import('axios').AxiosError>}
     */
    async (error) => {
        if (!error.response) {
            alert("Network or Server has a problem.");
        } else if (error.response.status === 401) {
            const request = error.config;
            if (request.url !== "/token") {
                const taskPromise = new Promise((resolve) => {
                    enroleFailedTask(request, resolve);
                }).then((request) => axios(request));
                if (!isRefreshing) renewToken();
                return taskPromise;
            }
        }
        return Promise.reject(error);
    }
);
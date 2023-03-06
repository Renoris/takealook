import {createCover} from "../index/main_contEventListener.js";
const access = localStorage.getItem("takealook-access");

export const addCover = async (query,startRange, endRange ,search ,parentNode) => {
    let resultEnd = false;
    const {genre, pubDate} = search;

    try {
        const params = {
            query,
            limit: endRange - startRange,
            offset: startRange
        };

      류
        let headers = {
            "Content-Type": "application/json",
        };
        if (access !== null || access) {
            headers.authorization = access;
        }
        let url = "/api/movie";
        url = `${url}?${new URLSearchParams(params).toString()}`;

        const response = await fetch(url, {
            headers,
        });

        const result = await response.json();

        if (result.length > 0) {
            result.forEach((movie) => {
                createCover(movie, parentNode);
            });
        }else {
            resultEnd = true;
        }
        return resultEnd;
    } catch (error) {
        alert("서버와의 통신에 실패했습니다.");
    }
};
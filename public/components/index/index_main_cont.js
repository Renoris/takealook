import {mainCont} from "./main_cont.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const findQuery = urlParams.get("query");
await mainCont(findQuery);
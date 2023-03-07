import {mainCont} from "../index/main_cont.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get("query");
mainCont(query);
const removeList = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#035;": "#",
    "&#039;": "",
};
export function replaceSpecialCode(str) {
    for (const key in removeList) {
        str = str.replace(`${key}`, `${removeList[key]}`);
    }

    return str;
}
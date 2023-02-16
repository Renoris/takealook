module.exports = {
    message : function (url) {
        return `안녕하세요, 세상의 모든 영화를 담다. TakeALook 입니다.
         해당 이메일로 로그인 요청이 발생하여, 로그인 URL을 보내드립니다.
         만일 본인이 요청하지 않았을 경우 해당 메일을 무시하시기 바랍니다. 
         감사합니다.
         로그인 URL:
         ${url}`
    },

    subject : function () {return "안녕하세요, 세상의 모든 영화를 담다. TakeALook 입니다. 로그인 요청이 도착했습니다."}
}
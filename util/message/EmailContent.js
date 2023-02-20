const path = require("path");

module.exports = {
    getMessage : function (url) {
        return `안녕하세요, 보고싶은 영화 담아두자! 떼껄룩(Take a Look) 입니다.
         해당 이메일로 로그인 요청이 발생하여, 로그인 URL을 보내드립니다.
         만일 본인이 요청하지 않았을 경우 해당 메일을 무시하시기 바랍니다. 
         감사합니다.
         로그인 URL:
         ${url}`
    },

    getSubject : function () {return "보고싶은 영화 담아두자! 떼껄룩(Take a Look) 입니다. 로그인 요청이 도착했습니다."},

    getHtml : function (url) {
        return `
<div "style="margin: 0;box-sizing: border-box;">
    <div style="background-color: #FFD954;width: 800px;height: 760px;display: flex;justify-content: center;align-items: center;margin: calc((100vh - 760px)/2) auto;">
        <div style="background-color: white;width: 700px;height: 600px;border-radius: 30px;text-align: center;padding: 20px;display: flex;flex-direction: column;align-items: center;">
            <div style="border-bottom: 4px solid #d9d9d9;width: 100%;">
                <div style="border-bottom: 1px solid #D9D9D9;">
                    <img src="https://tamna7-takealook.s3.ap-northeast-2.amazonaws.com/takealook/watching_cat.png"" style="width: 190px;height: 120px;padding-top: 20px;padding-bottom: 20px;margin-bottom: -5px;border-image: linear-gradient(90deg, rgba(201, 133, 243, 1) 0%, rgba(255, 217, 84, 1) 100%);border-image-slice: 1;border-bottom: 4px solid;">
                </div>
            </div>
            <h1 style="font-size: 40px;color: #FF9900;line-height: 32px;display: block;margin-block-start: 0.67em;margin-block-end: 0.67em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;" >안녕하세요 떼껄룩 님,</h1>
            <p style="font-weight: 700;font-size: 16px;">Take a Look에 로그인 하려고 하시는 것 같습니다!<br>
                    로그인하려면 아래 주소에 접속해주세요.</p>
            <div style="display: flex;align-items: center;justify-content: center;gap: 10px;background-color: white;margin-top: 60px;width: 450px;height: 80px;border: 3px solid transparent;background-image: linear-gradient(#fff,#fff), linear-gradient(to bottom, #C985F3, #FFD954);background-origin: border-box;background-clip: content-box, border-box;border-radius: 50px;cursor: pointer;font-size: 30px;font-weight: 700;">
                 <a href="${url}" style="text-decoration: none;color: black;">Take a look 입장 </a>
                 <img src="https://tamna7-takealook.s3.ap-northeast-2.amazonaws.com/takealook/paws.png" style="width: 50px;">
            </div>
        </div>
    </div>
</div>
          
    `},
    getAttachment : function () {
        return [
            {
                filename: 'paws.png',
                path: path.join(__dirname,'..','..','public','images','paws.png'),
                contentType: 'image/png',
                cid: 'paws' //my mistake was putting "cid:logo@cid" here!
            },
            {
                filename: 'watching_cat.png',
                contentType: 'image/png',
                path : path.join(__dirname,'..','..','public','images','watching_cat.png'),
                cid: 'watching_cat' //my mistake was putting "cid:logo@cid" here!
            }
        ]
    }
}
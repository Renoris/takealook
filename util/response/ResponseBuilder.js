
class ResponseBuilder {
    constructor(res) {
        this.res = res;
    }

    setOk() {
        this.res.status(200);
        return new ContentTypeBuilder(this.res);
    }

    setIsCreated() {
        this.res.status(200);
        return new ContentTypeBuilder(this.res);
    }

    setNoContent() {
        this.res.status(201);
        return new ContentTypeBuilder(this.res);
    }

    setBadRequest(message = "올바르지 않은 요청입니다.") {
        this.res.status(400);
        this.res.send({message});
    }

    setUnAuthorized(message = "로그인 되지 않은 사용자 입니다.") {
        this.res.status(401);
        this.res.send({message});
    }

    setNotForbidden(message = "허용되지 않은 권한으로 접근 하였습니다.") {
        this.res.status(403);
        this.res.send({message});
    }

    setInternalError(message = "서버에 문제가 생겼습니다.") {
        this.res.status(500);
        this.res.send({message});
    }
}

class ContentTypeBuilder {
    constructor(res) {
        this.res = res;
    }

    setJson() {
        this.res.header['Content-Type'] = 'application/json';
        return this.res;
    }
}

module.exports = {
    setIsOkToJson: function (res) {
        new ResponseBuilder(res).setOk().setJson();
    },
    badRequest: function (res, message) {
        new ResponseBuilder(res).setBadRequest(message);
    },
    noContent: function (res, message) {
        new ResponseBuilder(res).setNoContent(message);
    },
    noAuthorize: function (res, message) {
        new ResponseBuilder(res).setUnAuthorized(message);
    },
    notForbidden: function (res, message) {
        new ResponseBuilder(res).setNotForbidden(message);
    },
    internalError : function (res, message) {
        new ResponseBuilder(res).setInternalError(message);
    },
}
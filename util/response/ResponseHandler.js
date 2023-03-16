
class ResponseHandler {
    constructor(res) {
        this.res = res;
    }

    setOk() {
        this.res.status(200);
        return new ContentTypeHandler(this.res);
    }

    setIsCreated() {
        this.res.status(200);
        return new ContentTypeHandler(this.res);
    }

    setNoContent() {
        this.res.status(201);
        return new ContentTypeHandler(this.res);
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

class ContentTypeHandler {
    constructor(res) {
        this.res = res;
    }

    setMultipartFormData() {
        this.res.header['Content-Type'] = 'multipart/form-data';
        return this.res;
    }

    setJson() {
        this.res.header['Content-Type'] = 'application/json';
        return this.res;
    }
}

module.exports = {
    setIsOkToJson: function (res) {
        new ResponseHandler(res).setOk().setJson();
    },
    badRequest: function (res, message) {
        new ResponseHandler(res).setBadRequest(message);
    },
    noContent: function (res, message) {
        new ResponseHandler(res).setNoContent(message);
    },
    unAuthorized: function (res, message) {
        new ResponseHandler(res).setUnAuthorized(message);
    },
    notForbidden: function (res, message) {
        new ResponseHandler(res).setNotForbidden(message);
    },
    internalError : function (res, message) {
        new ResponseHandler(res).setInternalError(message);
    },
}
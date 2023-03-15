const pickStorage = require('./PickStorage');
const {sequelize} = require("../../../models/index");

const PickService = {
    getPickMovies: function (memberId) {
        return sequelize.transaction (async (transaction) => {
            if(!memberId) throw Error("로그인 되지 않은 사용자입니다.");
            return await pickStorage.findAllPickMovie(memberId, transaction);
        })
    },

    getPickMovieSimple: function (memberId) {
        return sequelize.transaction (async (transaction) => {
            if(!memberId) throw Error("로그인 되지 않은 사용자입니다.");
            return pickStorage.findAllPickMovieSimple(memberId, transaction);
        })
    },

    pickMovie: function (memberId, movieId) {
        return sequelize.transaction (async (transaction) => {
            if(!memberId) throw Error("로그인 되지 않은 사용자입니다.");
            if(!movieId) throw Error("영화의 id가 선택되지 않았습니다.");
            if (await pickStorage.findPick(memberId, movieId, transaction)) throw Error("이미 해당영화가 선택되었습니다.");
            await pickStorage.insertPick(memberId, movieId, transaction);
        })
    },
    deletePick: function (memberId, movieId) {
        return sequelize.transaction (async (transaction) => {
            if(!memberId) throw Error("로그인 되지 않은 사용자입니다.");
            if(!movieId) throw Error("영화의 id가 선택되지 않았습니다.");
            if (!await pickStorage.findPick(memberId, movieId, transaction)) throw Error("해당영화는 픽 되지 않았습니다.");
            await pickStorage.deletePick(memberId, movieId, transaction);
        })
    },
}

module.exports = PickService;
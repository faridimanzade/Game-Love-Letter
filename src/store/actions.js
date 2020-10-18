export default {
    initializeGame(context, payload) {
        context.commit('initializeGame', payload);
    },

    startTurn(context, payload) {
        context.commit('startTurn', payload);
    },

    makeTurn(context, payload) {
        context.commit('makeTurn', payload);
    },

    playTurn(context, payload) {
        context.commit('playTurn', payload);
    },
};

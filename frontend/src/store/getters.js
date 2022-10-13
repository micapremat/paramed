const getters = {
    isActive: state => !!state.token,
    getLoginModal(state){
        return state.loginModal
    },
    getIsLogin(state){
        return state.isLogin
    }
}

export default getters;
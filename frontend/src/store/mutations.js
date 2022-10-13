import decode from 'jwt-decode'

const mutations = {
    setUser(state, payload){
        state.token = payload;
        if(payload === ''){
            state.userDB
        } else{
            state.userDB = decode(payload);
        }
    },
    setLoginModal(state, payload){
        state.loginModal = payload
    },
    setIsLogin(state, payload){
        state.isLogin = payload
    }
}

export default mutations
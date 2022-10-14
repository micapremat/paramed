import router from "@/router";

const actions = {
    saveUser({commit}, payload){
        localStorage.setItem('token', payload);
        console.log(payload)
        commit('setUser', payload)
      },
    logout({commit}){
      commit('setUser', '');
      localStorage.removeItem('token');
      router.push({name: 'home'}).catch(() => {});
    },
    readToken({commit}){
      const token = localStorage.getItem('token');
      if(token){
        commit('setUser', token);
      }else{
        commit('setUser', '');
      }
    }
}
export default actions
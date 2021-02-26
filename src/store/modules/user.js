import firebase from "firebase"

const state = {
  user: null,
  userData: null
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  },
  setUserData: (state, userData) => {
    state.userData = userData
  },
  clear: state => {
    state.user = null
    state.userData = null
  }

}

const getters = {
  user: state => state.user,
  userData: state => state.userData
}

const actions = {

  async listenUserData({
    commit, state
  }) {
    const db = firebase.firestore()

    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setUser', user)
        
        db.collection('users').doc(state.user.uid).onSnapshot(
          snapshot => {
            const userData = snapshot.data()
            
            commit("setUserData", userData)
          }
        )

      } else {
        commit('clear')
      }
    })
  },
  async login({state}, user) {

    await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(async cred => {
        commit('setUser', cred.user)
      })
      .catch(err => {
        return err
      })
  },
  async logout({}, user) {
    await firebase.auth().signOut()
  },
  async registerUser({}, user) {
      
    const db = firebase.firestore()
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(cred => {
      db.collection('users').doc(cred.user.uid).set({
        name: user.name,
        email: user.email,
        company: user.company,
        notifications: [],
        expected_hours_per_day: 28800
      })
    })
    .catch(err => {
      return err
    }
    )
    
  }
}

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
}

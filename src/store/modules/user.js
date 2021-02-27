import firebase from "firebase"

const state = {
  /**
  *  @user : The current logged in user, if there is no authenticated user,
  *  the app will keep the user in login/register pages.
  */
  user: null,
  /**
   * @userData : Common used attributes from user.
   */
  userData: null
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  },
  setUserData: (state, userData) => {
    state.userData = userData
  },
  /**
   * 
   * @clear It is called to unset user's data, commonly used when logging out.
   */
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

  /**
   * @listenUserData : Starts listening to changes made in user data.
   */
  async listenUserData({
    commit, state
  }) {
    const db = firebase.firestore()

    // Whenever the Authentication changes.
    await firebase.auth().onAuthStateChanged(user => {

      // If there is an authenticated user, keep his data.
      if (user) {
        commit('setUser', user)
        
        db.collection('users').doc(state.user.uid).onSnapshot(
          snapshot => {
            const userData = snapshot.data()
            
            commit("setUserData", userData)
          }
        )
      
      // If there is not an authenticated user, unset all stored data.
      } else {
        commit('clear')
      }
    })
  },

  /**
   * @login : Called to try a login with user.
   */
  async login({state}, user) {

    await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(async cred => {
        commit('setUser', cred.user)
      })
      .catch(err => {
        return err
      })
  },
  /**
   * @logout : Logs the user out
   */
  async logout({}, user) {
    await firebase.auth().signOut()
  },

  /**
   * @registerUser : Try to register the user on firebase firestore.
   */
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

import firebase from "firebase"

const state = {
  /**
   * @days_worked : all the days the user has worked hours.
   */
  days_worked: [],
  /**
   * @unsubscriber : aux state to stop listening to firebase firestore data.
   */
  unsubscriber: null
}

const mutations = {

  /**
   * @setUnsubscriber : setter for state.unsubscriber
   */
  setUnsubscriber: (state, unsub) => state.unsubscriber = unsub,

  /**
   * @addDay : add day to state.days_worked
   */
  addDay: (state, day) => {
    state.days_worked.push(day)
  },

  /**
   * @updateDay : updates specific day from state.days_worked
   */
  updateDay: (state, day) => {
    state.days_worked = state.days_worked.map(element => {
      if(element.date == day.date){
        return day
      }
      else{
        return element
      }
    })
  },

  /**
   * @deleteDay : deletes specific day from state.days_worked
   */
  deleteDay: (state, day) => {
    state.days_worked = state.days_worked.filter(element => {
      if(element.date != day.date){
        return element
      }
    })
  },

  /**
   * @clear : unset all saved data in store
   */
  clear: state => {
    state.days_worked = []
    state.unsubscriber = null
  }

}

const getters = {
  /**
   * 
   * @days_worked : days_worked getter 
   */
  days_worked: state => state.days_worked,
}

const actions = {

  /**
   * 
   * @startListen : Starts listen to days_worked changes,
   *  if something was added, modified or removed.
   */
  startListen({
    commit,
    rootState
  }) {
    const db = firebase.firestore()
    const user_id = rootState.user.user.uid

    new Promise(async (resolve) => {
    let first_snap = true
    let ref = await db.collection('users').doc(user_id).collection("days_worked")

    const unsubscriber = ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const day_worked = change.doc.data()
          day_worked.date = change.doc.id

          if (change.type == "added") {
            commit('addDay', day_worked)
          }
          if (change.type == "modified") {
            commit('updateDay', day_worked)
          }
          if (change.type == "removed") {
            commit('deleteDay', day_worked)
          }
        })
        if (first_snap) {
          resolve()
          first_snap = false
        }
      })
      commit('setUnsubscriber', unsubscriber)

    })
  },

  /**
   * 
   * @sendTime : Send a formatted date to be stored in user/days_worked/day_worked
   */
  async sendTime({
    rootState
  }, day_worked) {

    const db = firebase.firestore()
    const user_id = rootState.user.user.uid

    let now = new Date()
    let date = (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getFullYear()

    await db.collection('users').doc(user_id).collection('days_worked').doc(date).set({
        day_beg: day_worked.day_beg,
        lunch_beg: day_worked.lunch_beg,
        lunch_end: day_worked.lunch_end,
        day_end: day_worked.day_end,
        lunchSeconds: day_worked.lunchSeconds,
        workedSeconds: day_worked.workedSeconds
      })
      .catch(err => {
        return err
      })

  },

  /**
   * 
   * @stopListen : Clears the listener .
   */
  stopListen({commit}){
    if (state.unsubscriber){
      state.unsubscriber()
    } 
    commit('clear')
  }
}

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
}

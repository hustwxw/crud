export default {
  namespace: 'TestModal',
  state: {
    text: '',
    date: []
  },
  effects: {
    *updateStates({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          ...payload
        }
      })
    },    
  },
  reducers: {
    updateState(state, { payload }) {
      for (let key in payload) {
        if (
          typeof payload[key] === 'object' &&
          payload[key] instanceof Array !== true
        ) {
          if (payload[key] === null) {
            payload[key] = null
          } else {
            payload[key] = { ...state[key], ...payload[key] }
          }
        }
      }
      return {
        ...state,
        ...payload
      }
    },
    overrideState(state, { payload }) {
      //覆盖状态
      return {
        ...state,
        ...payload
      }
    },
    updateList(state, { payload }) {
      let list = state.list
      const { key, data } = payload
      list[key] = data
      return {
        ...state,
        list
      }
    }
  },

  subscriptions: {}
}
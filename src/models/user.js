import { queryCurrent, query as queryUsers, getUserData } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    userData: {},
  },
  effects: {
    // *fetch(_, { call, put }) {
    //   const response = yield call(queryUsers);
    //   console.log(response);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },

    //
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getUserData);
      console.log(response);
      if (response.data && response.data.user) {
        const userData = response.data.user;
        yield put({
          type: 'saveCurrentUser',
          payload: userData,
        });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;

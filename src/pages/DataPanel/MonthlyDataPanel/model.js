import { getData } from '@/pages/DataPanel/MonthlyDataPanel/services';

const initState = {
  visitData: [],
}
const Model = {
  namespace: 'monthlyDataPanelModel',
  state: initState,
  effects: {
    *fetch(_, {call, put}){
      const response = yield call(getData);
      yield put({
        type: 'save',
        payload: response,
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    clear(){
      return { ...initState }
    }
  }
}
export default Model;

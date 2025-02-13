import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import { UserApi } from './api/User.Api';
import { FeedbackApi } from './api/Feedback.Api';
import { ordersApi } from "./api/Order.Api";
// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  UserApi: UserApi.reducer,
  FeedbackApi: FeedbackApi.reducer,
  ordersApi: ordersApi.reducer,
});

export default rootReducer;

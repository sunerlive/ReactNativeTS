import * as Immutable from 'immutable'

import { TopicRequest, TopicRequestSuccess, TopicRequestFailure } from './Constants'
import {
  topicRequest,
  topicRequestSuccess,
  topicRequestFailure,
  TopicItem,
  AuthorInfo,
} from './Actions'

// Action Type
export type GetTopicsActionType = ReturnType<typeof topicRequest>
export type GetTopicsSuccessActionType = ReturnType<typeof topicRequestSuccess>
export type GetTopicsFailureActionType = ReturnType<typeof topicRequestFailure>

export type RootActionType = GetTopicsActionType &
  GetTopicsSuccessActionType &
  GetTopicsFailureActionType

// initial State Type

type AuthorInfoRecord = Immutable.Record.Factory<AuthorInfo>

export interface ITopicItem extends TopicItem {
  AuthorInfo: AuthorInfoRecord
}

type TopicItemRecord = Immutable.Record.Factory<ITopicItem>
type TopicItemList = Immutable.List<TopicItemRecord> | Immutable.List<never>

export interface ITopicState {
  isLoading: boolean
  err: null | string
  topicList: TopicItemList
}

const InitialState = Immutable.Record({
  isLoading: false,
  err: null,
  topicList: Immutable.List([]),
} as ITopicState)

export class RootState extends InitialState {}

export const rootState = new RootState()

// root reducer
const RootReducer = (state = rootState, action: RootActionType) => {
  switch (action.type) {
    case TopicRequest:
      return state.set('isLoading', true)
    case TopicRequestSuccess:
      const data = Immutable.fromJS(action.data) as TopicItemList
      return state.set('isLoading', false).set('topicList', data)
    case TopicRequestFailure:
      return state.set('isLoading', false).set('err', action.err)
    default:
      return state
  }
}

export default RootReducer

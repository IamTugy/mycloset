import { createSlice } from '@reduxjs/toolkit';
import {users} from '../dataMock/users'
import _ from 'lodash'

export const TabOptions = {
  MyCloset: 0,
  Feed: 1,
  Stylist: 2,
  QR: 3,
}

const initialState = {
  currentTab: TabOptions.Feed,
  users: users,
  recommendationFinished: false,
  userShown: null,
};

export const appSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.currentTab = action.payload
    },
    finishedRecommendation: (state) => {
      state.recommendationFinished = true
    },
    flipStarVote: (state, action) => {
      const me = state.users[0]
      me.liked_sets = _.union(
        _.difference(me.liked_sets, [action.payload]),
        _.difference([action.payload], me.liked_sets)
      )
    },
    flipOwn: (state, action) => {
      const me = state.users[0]
      me.own = _.union(
        _.difference(me.own, [action.payload]),
        _.difference([action.payload], me.own)
      )
    },
    setShownUser: (state, action) => {
      state.userShown = action.payload
    },
    addSet: (state, action) => {
      state.users[action.payload].custom_clothing_sets.sets[_.random(2000, 20000)] = [1, 4]
    },
    changeSet: (state, action) => {
      state.users[action.payload.user].custom_clothing_sets.sets[action.payload.currentSetId] = action.payload.set
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTab, flipStarVote, flipOwn, finishedRecommendation, setShownUser, addSet, changeSet } = appSlice.actions;

export default appSlice.reducer;

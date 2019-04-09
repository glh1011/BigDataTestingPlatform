import * as constants from './constants';

export const changeSelect = (ids) => ({
  type: constants.CHANGE_SELECTED,
  ids
})
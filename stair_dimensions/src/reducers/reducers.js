import {
  REGULATIONS_SELECT_FAIL,
  REGULATIONS_SELECT_REQUEST,
  REGULATIONS_SELECT_SUCCESS,
  DIMENSIONS_UPDATE_REQUEST,
  DIMENSIONS_UPDATE_SUCCESS,
  DIMENSIONS_UPDATE_FAIL,
} from '../constants/constants'

export const regulationsSelectReducer = (
  state = { regulations: { stairRegs: {} } },
  action
) => {
  switch (action.type) {
    case REGULATIONS_SELECT_REQUEST:
      return { loading: true, success: false, ...state }
    case REGULATIONS_SELECT_SUCCESS:
      return { loading: false, success: true, regulations: action.payload }
    case REGULATIONS_SELECT_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}

export const dimensionsUpdateReducer = (state = { dimensions: {} }, action) => {
  switch (action.type) {
    case DIMENSIONS_UPDATE_REQUEST:
      return { loading: true, success: false }
    case DIMENSIONS_UPDATE_SUCCESS:
      return { loading: false, success: true, dimensions: action.payload }
    case REGULATIONS_SELECT_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}

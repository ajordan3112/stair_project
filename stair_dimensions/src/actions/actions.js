import axios from 'axios'
import {
  REGULATIONS_SELECT_FAIL,
  REGULATIONS_SELECT_REQUEST,
  REGULATIONS_SELECT_SUCCESS,
  DIMENSIONS_UPDATE_FAIL,
  DIMENSIONS_UPDATE_SUCCESS,
  DIMENSIONS_UPDATE_REQUEST,
} from '../constants/constants'

export const selectRegulations = (regsType) => async (dispatch) => {
  try {
    dispatch({ type: REGULATIONS_SELECT_REQUEST })

    const { data } = await axios.get('/application', {
      params: { regs: regsType },
    })

    dispatch({ type: REGULATIONS_SELECT_SUCCESS, payload: data })
  } catch (error) {
    console.log('Redux Fail')
    dispatch({
      type: REGULATIONS_SELECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messsage,
    })
  }
}

export const updateDimensions = (stairInfo) => async (dispatch) => {
  try {
    dispatch({ type: DIMENSIONS_UPDATE_REQUEST })

    const data = stairInfo

    dispatch({ type: DIMENSIONS_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    console.log('Redux Fail')
    dispatch({
      type: DIMENSIONS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messsage,
    })
  }
}

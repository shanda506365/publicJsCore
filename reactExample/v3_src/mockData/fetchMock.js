import fetchMock from 'fetch-mock'
import {mData,optionsData} from './mockData'
 import common, {
  Ajax,
  API
 } from '../lib/common'
fetchMock.mock(API.login, mData);
fetchMock.mock(API.announcement, optionsData);

export default fetchMock
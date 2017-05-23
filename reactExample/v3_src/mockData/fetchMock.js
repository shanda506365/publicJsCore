import fetchMock from 'fetch-mock'
import {mData} from './mockData'
 import common, {
  Ajax,
  API
 } from '../lib/common'
fetchMock.mock(API.login, mData);
fetchMock.mock(API.announcement, mData);

export default fetchMock
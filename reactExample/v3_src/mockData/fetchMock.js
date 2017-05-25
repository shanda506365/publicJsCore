import fetchMock from 'fetch-mock'
import {mData,optionsData} from './mockData'
 import   { 
  API
 } from '../lib/API'
fetchMock.mock(API.login, mData);
fetchMock.mock(API.announcement, optionsData);

export default fetchMock
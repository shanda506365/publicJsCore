 import Action from '../Action'
 import {
 	fromJS
 } from 'immutable'

 import mapDispatchToProps_Common from './mapDispatchToProps_Common'

 const mapDispatchToProps_Main = function(dispatch, ownProps) {
 	return mapDispatchToProps_Common(dispatch, ownProps);
 }

 export default mapDispatchToProps_Main
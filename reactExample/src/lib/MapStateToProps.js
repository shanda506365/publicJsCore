 import Action from './Action'

 import {
 	fromJS
 } from 'immutable'

 import mapStateToProps_Main from './States/mapStateToProps_Main'
 import mapStateToProps_Counter from './States/mapStateToProps_Counter'
 import mapStateToProps_Test from './States/mapStateToProps_Test'
 import mapStateToProps_Quote from './States/mapStateToProps_Quote'
 import mapStateToProps_ReduxForm from './States/mapStateToProps_ReduxForm'
 
 const mapStateToProps = {
 	mapStateToProps_Main,
 	mapStateToProps_Counter,
 	mapStateToProps_Test,
 	mapStateToProps_Quote,
 	mapStateToProps_ReduxForm
 }
 
 export {
 	mapStateToProps_Main,
 	mapStateToProps_Counter,
 	mapStateToProps_Test,
 	mapStateToProps_Quote,
 	mapStateToProps_ReduxForm
 }
 export default mapStateToProps
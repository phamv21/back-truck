import {connect} from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';


const mapStateToProps = state => ({
    errors: state.errors.session || {},
    authenticated: state.session.isAuthenticated || false
});
const mapDispatchToProps = dispatch =>({
    login: user => dispatch(login(user)),
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
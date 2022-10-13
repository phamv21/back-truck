import SignupForm from "./signup_form";
import { connect } from "react-redux";
import { signup } from "../../actions/session_actions";


const mapStateToProps = state => ({
    isSignIn: state.session.isSignedIn || false,
    errors: state.errors.session || {},

})
const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);
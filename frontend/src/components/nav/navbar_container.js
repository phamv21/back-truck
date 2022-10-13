import { connect } from "react-redux";
import Navbar from "./navbar";
import { logout } from "../../actions/session_actions";

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
});
export default connect(mapStateToProps,{logout})(Navbar);
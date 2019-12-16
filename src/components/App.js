import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
//import '../styles.css';
import { Role } from '../helpers/role';
import { history } from '../history';
import { authenticationService } from '../services/authentication.service';
import { PrivateRoute } from '../components/PrivateRoute';
//import { HomePage } from '../HomePage/HomePage';
import { AdminPage } from '../AdminPage/AdminPage';
import { LoginPage } from '../LoginPage/LoginPage';
import { StartPage } from '../StartPage/StartPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            isLoggedIn: true,
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }
    
    render() {
        const { currentUser, isAdmin } = this.state;
        
        return (
            <Router history={history}>
                <div className="ui container">
                <div>           
                  <div className="ui secondary pointing menu">      
                            <div className="right pointing menu">
                                
                                {currentUser && <div className="ui secondary pointing">
                                    <div className="ui secondary pointing menu">
                                        <Link to="/" onClick={this.logout} className="item" id="headerlink">Logout</Link>
                                {isAdmin && 
                                    <Link to="/admin" className="item" id="headerLink">
                                        Admin
                                    </Link>
                                    
                                }
                                </div> 
                                </div>
                            }
                            </div>
                        </div>
                        </div>
                    <div className="ui container">
                        <div className="ui container">
                            <div className="row">
                                <div>
                                    <PrivateRoute exact path="/" component={StartPage} />
                                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
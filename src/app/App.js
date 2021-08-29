import Main from '../screens/main';
import { history } from './../helpers';
import { toast } from "react-toastify";
import {Router, Route, Switch, Redirect } from 'react-router-dom';
import {Helmet} from 'react-helmet';
function App() {
  toast.configure();  
  return (

          <Router history={history}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Remote Vend Portal</title>
                <link rel="canonical" href="http://example.com" />
            </Helmet>
            <Switch>
              <Route exact path='/' component={Main}/>
              <Redirect from="*" to="/" />
            </Switch>
          </Router> 
  );
  
}

export default App;

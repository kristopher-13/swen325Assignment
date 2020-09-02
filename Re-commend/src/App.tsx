import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './UI/Home';
import Front from './UI/Front';
import Register from './UI/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './UI/theme/variables.css';
import AuthContext from './Business/AuthProvider'

const App: React.FC = () => {
  const {auth} = React.useContext(AuthContext);

return(
  <IonApp>
    {auth.isLogin == false?<IonReactRouter>
      <IonRouterOutlet>
        <Route path="/front" component={Front} exact={true} />
        <Route path="/home" component={Home} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/front" />} />
      </IonRouterOutlet>
    </IonReactRouter>
    :
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
    }
  </IonApp>
)
};

export default App;

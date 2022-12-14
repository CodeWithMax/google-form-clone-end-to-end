
import React from 'react';
import {BrowserRouter as Router ,Switch, Route} from "react-router-dom"
import Formheader from './Formheader';
import Header from "./Header"
import Mainbody from './Mainbody';
import SubmitForm from './QuestionPaper';
import Question_form from './Question_form';
import CenteredTabs from './Tabs';
import Templates from './Templates';
import User_form from './user_form';
import UserResponseForm from './UserResponseForm';



function App() {
  return (
    <div className="app">
         <Router>
           <Switch>
                   
           <Route path="/form/:id">
                 <Formheader />
                
                 <CenteredTabs />
              </Route>

              <Route path="/response">
                 <User_form />
              </Route>

              <Route path="/questionPaper/:docId">
                 <UserResponseForm />
              </Route>

              <Route path="/submitted">
                 <SubmitForm />
              </Route>

              
              
              <Route path="/" exact>
                <Header />
                <Templates />
                <Mainbody />
              </Route>
        
           </Switch>
         </Router>

    </div>
  );
}

export default App;

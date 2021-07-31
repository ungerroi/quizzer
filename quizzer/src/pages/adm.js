import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cnd from "./Cnd"
import Exm from "./Exm"
import Rps from "./Rps"
import Rid from "./Rid"
import Cid from "./Cid"
import Eid from "./Eid"
import Def from "./Def"
import Lgn from "./Lgn"
function Adm () {
    return(
        <>
            <Router>
                <Link to="/adm/rps"><button>Repositories</button></Link>
                <Link to="/adm/cnd"><button>Candidates</button></Link>
                <Link to="/adm/exm"><button>Exams</button></Link>
                <Switch>
                    <Route exact path="/adm/rps" component={Rps} />
                    <Route exact path="/adm/cnd" component={Cnd} />
                    <Route exact path="/adm/exm" component={Exm} />
                    <Route exact path="/adm/def" component={Def} />
                    <Route exact path="/adm/rps/:rid" component={Rid} />
                    <Route exact path="adm/rps/new" component={Rid} />
                    <Route exact path="/adm/cnd/:cid" component={Cid} />
                    <Route exact path="adm/cnd/new" component={Cid} />
                    <Route exact path="/adm/exm/:eid" component={Eid} />
                    <Route exact path="adm/exm/new" component={Eid} />
                    <Route exact path="lgn" component={Lgn} />
                </Switch>
            </Router>
        </>
    )
}

export default Adm;

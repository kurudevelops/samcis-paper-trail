import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <button className="sidebar-btn"><img src="images/sidebar-icon.svg" alt="Button for closing or opening the sidebar" /></button>
            <img className="paper-trail-logo" src="images/paper-trail-logo.png" alt="Paper Trail logo" />
            <nav>
                <ul>
                    <li><Link to='/'>Dashboard</Link></li>                
                    <li><Link to='/repository'>Repository</Link></li>
                    <li><Link to='/document-control-requests'>Document Control Requests</Link></li>
                    <li><Link to='/calendar'>Calendar</Link></li>
                    <li><Link to='/quality-records'>Quality Records</Link></li>
                    <li><Link to='/qom'>Objectives & Targets Monitoring</Link></li>
                    <li><Link to='/rfa'>Request for Action</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>                    
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
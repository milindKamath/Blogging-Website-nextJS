import classes from './navigation.module.css';
import Link from "next/link";

function Navigation(){
    return (
        <nav className={"navbar navbar-expand-lg navbar-light bg-light"}> 
            <div className="container">
                <div className="navbar-header">
                    <h1 className="navbar-brand"> <Link href="/createblog">Daily Journal</Link></h1>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li className={classes.listItem}><Link href="/"> Home </Link></li>
                    <li className={classes.listItem}><Link href="/about"> About us </Link></li>
                    <li className={classes.listItem}><Link href="/contact"> Contact us </Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
import "../css/Navbar.css"
function Navbar() {
    return (
        <div>

            <div className="navbar">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/vote">Vote</a></li>
                </ul>
            </div>
        </div>
    );
}
export default Navbar;
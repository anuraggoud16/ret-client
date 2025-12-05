import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()}  - Realtime Expense Tracker. All rights reserved.</p>
        </footer>    );
}

export default Footer;
import logo from "../../assets/images/logo/logo.webp";
import { Link } from "react-router-dom";
import "./footer.scss";
const Footer: React.FC = () => {
  return (
    <footer className="footer flex items-center justify-center">
      <div className="inner-footer flex items-center justify-between">
        <img src={logo} alt="logo" />
        <p>
          All names and trademarks used on this website belong to their
          respective owners. This site is for informational purposes only and is
          not affiliated with or endorsed by official products or publishers
          associated with Magic: The Gathering. All card images, texts, and
          other content are the property of their respective creators.
          <br />
          <br />
          This site utilizes the API provided by Scryfall{" "}
          <a className="footer-link" href="https://scryfall.com/docs/api">
            https://scryfall.com/docs/api
          </a>
        </p>
        <ul className="nav-links flex flex-col">
          <li className="nav-link">
            <Link to={"/"}>Search</Link>
          </li>
          <li className="nav-link">
            <Link to={"/advanced-search"}>Advanced Search</Link>
          </li>
          <li className="nav-link">
            <Link to={"/sets"}>Sets</Link>
          </li>
          <li className="nav-link">
            <Link to={"/guess-the-card"}>Guess The Card</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

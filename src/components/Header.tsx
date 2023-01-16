import { useLocation, Link } from "react-router-dom";
import HeaderLogo from "../assets/header-logo-3.png";

function pathMatcherRoute(route: string): boolean {
  //Does this route match the current URL location path
  const location = useLocation();
  if (route === location.pathname) {
    return true;
  }
  return false;
}

export default function Header(): JSX.Element {
  const linkStyle =
    "py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent";
  const pathMatchStyle = "text-black border-b-red-500";

  return (
    <div className="bg-white border-b shadow-lg sticky top-0 z-50 px-3">
      <header className="flex justify-between items-center px-1 max-w-6xl mx-auto ">
        <div>
          <Link to={"/"}>
            <img
              className="h-9 cursor-pointer"
              src={HeaderLogo}
              alt="Razen Real Estate"
            />
          </Link>
        </div>
        <div>
          <ul className="flex space-x-10">
            <Link className="cursor-pointer" to={"/"}>
              <li
                className={`${linkStyle} ${
                  pathMatcherRoute("/") && pathMatchStyle
                }`}
              >
                Home
              </li>
            </Link>
            <Link className="cursor-pointer" to={"/offers"}>
              <li
                className={`${linkStyle} ${
                  pathMatcherRoute("/offers") && pathMatchStyle
                }`}
              >
                Offers
              </li>
            </Link>
            <Link className="cursor-pointer" to={"/sign-in"}>
              <li
                className={`${linkStyle} ${
                  pathMatcherRoute("/sign-in") && pathMatchStyle
                }`}
              >
                Sign in
              </li>
            </Link>
          </ul>
        </div>
      </header>
    </div>
  );
}

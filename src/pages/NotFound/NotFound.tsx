import QuestionMarkSvg from "../../assets/images/icons/questionMark.svg?react";
import { Link } from "react-router-dom";
import "./notFound.scss";
interface NotFoundProps {
  message: string;
}
const NotFound: React.FC<NotFoundProps> = ({ message }) => {
  return (
    <section className="Not-found flex justify-center items-center">
      <QuestionMarkSvg />
      <div>
        <h1>{message} Not Found</h1>
        <Link to={"/"}>
          <button>Go to search page</button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;

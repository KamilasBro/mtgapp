import NameSvg from "../../assets/images/icons/name.svg?react";
import TextSvg from "../../assets/images/icons/text.svg?react";
import TypeSvg from "../../assets/images/icons/type.svg?react";
import "./advancedSearch.scss";
const AdvancedSearch: React.FC = () => {
  return (
    <section className="Advanced_search flex justify-center">
      <form
        className="inner"
        onSubmit={(event) => {
          event?.preventDefault();
        }}
      >
        <h1>Advanced Search</h1>
        <ul className="filters flex flex-col">
          <li className="filter filter-name">
            <div className="flex justify-between">
              <div className="filter-tag flex items-center">
                <NameSvg />
                Name
              </div>
              <div className="input-wrap flex">
                <input placeholder="Any words in the name ex. “jace”" />
              </div>
            </div>
            <hr />
          </li>
          <li className="filter filter-text">
            <div className="flex justify-between">
              <div className="filter-tag flex items-center">
                <TextSvg />
                Text
              </div>
              <div className="input-wrap flex">
                <input placeholder="Any words in text ex. “discard a card”" />
              </div>
            </div>
            <hr />
          </li>
          <li className="filter filter-text">
            <div className="flex justify-between">
              <div className="filter-tag flex items-center">
                <TypeSvg />
                Type
              </div>
              <div className="input-wrap flex">
                <div style={{width: "100%"}}>
                  <input placeholder="Enter a type and choose from the list" />
                </div>
              </div>
            </div>

            <hr />
          </li>
        </ul>
        <div className="flex justify-center">
          <button>Search with this options</button>
        </div>
      </form>
    </section>
  );
};

export default AdvancedSearch;

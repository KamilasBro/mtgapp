import React, { useState, useEffect } from "react";
import SearchSvg from "../../assets/images/icons/search.svg?react";
import "./sets.scss";

interface Set {
  id: string;
  name: string;
  icon_svg_uri: string;
}

const Sets: React.FC = () => {
  const [sets, setSets] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [searchedName, setSearchedName] = useState("");
  useEffect(() => {
    const fetchCards = async () => {
      try {
        await new Promise((resolve) => {
          setTimeout(resolve, 100); // Set a timeout of 100ms
        });
        const apiUrl = `https://api.scryfall.com/sets`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        } else {
          const data = await response.json();
          setSets(data.data);
          setIsFetched(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCards();
  }, []);
  console.log(sets);
  return (
    <section className="Sets">
      <h1 className="">Search for a set</h1>
      <div className="search-bar flex">
        <div className="search-wrap flex items-center justify-center">
          <SearchSvg />
        </div>
        <div className="input-wrap flex items-center">
          <input
            placeholder='Any set name ex. "dominaria"'
            onChange={(event) => {
              setSearchedName(event.currentTarget.value);
            }}
          />
        </div>
      </div>
      <ul className="sets-wrap flex flex-wrap">
        {isFetched
          ? sets
              .filter((set: Set) =>
                set.name.toLowerCase().includes(searchedName.toLowerCase())
              )
              .map((set: Set) => (
                <li
                  className="set-tile flex items-center justify-center"
                  key={set.id}
                  onMouseEnter={(event) => {
                    event.currentTarget.classList.add("active");
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.classList.remove("active");
                  }}
                >
                  <img src={set.icon_svg_uri} alt={set.name} />
                  {set.name}
                </li>
              ))
          : Array(9)
              .fill(null)
              .map((_, index) => {
                return (
                  <li
                    key={"set" + index}
                    className="set-tile-placeholder flex items-center justify-center"
                  ></li>
                );
              })}
      </ul>
    </section>
  );
};

export default Sets;

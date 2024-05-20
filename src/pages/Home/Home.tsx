import React, { useState, useLayoutEffect } from "react";
import SearchSvg from "../../assets/images/icons/search.svg?react";
import CardPlaceholder from "../../components/CardPlaceholder/CardPlaceholder";
import { Link, useNavigate } from "react-router-dom";
import { CardData } from "../../interfaces/CardsInterface";
import FormatString from "../../utils/FormatString";
import "./home.scss";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [randomCards, setRandomCards] = useState<CardData[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [loadedImages, setLoadedImages] = useState(0);
  const [searchedName, setSearchedName] = useState("");

  useLayoutEffect(() => {
    //there is choose random in scryfall API but i cant load multiple cards per API call
    //and it was fetching couple seconds
    //now it is loading faster but have to work it around
    const fetchRandomCards = async () => {
      try {
        await new Promise((resolve) => {
          setTimeout(resolve, 100); // Set a timeout of 100ms
        });

        const randomNumber = Math.floor(Math.random() * 4) + 1;
        const apiUrl = `https://api.scryfall.com/cards/search?page=${randomNumber}&q=(game:paper)+is:fullart+lang:en`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        } else {
          const data = await response.json();
          // Create a copy of randomCards to avoid mutating the state directly
          const updatedRandomCards = [...randomCards];

          // Loop until we have 6 unique cards or run out of cards in the response
          while (updatedRandomCards.length < 6 && data.data.length > 0) {
            const newCardIndex = Math.floor(Math.random() * data.data.length);
            const newCard = data.data[newCardIndex];
            // Check if the new card already exists in updatedRandomCards
            if (!updatedRandomCards.some((card) => card.id === newCard.id)) {
              updatedRandomCards.push(newCard);
            }
            // Remove the card from data so it's not selected again
            data.data.splice(newCardIndex, 1);
          }

          // Update the state with the new random cards
          setRandomCards(updatedRandomCards);
          setIsFetched(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRandomCards();
  }, []);
  return (
    <section className="Home">
      <h1 className="page-title">Search for a card</h1>
      <div className="search-bar flex">
        <Link
          to={`/search?q=${searchedName}${
            searchedName === "" ? "lang:en" : "&lang:en"
          }&page=1`}
        >
          <div className="search-wrap flex items-center justify-center">
            <SearchSvg />
          </div>
        </Link>
        <div className="input-wrap flex items-center">
          <input
            placeholder='Any card name ex. "black lotus"'
            onChange={(event) => {
              setSearchedName(FormatString(event.target.value));
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                navigate(
                  `/search?q=${searchedName}${
                    searchedName === "" ? "lang:en" : "&lang:en"
                  }&page=1`
                );
              }
            }}
          />
        </div>
      </div>
      <ul className="flex">
        <Link to={"/advanced-search"}>
          <button>Advanced Search</button>
        </Link>
        <Link to={"/sets"}>
          <button>Sets</button>
        </Link>
        <button>Lucky Search</button>
        <Link to={"/guess-the-card"}>
          <button>Guess The Card</button>
        </Link>
      </ul>
      <ul className="cards flex justify-between flex-wrap">
        {loadedImages < randomCards.length &&
          Array(6)
            .fill(null)
            .map((_, index) => <CardPlaceholder key={index} />)}
        {isFetched &&
          randomCards.map((card) => (
            <li
              key={card.id}
              style={{
                display: loadedImages === randomCards.length ? "block" : "none",
              }}
            >
              {card.image_uris ? (
                <img
                  className="card"
                  src={card.image_uris.normal}
                  alt="Card"
                  loading="eager"
                  onLoad={() => setLoadedImages((prevState) => prevState + 1)}
                />
              ) : (
                card.card_faces && (
                  <img
                    className="card"
                    src={card.card_faces[0].image_uris.normal}
                    alt="Card"
                    loading="eager"
                    onLoad={() => setLoadedImages((prevState) => prevState + 1)}
                  />
                )
              )}
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Home;

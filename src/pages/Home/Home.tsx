import React, { useState, useEffect } from "react";
import SearchSvg from "../../assets/images/icons/search.svg?react";
import CardPlaceholder from "../../components/CardPlaceholder/CardPlaceholder";
import { Link, useNavigate } from "react-router-dom";
import { CardData } from "../../interfaces/CardsInterface";
import FormatString from "../../utils/FormatString";
import LoadingCardsAnim from "../../components/LoadingCardsAnim/LoadingCardsAnim";
import "./home.scss";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showcaseCards, setShowcaseCards] = useState<CardData[]>([]);
  const [randomCard, setRandomCard] = useState<CardData>();
  const [isFetched, setIsFetched] = useState({
    showCaseFetched: false,
    randomCardFetched: false,
  });
  const [loadedCards, setLoadedCards] = useState<boolean[]>([]); // Track loading state for each card
  const [searchedName, setSearchedName] = useState("");

  useEffect(() => {
    const fetchRandomCard = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 50));
        const apiUrl = `https://api.scryfall.com/cards/random?lang:en`;

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setRandomCard(data);
        setIsFetched((prevState) => ({
          ...prevState,
          randomCardFetched: true,
        }));
      } catch (error) {
        console.error("Error fetching random card:", error);
      }
    };
    fetchRandomCard();
  }, []);

  useEffect(() => {
    const fetchShowcaseCards = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 50));

        const randomNumber = Math.floor(Math.random() * 4) + 1;
        const apiUrl = `https://api.scryfall.com/cards/search?page=${randomNumber}&q=(game:paper)+is:fullart+lang:en`;

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const uniqueCards: CardData[] = [];

        while (uniqueCards.length < 6 && data.data.length > 0) {
          const newCardIndex = Math.floor(Math.random() * data.data.length);
          const newCard = data.data[newCardIndex];
          if (!uniqueCards.some((card) => card.id === newCard.id)) {
            uniqueCards.push(newCard);
          }
          data.data.splice(newCardIndex, 1);
        }

        setShowcaseCards(uniqueCards);
        setLoadedCards(Array(uniqueCards.length).fill(false)); // Initialize loading state for cards
        setIsFetched((prevState) => ({
          ...prevState,
          showCaseFetched: true,
        }));
      } catch (error) {
        console.error("Error fetching showcase cards:", error);
      }
    };
    fetchShowcaseCards();
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedCards((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = true; // Mark the card as loaded
      return updatedState;
    });
  };

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
        <Link to={"/advanced"}>
          <button>Advanced Search</button>
        </Link>
        <Link to={"/sets"}>
          <button>Sets</button>
        </Link>
        <Link
          to={`/card/${randomCard?.set || ""}/${
            randomCard?.collector_number || ""
          }`}
        >
          <button disabled={!isFetched.randomCardFetched}>Lucky Search</button>
        </Link>
        <Link to={"/guess"}>
          <button>Guess The Card</button>
        </Link>
      </ul>
      <ul className="cards flex justify-between flex-wrap">
        {showcaseCards.length === 0 ? (
          <LoadingCardsAnim />
        ) : (
          <>
            {showcaseCards.map((card, index) => (
              <li
                onClick={() =>
                  navigate(`/card/${card.set}/${card.collector_number}`)
                }
                key={card.id}
              >
                {!loadedCards[index] && <CardPlaceholder />} {/* Placeholder */}
                {card.image_uris ? (
                  <img
                    className="card"
                    src={card.image_uris.normal}
                    alt="Card"
                    loading="eager"
                    onLoad={() => handleImageLoad(index)} // Update load state
                    style={{ display: loadedCards[index] ? "block" : "none" }} // Hide until loaded
                  />
                ) : (
                  card.card_faces && (
                    <img
                      className="card"
                      src={card.card_faces[0].image_uris.normal}
                      alt="Card"
                      loading="eager"
                      onLoad={() => handleImageLoad(index)}
                      style={{ display: loadedCards[index] ? "block" : "none" }}
                    />
                  )
                )}
              </li>
            ))}
          </>
        )}
      </ul>
    </section>
  );
};

export default Home;

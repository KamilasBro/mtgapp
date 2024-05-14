import React, { useState, useEffect } from "react";
import SearchSvg from "../../assets/images/icons/search.svg?react";
import CardPlaceholder from "../../components/CardPlaceholder/CardPlaceholder";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import store, { setSearchAPIUrl } from "../../store/store";
import { CardData } from "../../interfaces/CardsInterface";
import "./home.scss";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [randomCards, setRandomCards] = useState<CardData[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [loadedImages, setLoadedImages] = useState(0);
  const [searchedName, setSearchedName] = useState("");

  // Access state from the Redux store
  const searchAPIUrlOpt = store.getState().searchAPIUrlOpt;

  useEffect(() => {
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
  function formatString(inputString: string) {
    // Replace multiple spaces with a single space
    const stringWithSingleSpaces = inputString.replace(/\s+/g, " ");
    // Replace spaces between words with '-'
    const stringWithHyphens = stringWithSingleSpaces.replace(/\b\s+\b/g, "-");
    return stringWithHyphens;
  }
  console.log();
  return (
    <section className="Home">
      <h1 className="page-title">Search for a card</h1>
      <div className="search-bar flex">
        <Link to={searchAPIUrlOpt}>
          <div className="search-wrap flex items-center justify-center">
            <SearchSvg />
          </div>
        </Link>
        <div className="input-wrap flex items-center">
          <input
            placeholder='Any card name ex. "black lotus"'
            onChange={(event) => {
              const searchedName = formatString(event.target.value);
              setSearchedName(searchedName);
              dispatch(setSearchAPIUrl(searchedName));
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                navigate(`/${searchAPIUrlOpt}`);
              }
            }}
          />
        </div>
      </div>
      <ul className="flex">
        <button>
          <Link to={"/advanced-search"}>Advanced Search</Link>
        </button>
        <button>
          <Link to={"/sets"}>Sets</Link>
        </button>
        <button>Lucky Search</button>
        <button>
          <Link to={"/guess-the-card"}>Guess The Card</Link>
        </button>
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

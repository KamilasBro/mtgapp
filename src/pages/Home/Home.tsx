import React, { useState, useEffect } from "react";
import Search from "../../assets/images/icons/search.svg?react";
import "./home.scss";

interface CardImg {
  id: string;
  image_uris?: {
    png: string;
  };
  card_faces?:[{
    image_uris: {
      png: string;
    };
  }]
}

const Home: React.FC = () => {
  const [randomCards, setRandomCards] = useState<CardImg[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [loadedImages, setLoadedImages] = useState(0);
  useEffect(() => {
    //there is choose random in scryfall API but i cant load multiple cards per API call
    //and it was fetching couple seconds
    //now it is loading faster but have to work it around
    const fetchRandomCards = async () => {
      try {
        const randomNumber = Math.floor(Math.random() * 4) + 1;
        const apiUrl = `https://api.scryfall.com/cards/search?page=${randomNumber}&q=%28game%3Apaper%29+is%3Afullart+lang%3Aen`;

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
  }, []); // Fetch random cards when the component mounts
  console.log(randomCards);
  return (
    <div className="Home">
      <h1 className="page-title">Search for a card</h1>
      <div className="search-bar flex">
        <div className="search-wrap flex items-center justify-center">
          <Search />
        </div>
        <div className="input-wrap flex items-center">
          <input placeholder='Any card name ex. "black lotus"' />
        </div>
      </div>
      <ul className="flex">
        <button>Advanced Search</button>
        <button>Sets</button>
        <button>Lucky Search</button>
        <button>Guess The Card</button>
      </ul>
      <ul className="cards flex justify-between flex-wrap">
        {loadedImages !== randomCards.length &&
          Array(6)
            .fill(null)
            .map((_, index) => (
              <div
                key={`card-placeholder-${index}`}
                className="card-placeholder flex flex-col items-end"
              >
                <div className="card-placeholder-img" />
                <div className="card-placeholder-content flex flex-col">
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            ))}
        {isFetched &&
          randomCards.map((card) => (
            <li
              className="card"
              key={card.id}
              style={{
                display: loadedImages === randomCards.length ? "block" : "none",
              }}
            >
              {card.image_uris ? (
                <img
                  src={card.image_uris.png}
                  alt="Card"
                  onLoad={() => setLoadedImages((prevState) => prevState + 1)}
                />
              ) : (
                card.card_faces && (
                  <img
                    src={card.card_faces[0].image_uris.png}
                    alt="Card"
                    onLoad={() => setLoadedImages((prevState) => prevState + 1)}
                  />
                )
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;

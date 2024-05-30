import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CardPlaceholder from "../../components/CardPlaceholder/CardPlaceholder";
import { CardData, CardlistData } from "../../interfaces/CardsInterface";
import GoTopArrow from "../../components/GoTopArrow/GoTopArrow";
import "./searched.scss";

const Searched: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchedCards, setSearchedCards] = useState<CardlistData>({
    has_more: false,
    total_cards: 0,
    data: [],
  });
  const [isFetched, setIsFetched] = useState(false);
  const [loadedImages, setLoadedImages] = useState(0);
  const [cardNotFound, setCardNotFound] = useState(false);
  // Parse the URL query string
  const urlParams = new URLSearchParams(location.search);
  // Get the value of the page parameter
  let currentPage = urlParams.get("page");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    setIsFetched(false);
    setLoadedImages(0);
    setCardNotFound(false);
    if (currentPage !== null && isNaN(parseInt(currentPage))) {
      return navigate(handlePage("start"));
    }
    const fetchCards = async () => {
      try {
        await new Promise((resolve) => {
          setTimeout(resolve, 100); // Set a timeout of 100ms
        });
        const apiUrl = `https://api.scryfall.com/cards/${location.pathname}${location.search}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          setCardNotFound(true);
          throw new Error("Failed to fetch data");
        } else {
          const data: CardlistData = await response.json();
          setSearchedCards(data);
          setIsFetched(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCards();
  }, [currentPage]);
  function handlePage(action: string) {
    if (typeof currentPage !== "string") {
      // If there was no existing page parameter, set it to 2
      urlParams.set("page", "2");
    } else {
      // Remove existing page parameter if it exists
      urlParams.delete("page");
      // If there was an existing page parameter, increment it by 1
      switch (action) {
        case "start":
          urlParams.set("page", "1");
          break;
        case "remove":
          urlParams.set("page", (parseInt(currentPage) - 1).toString());
          break;
        case "add":
          urlParams.set("page", (parseInt(currentPage) + 1).toString());
          break;
        case "end":
          if (searchedCards.total_cards % 175 === 0) {
            urlParams.set(
              "page",
              `${Math.floor(searchedCards.total_cards / 175)}`
            );
          } else {
            urlParams.set(
              "page",
              `${Math.floor(searchedCards.total_cards / 175) + 1}`
            );
          }
          break;
      }
    }
    // Construct the new URL with the updated query string
    return `${location.pathname}?${urlParams.toString()}`;
  }
  function handleCardCounter(order: number) {
    if (currentPage) {
      switch (order) {
        case 1:
          return 175 * (parseInt(currentPage) - 1) + 1;
        case 2:
          if (!searchedCards.has_more) {
            return searchedCards.total_cards;
          } else {
            return 175 * parseInt(currentPage);
          }
      }
    }
  }
  function returnCardsCounter() {
    return (
      <div className="flex justify-between items-center">
        <div className="cards-counter">
          {isFetched && loadedImages === searchedCards.data.length
            ? `${handleCardCounter(1)} - ${handleCardCounter(2)} of ${
                searchedCards.total_cards
              } cards`
            : `Searching for cards`}
        </div>
        <ul className={"counter-buttons-wrap flex"}>
          <button
            className={`${
              currentPage && parseInt(currentPage) > 1 && "active"
            } `}
            disabled={
              (currentPage && parseInt(currentPage) === 1) ||
              loadedImages !== searchedCards.data.length
                ? true
                : false
            }
            onClick={() => {
              navigate(handlePage("start"));
            }}
          >
            {"<<"}
          </button>
          <button
            className={`${
              currentPage && parseInt(currentPage) > 1 && "active"
            } `}
            disabled={
              (currentPage && parseInt(currentPage) === 1) ||
              loadedImages !== searchedCards.data.length
                ? true
                : false
            }
            onClick={() => {
              navigate(handlePage("remove"));
            }}
          >
            {"< Previous"}
          </button>
          <button
            className={`${searchedCards.has_more && "active"}`}
            disabled={
              !isFetched ||
              !searchedCards.has_more ||
              loadedImages !== searchedCards.data.length
            }
            onClick={() => {
              navigate(handlePage("add"));
            }}
          >
            {"Next >"}
          </button>
          <button
            className={`${searchedCards.has_more && "active"}`}
            disabled={
              !isFetched ||
              !searchedCards.has_more ||
              loadedImages !== searchedCards.data.length
            }
            onClick={() => {
              navigate(handlePage("end"));
            }}
          >
            {">>"}
          </button>
        </ul>
      </div>
    );
  }
  return (
    <section className="Searched">
      {cardNotFound ? (
        <div>cards not found</div>
      ) : (
        <>
          {returnCardsCounter()}
          <ul className="cards flex flex-wrap">
            {loadedImages < searchedCards.data.length &&
              Array(24)
                .fill(null)
                .map((_, index) => <CardPlaceholder key={index} />)}
            {isFetched &&
              searchedCards.data.map((card: CardData) => (
                <Link
                  to={`/card/${card.set}/${card.collector_number}`}
                  key={card.id}
                >
                  <li
                    style={{
                      display:
                        loadedImages === searchedCards.data.length
                          ? "block"
                          : "none",
                    }}
                  >
                    {card.image_uris ? (
                      <img
                        className="card"
                        src={card.image_uris.normal}
                        alt="Card"
                        loading="eager"
                        onLoad={() =>
                          setLoadedImages((prevState) => prevState + 1)
                        }
                      />
                    ) : (
                      card.card_faces && (
                        <img
                          className="card"
                          src={card.card_faces[0].image_uris.normal}
                          alt="Card"
                          loading="eager"
                          onLoad={() =>
                            setLoadedImages((prevState) => prevState + 1)
                          }
                        />
                      )
                    )}
                  </li>
                </Link>
              ))}
          </ul>
          {returnCardsCounter()}
        </>
      )}
      <GoTopArrow />
    </section>
  );
};

export default Searched;

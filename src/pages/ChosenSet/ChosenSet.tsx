import React, { useState, useLayoutEffect } from "react";
import SearchSvg from "../../assets/images/icons/search.svg?react";
import GoTopArrow from "../../components/GoTopArrow/GoTopArrow";
import FormatString from "../../utils/FormatString";
import CardPlaceholder from "../../components/CardPlaceholder/CardPlaceholder";
import { CardData } from "../../interfaces/CardsInterface";
import { useParams } from "react-router-dom";
import "./chosenSet.scss";

const ChosenSet: React.FC = () => {
  const [dataFromSet, setDataFromSet] = useState<CardData[]>([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const [iconUrl, setIconUrl] = useState("");
  const [nameOfSet, setNameOfSet] = useState("");
  const [isFetched, setIsFetched] = useState({
    iconFetched: false,
    cardsFetched: false,
  });
  const [searchedName, setSearchedName] = useState("");
  const { setCode } = useParams<{ setCode: string }>();
  useLayoutEffect(() => {
    const fetchIcon = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Set a timeout of 100ms
        const apiUrl = `https://api.scryfall.com/sets`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const matchingSet = data.data.find(
          (set: { name: string; code: string }) =>
            set.code.toLowerCase() === setCode?.toLowerCase()
        );
        if (matchingSet) {
          setIconUrl(matchingSet.icon_svg_uri);
          setNameOfSet(matchingSet.name);
          setIsFetched((prevState) => ({ ...prevState, iconFetched: true }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchIcon();
  }, []);
  useLayoutEffect(() => {
    const fetchCards = async () => {
      try {
        let hasMore = true;
        let page = 1;

        while (hasMore) {
          await new Promise((resolve) => setTimeout(resolve, 100)); // Set a timeout of 100ms
          const apiUrl = `https://api.scryfall.com/cards/search?q=e:${setCode}&page=${page}`;
          const response = await fetch(apiUrl);

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          } else {
            const data = await response.json();
            setDataFromSet((prevState) => [...prevState, ...data.data]);
            hasMore = data.has_more;
            page++;
          }
        }
        setIsFetched((prevState) => ({ ...prevState, cardsFetched: true }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCards();
  }, []);
  return (
    <section className="Chosen-set">
      {isFetched.iconFetched ? (
        <div className="flex items-center">
          <img src={iconUrl} className="h1-set-icon" />
          <h1>{nameOfSet}</h1>
        </div>
      ) : (
        <h1>Loading Set</h1>
      )}
      <div className="search-bar flex">
        <div className="search-wrap flex items-center justify-center">
          <SearchSvg />
        </div>
        <div className="input-wrap flex items-center">
          <input
            disabled={!isFetched.cardsFetched}
            placeholder='Any card name ex. "black lotus"'
            onChange={(event) => {
              setSearchedName(
                FormatString(event.currentTarget.value).replace(/-/g, " ")
              );
            }}
          />
        </div>
      </div>
      <ul className="cards flex flex-wrap">
        {loadedImages < dataFromSet.length &&
          Array(24)
            .fill(null)
            .map((_, index) => <CardPlaceholder key={index} />)}
        {isFetched.cardsFetched &&
          dataFromSet
            .filter((card: CardData) =>
              searchedName
                ? card.name.toLowerCase().includes(searchedName.toLowerCase())
                : true
            )
            .map((card: CardData) => (
              <li
                key={card.id}
                style={{
                  display:
                    loadedImages === dataFromSet.length ? "block" : "none",
                }}
              >
                {card.image_uris ? (
                  <img
                    className="card"
                    src={card.image_uris.normal}
                    alt="Card"
                    loading="eager"
                    onLoad={() =>
                      loadedImages < dataFromSet.length &&
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
                        loadedImages < dataFromSet.length &&
                        setLoadedImages((prevState) => prevState + 1)
                      }
                    />
                  )
                )}
              </li>
            ))}
      </ul>
      <GoTopArrow />
    </section>
  );
};

export default ChosenSet;

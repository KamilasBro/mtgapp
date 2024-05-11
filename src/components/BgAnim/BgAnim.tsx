import { useState, useEffect } from "react";
import bg1 from "../../assets/images/backgrounds/plain.webp";
import bg2 from "../../assets/images/backgrounds/island.webp";
import bg3 from "../../assets/images/backgrounds/swamp.webp";
import bg4 from "../../assets/images/backgrounds/mountain.webp";
import bg5 from "../../assets/images/backgrounds/forest.webp";
const images = [bg1, bg2, bg3, bg4, bg5];

const BackgroundSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 15000); // Change image every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background-container">
      {images.map((image, index) => (
        <img
        className="fixed top-0 left-0 w-screen h-screen"
          key={`bg` + index}
          src={image}
          alt={`Background ${index + 1}`}
          style={{
            transition: "opacity 0.5s",
            opacity: index === currentImageIndex ? 1 : 0, // Show current image
            zIndex: -index - 1, // Decreasing z-index for subsequent images
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundSlideshow;

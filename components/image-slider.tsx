
"use client";

import { useState } from "react";

const images = ["/boon_vet-1.jpeg", "/boon_vet.png"];

export function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative h-[300px] w-full overflow-hidden sm:h-[400px] lg:h-[550px]">
      <img
        src={images[currentImage]}
        alt="Boonvet Formulations"
        className="h-full w-full object-contain"
      />

      <button
        onClick={prevImage}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-4 py-2 text-black shadow"
      >
        ←
      </button>

      <button
        onClick={nextImage}
        aria-label="Next image"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-4 py-2 text-black shadow"
      >
        →
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            aria-label={`Show image ${index + 1}`}
            className={`h-2 rounded-full ${
              currentImage === index
                ? "w-6 bg-white"
                : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


"use client"

export default function Carousel3D() {
  return (
    <div className="carousel-container">
      <style jsx>{`
        .carousel-container {
          margin: 4% auto;
          width: 360px; /* 10% smaller than before */
          height: 252px; /* 10% smaller than before */
          position: relative;
          perspective: 1200px;
        }

        .carousel {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          animation: rotation 20s infinite linear;
        }

        .carousel:hover {
          animation-play-state: paused;
        }

        .carousel figure {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 324px; /* 10% smaller than 360px */
          height: 216px; /* 10% smaller than 240px */
          left: 18px;
          top: 18px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1); /* Glass effect */
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        }

        /* Positioning of each figure in 3D space */
        .carousel figure:nth-child(1) {
          transform: rotateY(0deg) translateZ(500px);
        }
        .carousel figure:nth-child(2) {
          transform: rotateY(72deg) translateZ(500px);
        }
        .carousel figure:nth-child(3) {
          transform: rotateY(144deg) translateZ(500px);
        }
        .carousel figure:nth-child(4) {
          transform: rotateY(216deg) translateZ(500px);
        }
        .carousel figure:nth-child(5) {
          transform: rotateY(288deg) translateZ(500px);
        }

        .carousel img {
          width: 90%;
          height: 90%;
          border-radius: 15px;
          object-fit: cover;
          filter: grayscale(1);
          cursor: pointer;
          transition: all 0.5s ease;
        }

        .carousel img:hover {
          filter: grayscale(0);
          transform: scale(1.05);
        }

        @keyframes rotation {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
      `}</style>

      <div className="carousel">
        <figure>
          <img src="/Port1.avif" alt="Portfolio 1" />
        </figure>
        <figure>
          <img src="/Port2.avif" alt="Portfolio 2" />
        </figure>
        <figure>
          <img src="/Port3.avif" alt="Portfolio 3" />
        </figure>
        <figure>
          <img src="/Port4.avif" alt="Portfolio 4" />
        </figure>
        <figure>
          <img src="/Port5.avif" alt="Portfolio 5" />
        </figure>
      </div>
    </div>
  )
}

"use client";
import anime, { easings } from "animejs";
import { useEffect, useState } from "react";

export default function WaterDropGrid() {
  return (
    <div className="relative grid h-screen place-content-center bg-slate-900 px-8">
      <DotGrid />
    </div>
  );
}

const GRID_WIDTH = 25;
const GRID_HEIGHT = 20;

const DotGrid = () => {
  const [startPoint, setStartPoint] = useState(
    Math.floor(Math.random() * (GRID_WIDTH * GRID_HEIGHT))
  );
  useEffect(() => {
    const animateDots = () => {
      anime({
        targets: ".dot-point",
        scale: [
          { value: 1.35, easing: "easeOutSine", duration: 250 },
          { value: 1, easing: "easeInOutQuad", duration: 500 },
        ],
        translateY: [
          { value: -30, easing: "easeOutSine", duration: 250 },
          { value: 0, easing: "easeInOutQuad", duration: 500 },
        ],
        opacity: [
          { value: 1, easing: "easeOutSine", duration: 250 },
          { value: 0.5, easing: "easeInOutQuad", duration: 500 },
        ],
        delay: anime.stagger(120, {
          grid: [GRID_WIDTH, GRID_HEIGHT],
          from: startPoint,
        }),
        loop: false,
        direction: "alternate",
        easing: "easeInOutQuad",
      });
    };

    animateDots();

    const interval = setInterval(() => {
      setStartPoint(Math.floor(Math.random() * (GRID_WIDTH * GRID_HEIGHT)));
    }, 4000);

    return () => clearInterval(interval);
  }, [startPoint]);

  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          key={`${i}-${j}`}
          data-index={index}
          className="group cursor-crosshair rounded-full p-2 transition-colors hover:bg-slate-600"
        >
          <div
            className="dot-point h-2 w-2 rounded-full bg-gradient-to-b from-slate-700 to-slate-400 opacity-50 group-hover:from-indigo-600 group-hover:to-white"
            data-index={index}
          />
        </div>
      );
      index++;
    }
  }

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
      className="grid w-fit"
    >
      {dots}
    </div>
  );
};

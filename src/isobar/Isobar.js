import { useEffect, useRef, useState } from "react";
import "./Isobar.css";

const Isobar = ({ lowLabel, highLabel, titleLabel, colorTable }) => {
  const [isVertical, setIsVertical] = useState();
  const canvasEl = useRef();

  // Determines bar orientation whenever window is resized
  useEffect(() => {
    const canvas = canvasEl.current;
    const onResize = () =>
      setIsVertical(canvas.clientHeight > canvas.clientWidth);

    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Creates a linear gradient on the canvas
  useEffect(() => {
    const canvas = canvasEl.current;
    const ctx = canvas.getContext("2d");

    const gradient = isVertical
      ? ctx.createLinearGradient(0, 0, 0, canvas.height)
      : ctx.createLinearGradient(0, 0, canvas.width, 0);

    colorTable.forEach(([pos, r, g, b]) =>
      gradient.addColorStop((100 - pos) / 100.0, `rgb(${r}, ${g}, ${b})`)
    );

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [colorTable, isVertical]);

  return (
    <div className={`isobar ${isVertical ? "vertical" : ""}`}>
      <span>{highLabel}</span>
      <span>{titleLabel}</span>
      <span>{lowLabel}</span>
      <canvas ref={canvasEl}></canvas>
    </div>
  );
};

export default Isobar;

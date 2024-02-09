import { ChangeEventHandler, FC, useId } from "react";

import "./styles.css";

interface SliderProps {
  value: number;

  onChange(value: number): void;

  min: number;
  max: number;
  step: number;
}

const Slider: FC<SliderProps> = ({ value, onChange, min, step, max }) => {
  const id = useId();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onChange(+e.target.value);

  return (
    <div className="flex items-center">
      <input
        style={{
          backgroundImage: `-webkit-gradient(linear, left top, right top, color-stop(${
            (value - min) / (max - min)
          }, #E21A1A), color-stop(${(value - min) / (max - min)}, #F4A8A8))`,
        }}
        className="slider"
        onChange={handleChange}
        value={value}
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export default Slider;

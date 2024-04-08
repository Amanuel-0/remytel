import React from "react";
import Textt from "../text";

interface RadioProps {
  id: string;
  name: string;
  label: string;
  // optional
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Radio({ id, name, label, checked, onChange }: RadioProps) {
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-full p-3"
        htmlFor="green"
      >
        <input
          id={id}
          name={name}
          type="radio"
          checked={checked}
          onChange={onChange}
          className="before:content[''] before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-[#808080] text-green-500 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-[10px] checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
        />
        <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <circle data-name="ellipse" cx="8" cy="8" r="6"></circle>
          </svg>
        </span>
      </label>

      <Textt variant="span2-satoshi">{label}</Textt>
    </div>
  );
}

export default Radio;

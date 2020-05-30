import React, { useState, useEffect } from "react";
import styles from "./SelectSearch.module.scss";
import { Dialogues } from "Utils/Dialogues";

const SelectSearch = ({
  placeholder,
  options,
  onChange,
  value: inputValue,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  console.log(onChange);
  console.log("selectsearch ", options);
  // useEffect(() => {
  //   const majorInputParent = document.getElementById("majorInput")
  //     .parentElement;
  //   const changeFocus = () => {
  //     setIsInputFocused(isInputFocused => !isInputFocused);
  //   };
  //   majorInputParent.addEventListener("focusin", changeFocus);
  //   majorInputParent.addEventListener("focusout", changeFocus);
  //   return () => {
  //     majorInputParent.removeEventListener("focusin", changeFocus);
  //     majorInputParent.removeEventListener("focusout", changeFocus);
  //   };
  // }, []);
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() =>
          setIsInputFocused((isInputFocused) => {
            if (!isInputFocused) return true;
          })
        }
        value={inputValue}
        id="majorInput"
      />
      {options.length === 0 ? (
        <p>{Dialogues.loading}...</p>
      ) : (
        <ul
          className={`${styles.majorList} ${isInputFocused && styles.visible}`}
        >
          {options.map(({ name, value }) => {
            // alert(name.includes(inputValue));
            if (name.includes(inputValue)) {
              return (
                <li
                  key={value}
                  onClick={(e) => {
                    onChange(e);
                    setIsInputFocused(false);
                  }}
                >
                  {name}
                </li>
              );
            }
            return undefined;
          })}
        </ul>
      )}
    </>
  );
};

export default SelectSearch;

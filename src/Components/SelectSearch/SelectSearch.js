import React, { useState } from "react";
import styles from "./SelectSearch.module.scss";

const SelectSearch = ({
  placeholder,
  options,
  onChange,
  value: inputValue
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  console.log(onChange);
  console.log("selectsearch ", options);
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        onClick={() => setIsInputFocused(true)}
        onChange={onChange}
        value={inputValue}
      />
      {options.length === 0 ? (
        <p>loading...</p>
      ) : (
        <ul className={`${styles.majorList} ${isInputFocused && styles.show}`}>
          {options.map(({ name, value }) => {
            // alert(name.includes(inputValue));
            if (name.includes(inputValue)) {
              return (
                <li key={value} onClick={onChange}>
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

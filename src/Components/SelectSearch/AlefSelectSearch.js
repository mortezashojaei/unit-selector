import React, { useState, useEffect } from "react";
import styles from "./AlefSelectSearch.module.scss";
import { Dialogues } from "Utils/Dialogues";
const AlefSelectSearch = (props) => {
  const {
    onChange,
    items,
    value,
    disabled,
    className,
    openDivClassName,
  } = props;
  const { placeholder } = props || Dialogues.searchOrChoose;
  const [isSelect, setIsSelect] = useState(false);
  const [localVal, setLocalVal] = useState("");
  const [listVisibale, setListVisible] = useState(false);
  const nameFromId = (id) => {
    for (let i in items) {
      let x = items[i];
      if (x.id === id) {
        return x.name;
      }
    }
    return "";
  };

  useEffect(() => {
    if (value) {
      setLocalVal(nameFromId(value));
    }
  }, [value]);
  useEffect(() => {
    if (localVal.length === 0) onChange({ target: { value: "" } });
  }, [localVal, onChange]);

  const handleChange = (e) => {
    if (isSelect && e.target.value.length + 1 === localVal.length)
      setLocalVal("");
    else setLocalVal(e.target.value);
    setIsSelect(false);
    setListVisible(true);
    onChange({ target: { value: " " } });
  };
  const handleClick = (value, id) => {
    setIsSelect(true);
    setListVisible(false);
    setLocalVal(value);
    onChange({ target: { value: id } });
  };
  const handleBlur = (e) => {
    setTimeout(() => {
      setListVisible(false);
    }, 300);
  };
  const handleFocus = (e) => {
    setListVisible(true);
  };
  return (
    <div className={styles.select_search_container}>
      <input
        className={className}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={localVal}
        placeholder={placeholder}
      ></input>
      <div
        className={
          (isSelect || !listVisibale ? " d-none " : "") + openDivClassName
        }
        style={{ display: "block" }}
      >
        {items &&
        items.filter((item) => item.name.includes(localVal.toLowerCase()))
          .length > 0 ? (
          items
            .filter((item) => item.name.includes(localVal.toLowerCase()))
            .map((filteredItem) => (
              <li
                key={filteredItem.id}
                className={filteredItem.id === value ? " active" : ""}
                onClick={() => {
                  handleClick(filteredItem.name, filteredItem.id);
                }}
              >
                {filteredItem.name}
              </li>
            ))
        ) : (
          <span>نتیجه ای یافت نشد</span>
        )}
      </div>
    </div>
  );
};
export default AlefSelectSearch;

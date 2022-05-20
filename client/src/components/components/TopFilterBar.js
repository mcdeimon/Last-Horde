import React, { memo, useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { type, rarity, price } from "./constants/filters";
import {
  filterRarity,
  filterType,
  filterNftName,
  filterPrice,
} from "../../redux/actions";

const TopFilterBar = () => {
  const dispatch = useDispatch();

  // Get params from global store
  const typeExplorerAux = useSelector((state) => state.typeExplorer);

  // Extra data of the filters
  const [typeExplorer, setTypeExplorer] = useState("nfts");

  // Callbacks of the filters
  const handleType = useCallback(
    (option) => {
      const { value } = option;
      dispatch(filterType({ value }));
    },
    [dispatch]
  );
  const handleRarity = useCallback(
    (option) => {
      const { value } = option;
      dispatch(filterRarity({ value }));
    },
    [dispatch]
  );
  const handleNftName = useCallback(
    (e) => {
      dispatch(filterNftName(e.target.value));
    },
    [dispatch]
  );
  const handlePrice = useCallback(
    (option) => {
      const { value } = option;
      dispatch(filterPrice({ value }));
    },
    [dispatch]
  );

  // Default value of the filters
  const defaultValue = {
    value: null,
    label: "Select Filter",
    isDisabled: true,
  };

  // Styles of the filters
  const customStyles = {
    option: (base) => ({
      ...base,
      background: "#212428",
      color: "#fff",
      borderRadius: "0",
      "&:hover": {
        background: "#141414",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
      color: "#fff",
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      color: "#fff",
    }),
    control: (base) => ({
      ...base,
      padding: 2,
      background: "#212428",
      color: "#fff",
      border: "solid 1px #ffffff1a",
      "&:hover": {
        background: "solid 1px #ffffff1a",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),
  };

  // Set the information of the filters
  useEffect(() => {
    setTypeExplorer(typeExplorerAux);
  }, [typeExplorerAux]);

  return (
    <div className="items_filter">
      {/* Search bar */}
      <form
        className="row form-dark"
        id="form_quick_search"
        name="form_quick_search"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="col">
          <input
            className="form-control"
            id="name_1"
            name="name_1"
            placeholder="Search item here..."
            type="text"
            onChange={handleNftName}
          />
          <button id="btn-submit">
            <i className="fa fa-search bg-color-secondary"></i>
          </button>
          <div className="clearfix"></div>
        </div>
      </form>

      {/* Type filter */}
      <div className="dropdownSelect one">
        <Select
          styles={customStyles}
          menuContainerStyle={{ zIndex: 999 }}
          options={[defaultValue, ...type]}
          onChange={handleType}
        />
      </div>

      {/* Rarity filter */}
      {typeExplorer !== "packages" ? (
        <div className="dropdownSelect two">
          <Select
            styles={customStyles}
            options={[defaultValue, ...rarity]}
            onChange={handleRarity}
          />
        </div>
      ) : null}

      {/* Price filter */}
      {typeExplorer === "sale" ? (
        <div className="dropdownSelect three">
          <Select
            styles={customStyles}
            options={[defaultValue, ...price]}
            onChange={handlePrice}
          />
        </div>
      ) : null}
    </div>
  );
};

export default memo(TopFilterBar);

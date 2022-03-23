import React, { memo, useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { type, rarity, itemsType } from "./constants/filters";
import { filterItemsType, filterNftTitle } from "../../store/actions";
import { filterRarity, filterType } from "../../redux/actions";

const TopFilterBar = () => {
  const dispatch = useDispatch();
  const typeExplorerAux = useSelector((state) => state.typeExplorer);

  const [typeExplorer, setTypeExplorer] = useState("nfts");

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

  const handleItemsType = useCallback(
    (option) => {
      const { value } = option;
      dispatch(filterItemsType({ value, singleSelect: true }));
    },
    [dispatch]
  );

  const filterNftTitles = useCallback(
    (event) => {
      const value = event.target.value;
      dispatch(filterNftTitle(value));
    },
    [dispatch]
  );

  const defaultValue = {
    value: null,
    label: "Select Filter",
  };

  const customStyles = {
    option: (base, state) => ({
      ...base,
      background: "#fff",
      color: "#333",
      borderRadius: state.isFocused ? "0" : 0,
      "&:hover": {
        background: "#eee",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
    control: (base, state) => ({
      ...base,
      padding: 2,
    }),
  };

  useEffect(() => {
    setTypeExplorer(typeExplorerAux);
  }, [typeExplorerAux]);

  return (
    <div className="items_filter">
      <form
        className="row form-dark"
        id="form_quick_search"
        name="form_quick_search"
      >
        <div className="col">
          <input
            className="form-control"
            id="name_1"
            name="name_1"
            placeholder="search item here..."
            type="text"
            onChange={filterNftTitles}
          />
          <button id="btn-submit">
            <i className="fa fa-search bg-color-secondary"></i>
          </button>
          <div className="clearfix"></div>
        </div>
      </form>
      <div className="dropdownSelect one">
        <Select
          styles={customStyles}
          menuContainerStyle={{ zIndex: 999 }}
          options={[defaultValue, ...type]}
          onChange={handleType}
        />
      </div>

      {typeExplorer !== "packages" ? (
        <div className="dropdownSelect two">
          <Select
            styles={customStyles}
            options={[defaultValue, ...rarity]}
            onChange={handleRarity}
          />
        </div>
      ) : null}

      {typeExplorer !== "packages" ? (
        <div className="dropdownSelect three">
          <Select
            styles={customStyles}
            options={[defaultValue, ...itemsType]}
            onChange={handleItemsType}
          />
        </div>
      ) : null}
    </div>
  );
};

export default memo(TopFilterBar);
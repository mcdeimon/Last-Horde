import React, { memo, useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { type, rarity, itemsType } from "./constants/filters";
import { filterRarity, filterType, filterNftName } from "../../redux/actions";

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

  const handleNftName = useCallback(
    (e) => {
      dispatch(filterNftName(e.target.value));
    },
    [dispatch]
  );

  const defaultValue = {
    value: null,
    label: "Select Filter",
    isDisabled: true
  };

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

  useEffect(() => {
    setTypeExplorer(typeExplorerAux);
  }, [typeExplorerAux]);

  return (
    <div className="items_filter">
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
    </div>
  );
};

export default memo(TopFilterBar);

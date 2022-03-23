import React, { memo } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const NftCard = ({
  item,
  height,
  onImgLoad,
  typeExplorer,
}) => {
  const navigateTo = (link) => {
    navigate(link);
  };

  return (
    <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
      <div className="nft__item m-0">
        <div className="nft__item_wrap minHeight300" style={{ height: `${height}px` }}>
          <Outer>
            <span>
              <img
                onLoad={onImgLoad}
                src={item?.image}
                className="lazy nft__item_preview"
                alt=""
                onClick={() => navigateTo(`detail/${item?.id}${typeExplorer === "packages" ? "?package=true" : ""}`)}
              />
            </span>
          </Outer>
        </div>

        <div className="nft__item_info">
          <span onClick={() => navigateTo(`detail/${item?.id}${typeExplorer === "packages" ? "?package=true" : ""}`)}>
            <h4>{item?.name}</h4>
          </span>

          <div className="nft__item_price">{item?.price || "1000"} HOR</div>

          <div className="nft__item_action">
            <span onClick={() => navigateTo(`detail/${item?.id}${typeExplorer === "packages" ? "?package=true" : ""}`)}>
              Buy Now
            </span>
          </div>

          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NftCard);

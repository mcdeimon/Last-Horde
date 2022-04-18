const Arrow = ({ className, style, onClick, leftOrRighr, isBlack }) => {
  return (
    <div
      className={`arrowCarrousel ${leftOrRighr} ${isBlack ? "black" : ""}`}
      style={style}
      onClick={onClick}
    >
      <div>
        <img src="/img/right-arrow.png" alt="arrow" className="imgArrow" />
      </div>
    </div>
  );
};

export default Arrow;

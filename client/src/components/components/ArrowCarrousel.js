const Arrow = ({ className, style, onClick, leftOrRighr, isBlack }) => {
  return (
    <div
      className={`${className} arrowCarrousel ${leftOrRighr} ${
        isBlack ? "black" : ""
      }`}
      style={style}
      onClick={onClick}
    >
      <img src="/img/right-arrow.png" alt="arrow" className="imgArrow"/>
    </div>
  );
};

export default Arrow;

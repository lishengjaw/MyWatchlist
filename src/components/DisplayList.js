import DisplayRows from "./DisplayRows";
import "../styles/DisplayList.css";

const DisplayList = ({ temp, favourites }) => {
  return (
    <>
      <div className="display-list">
        {temp.map((item) => {
          const { id } = item.data;
          return favourites ? (
            <DisplayRows key={id} {...item} isFavourite={true} />
          ) : (
            <DisplayRows key={id} {...item} toWatchLater={true} />
          );
        })}
      </div>
    </>
  );
};

export default DisplayList;

import DisplayRows from "./DisplayRows";
import "../styles/DisplayList.css";

const DisplayList = ({ temp, favourites }) => {
  return (
    <>
      <div className="display-list">
        {temp.map((item) => {
          const { id } = item.data;
          if (favourites) {
            return <DisplayRows key={id} {...item} isFavourite={true} />;
          } else {
            return <DisplayRows key={id} {...item} toWatchLater={true} />;
          }
        })}
      </div>
    </>
  );
};

export default DisplayList;

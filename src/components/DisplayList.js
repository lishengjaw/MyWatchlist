import DisplayRows from "./DisplayRows";
import "../styles/DisplayList.css";
import { useEffect, useState } from "react";

const DisplayList = (props) => {
  const { temp, favourites } = props;
  const [list, setList] = useState(temp);
  
  useEffect(() => {
    setList(temp);
  }, [temp]);

  return (
    <>
      <div className="display-list">
        {list.map((item) => {
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

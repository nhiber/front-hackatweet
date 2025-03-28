import styles from "../styles/Likes.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addLikes } from "../reducers/likes";
import { inverse } from "../reducers/trigger";

import trigger from "../reducers/trigger";

function Likes({ username, count }) {
  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger.value);

  const handleLikesClick = () => {
    dispatch(addLikes(username));
    dispatch(inverse(trigger));
  };

  let Like = "Like";
  if (count > 1) {
    Like = "Likes";
  }
  return (
    <div className={styles.trends} onClick={() => handleLikesClick()}>
      <div>
        <h4>{username}</h4>
      </div>
      <div>
        <span className={styles.grey}>
          <span>{count}</span> {Like}
        </span>
      </div>
    </div>
  );
}

export default Likes;

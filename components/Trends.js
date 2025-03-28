import styles from '../styles/Trends.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addHashtag } from "../reducers/hashtag";
import { inverse } from "../reducers/trigger";
import trigger from "../reducers/trigger";


function Trends({ hashtag, count}) {
  const dispatch = useDispatch()
  const trigger = useSelector((state) => state.trigger.value);
  

const handleHashtagClick = () => {
  dispatch(addHashtag(hashtag));
  dispatch(inverse(trigger));
}

let tweet = "Tweet"
if (count > 1) {
  tweet = "Tweets"
}
  return (
    <div className={styles.trends} onClick={() => handleHashtagClick()}>
        <div>
            <h4>{hashtag}</h4>
        </div>
        <div>
            <span className={styles.grey}><span>{count}</span> {tweet}</span>
        </div>

    </div>
  );
}

export default Trends;

import styles from "../styles/Hashtag.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addHashtag } from "../reducers/hashtag";
import { useDispatch } from 'react-redux';

function Hashtag() {

  const dispatch = useDispatch();

  const hashtag = useSelector((state) => state.hashtag.value)

  const [searchHastag, setSearchHashtag] = useState("");

  useEffect(() => {
    setSearchHashtag(hashtag);
  }, [hashtag])

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      dispatch(addHashtag(searchHastag));
    }
  }

  return (
    <div className={styles.hashtag}>
      <div className={styles.title}>
        <h1>Hashtag</h1>
      </div>
      <div className={styles.content}>
        <input className={styles.input} type="text" placeholder="What's new?" onChange={(e) => setSearchHashtag(e.target.value)} value={searchHastag} onKeyDown={(e) => handleEnter(e)}></input>
      </div>
    </div>
  );
}

export default Hashtag;

import styles from "../styles/Tweet.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { inverse } from "../reducers/trigger";
import trigger from "../reducers/trigger";

function Tweet() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.value);
  const trigger = useSelector((state) => state.trigger.value)
  const [contenu, setContenu] = useState("");

  let count = contenu.length
  let disabled = false
  if (count > 279) {
    disabled = true
  }

let pattern = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,})(\b|\r)/g

  const postOnClick = () => {
    const date = new Date()
    fetch("https://back-hackatweet.vercel.app/tweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({firstname: users.firstname, username: users.username, content: contenu, time: date, hashtagList: contenu.match(pattern)}),
    })
      .then((response) => response.json())
      .then((data) => {
          setContenu("");
          dispatch(inverse(trigger));
      });
  };



  return (
    <div className={styles.tweet}>
      <div className={styles.title}>
        <h1>Home</h1>
      </div>
      <div className={styles.content}>
        <input
          className={styles.input}
          type="text"
          placeholder="What's up?"
          onChange={(e) => setContenu(e.target.value)}
          value={contenu}
          disabled={disabled}
        ></input>
      </div>
      <div className={styles.submit}>
        <div>{count}/280</div>
        <div>
          <button className={styles.button} onClick={() => postOnClick()}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tweet;

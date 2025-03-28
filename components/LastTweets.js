import styles from "../styles/LastTweets.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheese, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { inverse } from "../reducers/trigger";
import trigger from "../reducers/trigger";
import React from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const moment = require("moment");

function LastTweets({
  firstname,
  username,
  time,
  content,
  usersLike,
  isTrash,
  isLike,
  currentUser,
}) {
  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger.value);

  const handleHeartClick = () => {
    if (isLike) {
      fetch("https://back-hackatweet.vercel.app/tweet/deleteUserLike", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ currentUser, content }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      dispatch(inverse(trigger));
    } else {
      fetch("https://back-hackatweet.vercel.app/tweet/addUserLike", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ currentUser, content }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      dispatch(inverse(trigger));
    }
  };

  const handleTrashClick = () => {
    fetch("https://back-hackatweet.vercel.app/tweet/deleteTweet", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    dispatch(inverse(trigger));
  };

  //COLOR HASHTAG IN BLUE
  const item = {
    name: content,
  };
  let pattern = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,})(\b|\r)/g;

  let hashtag = content.match(pattern);
  let formattedHashtag = "";
  if (hashtag) {
    formattedHashtag = hashtag.join(" ");
  }

  const handleClickHashtag = () => {
    console.log("click ok");
  };
  //essayer d'ajouter le click ici
  const dataTm = `<span style="color:#f3bc23">${formattedHashtag}</span>`;
  const changeFormat = (item) => {
    const replaceTm = item?.name.replace(formattedHashtag, dataTm);
    return ReactHtmlParser(replaceTm);
  };

  const creationDate = moment(time).fromNow();
  //const now = moment(new Date());
  //const creationDate = moment(time)
  //const duration = moment.duration(now.diff(creationDate));
  //const hours = duration.asMinutes();

  let style = {};
  if (isLike) {
    style = { color: "#f3bc23" };
  }

  return (
    <div className={styles.lastTweets}>
      <div className={styles.info}>
        <div>
          <img src="cheese.jpg" className={styles.avatar} />
        </div>
        <div className={styles.contact}>
          <span>{firstname}</span>
          <span className={styles.grey}>@{username}</span>
          <span className={styles.grey}>•</span>
          <span className={styles.grey}>{creationDate}</span>
        </div>
      </div>
      <div className={styles.content}>
        {item?.name.includes(formattedHashtag)
          ? changeFormat(item)
          : item?.name}
      </div>
      <div className={styles.icons}>
        <FontAwesomeIcon
          style={style}
          icon={faCheese}
          onClick={() => handleHeartClick()}
        />
        <span>{usersLike.length}</span>
        {isTrash && (
          <FontAwesomeIcon icon={faTrash} onClick={() => handleTrashClick()} />
        )}
      </div>
    </div>
  );
}

export default LastTweets;

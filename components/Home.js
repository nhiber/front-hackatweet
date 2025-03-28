import styles from "../styles/Home.module.css";
import LastTweets from "./LastTweets";
import Tweet from "./Tweet";
import Trends from "./Trends";
import Hashtag from "./Hashtag";
import Likes from "./Likes";


import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import trigger from "../reducers/trigger";
import { logout } from "../reducers/user";
import { removeHashtag } from "../reducers/hashtag";
import { removeLikes } from "../reducers/likes";
import { inverse } from "../reducers/trigger";
import { useRouter } from 'next/router'


function Home() {
  const dispatch = useDispatch();
  const router = useRouter()


  const [tweetList, setTweetList] = useState([]);
  const [tweetCountByHashtags, setTweetCountByHashtags] = useState([]);
  const [likesCountByUsername, setLikesCountByUsername] = useState([]);

  const user = useSelector((state) => state.user.value);
  const trigger = useSelector((state) => state.trigger.value);
  const hashtag = useSelector((state) => state.hashtag.value);
  const likes = useSelector((state) => state.likes.value);

  useEffect(() => {
    //----------------------------------------------------------------------------------------
    fetch("https://back-hackatweet.vercel.app/tweet")
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          data.data.sort(function (a, b) {
            return new Date(b.time) - new Date(a.time);
          });
          setTweetList(data.data);
        }
      });
    //----------------------------------------------------------------------------------------
    fetch("https://back-hackatweet.vercel.app/hashtags")
      .then((response) => response.json())
      .then((data) => {
        if (data.obj) {
          let table = [];
          for (let key in data.obj) {
            table.push([key, data.obj[key]]);
          }
          table.sort(function (a, b) {
            return b[1] - a[1];
          });
          setTweetCountByHashtags(table);
        }
      });
    //----------------------------------------------------------------------------------------
    fetch("https://back-hackatweet.vercel.app/tweet/likes")
      .then((response) => response.json())
      .then((data) => {
        if (data.obj) {
          let table = [];
          for (let key in data.obj) {
            table.push([key, data.obj[key]]);
          }
          table.sort(function (a, b) {
            return b[1] - a[1];
          });
          setLikesCountByUsername(table);
        }
      });
    //----------------------------------------------------------------------------------------
  }, [trigger]);

  const lastTweets = tweetList.map((data, i) => {
    let isTrash = false;
    if (data.username === user.username) {
      isTrash = true;
    }
    let isLike = false;
    if (data.usersLike.some((e) => e === user.username)) {
      isLike = true;
    }
    //---------------------------------------------------------------------------------------------------
    if (!hashtag && !likes) {
      return (
        <LastTweets
          key={i}
          {...data}
          currentUser={user.username}
          isTrash={isTrash}
          isLike={isLike}
        />
      );
    } else if (!likes && data.hashtagList.some((e) => e === hashtag)) {
      return (
        <LastTweets
          key={i}
          {...data}
          currentUser={user.username}
          isTrash={isTrash}
          isLike={isLike}
        />
      );
    } else if (!hashtag && data.username === likes) {
      return (
        <LastTweets
          key={i}
          {...data}
          currentUser={user.username}
          isTrash={isTrash}
          isLike={isLike}
        />
      );
    } else if (
      data.hashtagList.some((e) => e === hashtag) &&
      data.username === likes
    ) {
      return (
        <LastTweets
          key={i}
          {...data}
          currentUser={user.username}
          isTrash={isTrash}
          isLike={isLike}
        />
      );
    } else {
      return;
    }
    //---------------------------------------------------------------------------------------------------
  });

  const trends = tweetCountByHashtags.map((data, i) => {
    return <Trends key={i} hashtag={data[0]} count={data[1]} />;
  });

  const _likes = likesCountByUsername.map((data, i) => {
    return <Likes key={i} username={data[0]} count={data[1]} />;
  });

  const logoutOnClick = () => {
    dispatch(logout());
    dispatch(removeHashtag());
    dispatch(removeLikes());
    router.push("/")
  };

  const handleMouseClick = () => {
    dispatch(removeHashtag());
    dispatch(removeLikes());
    dispatch(inverse(trigger));
  };

  let styleTweet = { display: "grid" };
  let styleHashtag = { display: "none" };

  if (hashtag) {
    styleTweet = { display: "none" };
    styleHashtag = { display: "grid" };
  }

  return (
    <div className={styles.home}>
      <div className={styles.leftcontent}>
        <div>
          <img
            src="mouse.png"
            className={styles.logo}
            onClick={() => handleMouseClick()}
          />
        </div>
        <div className={styles.likecontent}>
          <div className={styles.titlelike}>
            <h1>Likes</h1>
          </div>
          <div className={styles.like}>{_likes}</div>
        </div>
        <div className={styles.identifiant}>
          <div className={styles.ligne}>
            <div>
              <img src="cheese.jpg" className={styles.avatar} />
            </div>
            <div className={styles.info}>
              <h3>{user.firstname}</h3>
              <h4 className={styles.grey}>@{user.username}</h4>
            </div>
          </div>
          <div>
            <button className={styles.logout} onClick={() => logoutOnClick()}>
              LOGOUT
            </button>
          </div>
        </div>
      </div>
      <div className={styles.tweet} style={styleTweet}>
        <Tweet />
      </div>
      <div className={styles.hashtag} style={styleHashtag}>
        <Hashtag />
      </div>
      <div className={styles.lastTweets}>{lastTweets}</div>
      <div className={styles.rightcontent}>
        <div className={styles.titleTrend}>
          <h1>Trends</h1>
        </div>
        <div className={styles.trends}>{trends}</div>
        <div className={styles.imgcontain}>
          <div></div>
          <div className={styles.mouse}>
            <div className={styles.img}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

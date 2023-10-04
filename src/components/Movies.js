import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function Movies() {
  const [movielist, setMovieList] = useState([]);
  const moviecollectionref = collection(db, "Movies");

  const getmovies = async () => {
    try {
      let data = await getDocs(moviecollectionref);
      data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovieList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getmovies();
  }, []);

  //Creation start
  //Feed movie details
  const [title, setTitle] = useState();
  const [release, setRelease] = useState();
  const [review, setReview] = useState(false);

  const moviesubmit = async () => {
    try {
      await addDoc(moviecollectionref, {
        Title: title,
        Review: review,
        Release: release,
        userId: auth?.currentUser?.uid,
      });
      getmovies();
    } catch (err) {
      console.log(err);
    }
  };
  // Creation Done

  //Deletion start
  const deletemovie = async (id) => {
    try {
      const movieref = doc(db, "Movies", id);
      await deleteDoc(movieref);
      getmovies();
    } catch (err) {
      console.log(err);
    }
  };
  //Deletion Done

  const [newtitle, setNewtitle] = useState();
  //Updation start
  const updatemovie = async (id) => {
    try {
      const movieref = doc(db, "Movies", id);
      await updateDoc(movieref, { Title: newtitle });
      getmovies();
    } catch (err) {
      console.log(err);
    }
  };
  //Updation Done

  return (
    <>
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Release Date"
        value={release}
        onChange={(e) => {
          setRelease(Number(e.target.value));
        }}
      />
      <input
        type="checkbox"
        checked={review}
        onChange={(e) => {
          setReview(e.target.checked);
        }}
      />
      <label>Review</label>
      <button onClick={moviesubmit}>Submit</button>
      <ol>
        {movielist.map((movie) => (
          <>
            <div key={movie.id}>
              <li>
                {movie.Title}{" "}
                <input
                  placeholder="update title"
                  onChange={(e) => {
                    let temp = e.target.value;
                    if (temp !== "") {
                      setNewtitle(temp);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    updatemovie(movie.id);
                  }}
                >
                  update
                </button>
              </li>
              <ul>
                <li>Review : {String(movie.Review)}</li>
                <li>Release Date: {movie.Release}</li>
              </ul>
              <button
                onClick={() => {
                  deletemovie(movie.id);
                }}
              >
                Delete
              </button>
            </div>
            <br />
          </>
        ))}
      </ol>
    </>
  );
}

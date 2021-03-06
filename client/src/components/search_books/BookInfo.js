import React, { Fragment } from "react";
import anime from "animejs/lib/anime.es.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const BookInfo = ({ books: { books, bookIndex } }) => {
  // go back to book search.
  const backHandler = () => {
    anime({
      targets: ".one-book-info-container",
      keyframes: [{ translateX: "200vw", duration: 500 }],
      easing: "easeInOutQuad",
      loop: false,
    });

    setTimeout(() => {
      let bookInfoContainer = document.getElementsByClassName(
        "one-book-info-container"
      )[0];
      bookInfoContainer.style.display = "none";
    }, 500);
  };

  //   Check if book has title
  try {
    var title = books.items[bookIndex].volumeInfo.title;
  } catch {
    return <div></div>;
  }

  // check authors
  try {
    var authors = books.items[bookIndex].volumeInfo.authors.map((author) => (
      <span>{author}, </span>
    ));
  } catch {
    var authors = "";
  }

  // Check if book has image
  try {
    var imgLink = books.items[bookIndex].volumeInfo.imageLinks.thumbnail;
  } catch {
    var imgLink = "";
  }

  // Check if book has categories
  try {
    var categories = books.items[bookIndex].volumeInfo.categories
  } catch {
    var categories = null;
  }

  return (
    <div>
      <div>
        <img
          onClick={backHandler}
          class='info-back-button clickable'
          src='https://img.icons8.com/ios/35/000000/circled-left-2.png'
        />
      </div>
      {imgLink ? (
        <img class='book-info-img' src={imgLink} />
      ) : (
        <p class='book-info-img'>No Image</p>
      )}
      
      <div class='book-all-info-container'>
      <div class='justify-content-center mt-1'>
          <a
            href={books.items[bookIndex].volumeInfo.previewLink}
            target='_blank'
            class='btn btn-secondary w-100 text-center'
          >
            Preview Book
          </a>
          <Link class='btn btn-main w-100  ml-1 text-center' to='add-book'>
          Add Book
        </Link>
        </div>
        <hr class="mt-2"/>

          <div>
            <h2 class="mb-1 mt-1">{title}</h2>
            <p class="mb-1 text-secondary">{books.items[bookIndex].volumeInfo.subtitle}</p>
            <small class='mb-3'>Author: {authors}</small>
          </div>


        <hr />
        <div class='justify-content-between align-items-center'>
          <div class='justify-content-between align-items-center w-100'>
            <div class='justify-content-between align-items-center'>
              <img
                class='rating-icon m-1'
                src='https://img.icons8.com/color/25/000000/filled-star--v1.png'
              />
              <p class='rating'>Rating</p>
            </div>
            {books.items[bookIndex].volumeInfo.averageRating ? (
              <p class='rating m-1'>
                {books.items[bookIndex].volumeInfo.averageRating} / 5
              </p>
            ) : (
              <p class='rating m-1'>N/A</p>
            )}
          </div>
        </div>
        <hr />
        {categories && (
          <Fragment>
            <h4>Categories</h4>
            <ul>
              {categories.map((cat) => (
                <li>{cat}</li>
              ))}
            </ul>
            <hr />
          </Fragment>
        )}

        {books.items[bookIndex].volumeInfo.description ? (
          <Fragment>
            <h4>Description</h4>
            <p>{books.items[bookIndex].volumeInfo.description}</p>
          </Fragment>
        ) : (
          <p>No Description</p>
        )}
       
      </div>
    </div>
  );
};

BookInfo.propTypes = {
  books: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  books: state.books,
});

export default connect(mapStateToProps)(BookInfo);

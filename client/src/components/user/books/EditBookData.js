import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { removeBook, updateBook } from "../../../actions/books";

const EditBookData = ({
  profile: {
    profile: { books },
    book: { id },
  },
  removeBook,
  updateBook,
}) => {
  const [formSubmited, setFormSubmited] = useState(false);
  var book = books.filter((book) => (book._id == id ? book : null))[0];

  const [bookRemoved, setBookRemoved] = useState(false);

  useEffect(() => {
    const startDateInput = document.getElementsByName("startDate")[0];
    const finishedDateInput = document.getElementsByName("finishedDate")[0];
    const currentPageInput = document.getElementsByName("currentPage")[0];
    const uncompletedReason = document.getElementsByName(
      "uncompletedReason"
    )[0];
    startDateInput.value = book.startDate.slice(0, 10);
    finishedDateInput.value = book.finishedDate
      ? book.finishedDate.slice(0, 10)
      : "";
    currentPageInput.value = book.currentPage ? book.currentPage : "";
    uncompletedReason.value = book.uncompletedReason
      ? book.uncompletedReason
      : "";
  }, []);

  const removeBookHandler = async () => {
    var res = await removeBook({ id, title: book.title });
    if (res) {
      setBookRemoved(true);
    }
  };

  const readingStatusHandler = (e) => {
    try {
      var finishedInput = document.getElementById("finishedInput");
      var pageInput = document.getElementById("pageInput");
      var reasonInput = document.getElementById("reasonInput");
      var readingStatus = document.getElementsByName("readingStatus")[0];

      var val;
      if (e) {
        val = e.target.value;
      } else {
        val = book.readingStatus;
      }
      readingStatus.value = val;

      if (val == "read") {
        pageInput.classList.add("hidden");
        finishedInput.classList.remove("hidden");
        reasonInput.classList.add("hidden");
      } else if (val == "reading") {
        finishedInput.classList.add("hidden");
        pageInput.classList.remove("hidden");
        reasonInput.classList.add("hidden");
      } else if (val == "uncompleted") {
        finishedInput.classList.add("hidden");
        pageInput.classList.remove("hidden");
        reasonInput.classList.remove("hidden");
      }
      return true;
    } catch {
      setTimeout(() => {
        return false;
      }, 2000);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    var currentPage = document.getElementsByName('currentPage')[0].value;
    var uncompletedReason = document.getElementsByName('uncompletedReason')[0].value;
    var readingStatus = document.getElementsByName("readingStatus")[0].value;
    var finishedDate = document.getElementsByName("finishedDate")[0].value;
    var startDate = document.getElementsByName("startDate")[0].value;

    var res = await updateBook({
      uncompletedReason,
      id,
      readingStatus,
      currentPage,
      finishedDate,
      startDate,
      title: book.title,
    });
    if (res) {
      setFormSubmited(true)
    }
  };

  return (
    <Fragment>
      {formSubmited ? (
        <Redirect to='profile' />
      ) : (
        <Fragment>
          <div class='form-page-container'>
            <div class='form-wrapper'>
              <Link to='book-data'>
                <img
                  class='info-back-button'
                  src='https://img.icons8.com/ios/35/000000/circled-left-2.png'
                />
              </Link>
              <div>
                <h3 class='text-center p-1 m-0'>{book.title}</h3>
                <p class='text-secondary text-center mt-0'>
                  Please edit the information below.
                </p>
                <hr />
                <form className='form mt-2' onSubmit={(e) => onSubmit(e)}>
                  <div className='form-group'>
                    <p>Start Date</p>
                    <input type='date' name='startDate' required />
                    <p>Reading Status</p>
                    <select
                      class='input-style'
                      name='readingStatus'
                      onChange={(e) => readingStatusHandler(e)}
                    >
                      <option value='reading'>Reading</option>
                      <option value='read'>Read</option>
                      <option value='uncompleted'>Uncompleted</option>
                    </select>
                    <hr />
                    <div class='hidden' id='finishedInput'>
                      <p>Finished Date</p>
                      <input type='date' name='finishedDate' />
                    </div>
                    <div id='pageInput'>
                    <p>Current Page</p>
                      <input
                        type='number'
                        placeholder='Current Page'
                        name='currentPage'
                        class='m-0'
                      />
                    </div>
                    <div class='hidden' id='reasonInput'>
                      <textarea
                        type='text'
                        placeholder='Reason...'
                        name='uncompletedReason'
                        class='input-style'></textarea>
                    </div>
                  </div>
                  <div className='justify-content-center mt-2' id='doneButton'>
                    <button type='submit' className='btn btn-main w-100'>
                      Update
                    </button>
                  </div>
                  <div className='justify-content-center mt-2' id='doneButton'>
                    <button
                      className='btn btn-danger w-100'
                      onClick={() => removeBookHandler()}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class='hidden'>
            {readingStatusHandler()
              ? ""
              : setTimeout(() => {
                  readingStatusHandler();
                }, 10)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

EditBookData.propTypes = {
  profile: PropTypes.object.isRequired,
  removeBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { removeBook, updateBook })(
  EditBookData
);

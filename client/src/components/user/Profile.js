import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import UserImage from "../../static/img/user-image.png";
import {getCurrentProfile} from '../../actions/profile';

const Profile = ({profile: {profile}, getCurrentProfile}) => {

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile])

  return (
    <div class='profile-page-container'>
      <div class='profile-container'>
        <div class='profile-wrapper'>
          <img src={UserImage} class='profile-image' />
          <h1 class='text-center m-0 profile-name'>{profile.name}</h1>
          <p class='text-center m-0'>
            <small class="profile-username">{profile.email}</small>
          </p>
          <div class='profile-stats-container'>
            <div>
              <p class="m-0 text-center text-main"><b>{profile.reading}</b></p>
              <p class="m-0 text-center">Reading</p>
            </div>
            <div>
              <p class="m-0 text-center text-main"><b>{profile.read}</b></p>
              <p class="m-0 text-center">Read</p>
            </div>
          </div>
        </div>

        <hr />

        <div class='justify-content-between m-1'>
          <h3>Currently Reading</h3>
          <p><Link to="users-books">View All</Link></p>
        </div>

        <div class='currently-reading'>
          <img src="http://books.google.com/books/content?id=iKdaDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
          <img src="http://books.google.com/books/content?id=6W_IDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
          <img src="http://books.google.com/books/content?id=3tOMDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
        </div>

        <div class='justify-content-between m-1'>
          <h3>Read</h3>
          <p><Link to="users-books">View All</Link></p>
        </div>

        <div class='currently-reading'>
        <img src="http://books.google.com/books/content?id=iKdaDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
          <img src="http://books.google.com/books/content?id=6W_IDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
          <img src="http://books.google.com/books/content?id=3tOMDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
        </div>

      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Profile);

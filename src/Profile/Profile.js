  import React, { useState } from 'react';
  import "./Profile.css";
  import Nav from '../HomeScreen/Nav';
  import { auth } from '../firebase';

  function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [profileName, setProfileName] = useState('Profile Name');
    const [profileImageUrl, setProfileImageUrl] = useState('');

    const handleProfileNameChange = (event) => {
      setProfileName(event.target.value);
    };

    const handleEditClick = () => {
      setEditMode(true);
    };

    const handleSaveClick = () => {
      setEditMode(false);
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setProfileImageUrl(reader.result);
      };
    };

    return (
      <div className='ProfileScreen'>
          <Nav />
          <div className='profile_body' style={{backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/5e5e7ba5-dfaf-4019-8155-ef19b7eb5fb5/5f7da5da-2395-4a5d-a0c8-9a2613f3d89d/US-en-20211227-popsignuptwoweeks-perspective_alpha_website_small.jpg')"}}>
              <h1>Manage Profiles</h1>
              <div className='profile_infor'>
                  <img 
                    src={profileImageUrl || 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117'}
                    alt=''
                  />

                  <div className='profile_detail'>
                    {editMode ? (
                      <>
                        <input
                          type="text"
                          value={profileName}
                          onChange={handleProfileNameChange}
                        />
                        <button onClick={handleSaveClick}>Save</button>
                      </>
                    ) : (
                      <>
                        <h2>{profileName}</h2>
                        <div>
                          <button className='profile_editButton' onClick={handleEditClick}>Edit</button>
                          <button className='profile_editButton' onClick={() => document.getElementById('picture-upload').click()}>Change Picture</button>
                          <input type='file' accept='image/*' id='picture-upload' onChange={handleImageUpload} style={{ display: 'none' }} />
                        </div>
                      </>
                    )}
                  </div>
              </div>
              <div className='profile_plans'>
                  <h3>Plan Details</h3>
                  <button className='profile_manageButton'>Manage Plan</button>
              </div>

              <button  
                onClick={() => auth.SignOut()}
                className='profiel_SignOut'>Sign Out</button>
          </div>
      </div>
    )
  }

  export default Profile;

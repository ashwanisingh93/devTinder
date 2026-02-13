import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { UserCircle, Heart, X } from 'lucide-react';

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendRequest = async (status, userId) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {/* Image Container */}
        <figure className="relative pt-4 px-4">
          <div >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-full h-full object-contain"  // Changed from object-center to object-contain
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x300';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <UserCircle className="w-20 h-20 text-gray-400" />
              </div>
            )}
          </div>
        </figure>

        {/* Content */}
        <div className="card-body pt-4">
          {/* Name and Age */}
          <div className="space-y-2">
            <h2 className="card-title justify-center text-2xl">
              {firstName} {lastName}
            </h2>
            {(age || gender) && (
              <p className="text-center text-gray-400">
                {[
                  age && `${age} years`,
                  gender && gender.charAt(0).toUpperCase() + gender.slice(1)
                ].filter(Boolean).join(' • ')}
              </p>
            )}
          </div>

          {/* About */}
          {about && (
            <p className="text-center text-gray-300 my-4 line-clamp-3">
              {about}
            </p>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-error text-sm mb-4">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="card-actions justify-center gap-4 mt-2">
            <button
              className={`btn btn-error ${isLoading ? 'loading' : ''}`}
              onClick={() => handleSendRequest("ignored", _id)}
              disabled={isLoading}
            >
              <X className="w-5 h-5 mr-2" />
              Ignore
            </button>
            <button
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              onClick={() => handleSendRequest("interested", _id)}
              disabled={isLoading}
            >
              <Heart className="w-5 h-5 mr-2" />
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { UserCircle } from 'lucide-react';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center p-8">
          <UserCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold mb-2">No Connections Found</h1>
          <p className="text-gray-500">Start connecting with other developers!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Connections</h1>

      <div className="grid gap-6 max-w-3xl mx-auto">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-base-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0">
                {photoUrl ? (
                  <img
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80';
                    }}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserCircle className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-grow text-center sm:text-left">
                <h2 className="text-xl font-bold mb-2">
                  {firstName} {lastName}
                </h2>
                
                {about && (
                  <p className="text-gray-300 mb-2 line-clamp-2">
                    {about}
                  </p>
                )}
                
                {age && gender && (
                  <p className="text-sm text-gray-400">
                    {age} years old • {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </p>
                )}
              </div>

              {/* Action Buttons - Can be added here if needed */}
              <div className="flex-shrink-0 mt-4 sm:mt-0">
                {/* Add any action buttons here */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
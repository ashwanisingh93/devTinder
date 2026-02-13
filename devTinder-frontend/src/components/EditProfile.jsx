import React, { useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setLoading(true);
    setError("");
    setShowToast(false);

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { label: "First Name", value: firstName, setter: setFirstName },
    { label: "Last Name", value: lastName, setter: setLastName },
    { label: "Age", value: age, setter: setAge, type: "number" },
    { label: "About", value: about, setter: setAbout, multiline: true },
    { label: "Photo URL", value: photoUrl, setter: setPhotoUrl },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        {/* Edit Form */}
        <div className="w-full lg:w-96">
          <div className="card bg-base-300 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl mb-4">
                Edit Profile
              </h2>

              {error && (
                <div className="alert alert-error mb-4">
                  <span>{error}</span>
                </div>
              )}

              {showToast && (
                <div className="alert alert-success mb-4">
                  <span>Profile saved successfully</span>
                </div>
              )}

              <div className="space-y-4">
                {formFields.map(({ label, value, setter, type, multiline }) => (
                  <label className="form-control w-full" key={label}>
                    <div className="label">
                      <span className="label-text font-medium">{label}</span>
                    </div>
                    {multiline ? (
                      <textarea
                        placeholder={`Enter your ${label.toLowerCase()}`}
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        className="textarea textarea-bordered w-full h-24"
                      />
                    ) : (
                      <input
                        type={type || "text"}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        className="input input-bordered w-full"
                      />
                    )}
                  </label>
                ))}

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">Gender</span>
                  </div>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="card-actions justify-center mt-6">
                <button
                  className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                  onClick={saveProfile}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full lg:w-auto mt-8 lg:mt-0">
          <div className="sticky top-4">
            <div className="w-full max-w-sm mx-auto">
              <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* Image Container */}
                <figure className="relative pt-4 px-4">
                  <div>
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={`${firstName} ${lastName}`}
                        className="w-full h-full object-contain" // Changed from object-center to object-contain
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400x300";
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
                          gender &&
                            gender.charAt(0).toUpperCase() + gender.slice(1),
                        ]
                          .filter(Boolean)
                          .join(" • ")}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default EditProfile;

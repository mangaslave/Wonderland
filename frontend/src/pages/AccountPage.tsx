import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const AccountPage: React.FC = () => {
  const { user } = useUser(); 
  const [name, setName] = useState(user?.fullName || "");
  const [email] = useState(user?.emailAddresses[0]?.emailAddress || "");
  const [profileImage, setProfileImage] = useState(user?.imageUrl || "");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (loading) {
    return <p className="text-center">Loading your account...</p>; 
  }
  const handleNameChange = async () => {
    try {
      await user?.update({ firstName: name }); 
      setSuccessMessage("Name updated successfully!");
    } catch (err) {
      console.error("Error updating name:", err);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        setImagePreview(reader.result as string);
        try {
          setLoading(true);
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/clerk/upload-image", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Failed to upload image");
          }

          const { imageUrl } = await response.json();
          await user?.setProfileImage(imageUrl); 
          setProfileImage(imageUrl);
          setSuccessMessage("Profile image updated successfully!");
        } catch (err) {
          console.error("Error updating profile image:", err);
        } finally {
          setLoading(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Account</h1>
      <div className="max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex justify-center items-center">
            {imagePreview || profileImage ? (
              <img
                src={imagePreview || profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
          <label
            htmlFor="profilePicture"
            className="mt-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Upload Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <button
            onClick={handleNameChange}
            className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Name
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="w-full px-4 py-2 border rounded-lg"
            disabled
          />
          <p className="text-sm text-gray-500 mt-2">
            Email changes must be done via Clerk's email management.
          </p>
        </div>

        <Link to="/dashboard">
            <button
                className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Cancel
            </button>
            </Link>

        {successMessage && (
          <p className="mt-4 text-green-500 text-center">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default AccountPage;

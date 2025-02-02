import React, { Component, useEffect, useState } from "react";
import Navbar from "../ui-components/Navbar.jsx";
import Listing from "./tools/Listing.jsx";
import Reservation from "./reservation/UserReservationCard.jsx";

const Profile = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rentals, setRentals] = useState([]);
  const [showListings, setShowListings] = useState(true);
  //this userID is temporary in liu of not having database access currently (11/28)
  const user = JSON.parse(sessionStorage.getItem("SessionInfo"));
  // console.log(user);
  //define button click on My Listings and My Rentals
  const handleClick = (button) => {
    if (button === "show listings") {
      // Show listings
      setShowListings(true);
    } else if (button === "show rentals") {
      // Show rentals
      setShowListings(false);
    }
  };

  useEffect(() => {
    //function to get users listing and set user listing state
    const fetchUserListings = async () => {
      try {
        const response = await fetch(
          `/reservations/listings?userId=${user.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user listings");
        }
        const userListings = await response.json();
        // console.log('user Listings in Profile component from DB', userListings);
        setListings(userListings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user listings: ", error);
        setLoading(false);
      }
    };

    //function to get user rentals and set user rental state
    const fetchUserRentals = async () => {
      try {
        console.log("try to fetch rentals initiated");
        const response = await fetch(`/reservations/rentals?userId=${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user rentals");
        }
        const userRentals = await response.json();
        console.log("user Rentals in Profile component from DB", userRentals);
        setRentals(userRentals);
      } catch (error) {
        console.error("Error fetching user rentals: ", error);
      }
    };

    //call fetch User Listings
    fetchUserListings();

    //call fetch User Rentals
    fetchUserRentals();
  }, []);

  return (
    <div className="relative">
      <Navbar className="top-0" />
      <div className=" bg-[url('https://www1.picturepush.com/photo/a/8228674/img/Anonymous/AME-4-3DM-20112012-3DModel-WilliamsonAlex.jpg')] bg-no-repeat bg-cover h-screen flex flex-col ">
        <section className=" mt-20 flex flex-col justify-center items-center">
          <h1 className="pt-5 mb-3 text-5xl font-bold text-white">My Shed</h1>
          <div className="flex space-x-3 mb-5">
            <button
              className="rounded-md bg-reseda_green text-mindaro px-3 py-1.5 text-lg font-semibold leading-6 shadow-sm hover:bg-reseda_green/80 hover:text-tea_green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted_green"
              onClick={() => handleClick("show listings")}
            >
              My Tools
            </button>
            <button
              className="rounded-md bg-reseda_green text-mindaro px-3 py-1.5 text-lg font-semibold leading-6 shadow-sm hover:bg-reseda_green/80 hover:text-tea_green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted_green"
              onClick={() => handleClick("show rentals")}
            >
              My Rentals
            </button>
          </div>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-between mt-5">
          {showListings
            ? listings.map((tool) => <Listing key={tool.id} {...tool} />)
            : rentals.map((rental) => (
                <Reservation key={rental.reservation_id} {...rental} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { Component, useEffect, useState } from 'react';
import Navbar from './Navbar.jsx'
import Listing from './Listing.jsx'
import Reservation from './Reservation.jsx'

const Profile = ()=>{
    const [listings, setListings] = useState([]);
    const [loading, setLoading] =  useState(true);
    const [rentals, setRentals] = useState([]);
    const [showListings, setShowListings] = useState(true);
    //this userID is temporary in liu of not having database access currently (11/28)
    const userID = 1;

    //define button click on My Listings and My Rentals
    const handleClick = (button) => {
        if (button === 'show listings') {
          // Show listings
          setShowListings(true);
        } else if (button === 'show rentals') {
          // Show rentals
          setShowListings(false);
        }
      };

    useEffect(() => {
        //function to get users listing and set user listing state
        const fetchUserListings = async () => {
            try {
                const response = await fetch(`/reservation/listings?userId=${userID}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch user listings');
                }
                const userListings = await response.json();
                console.log('user Listings in Profile component from DB', userListings);
                setListings(userListings);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user listings: ', error);
                setLoading(false);
            }
        };

        //function to get user rentals and set user rental state
        const fetchUserRentals = async () => {
            try {
                const response = await fetch(`/reservation/rentals?userId=${userID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user rentals');
                }
                const userRentals = await response.json();
                setRentals(userRentals);
            } catch (error) {
                console.error('Error fetching user rentals: ', error);
            }
        }

        //call fetch User Listings
        fetchUserListings();

        //call fetch User Rentals
        fetchUserRentals();
    }, []);

    return(
        <div>
            <Navbar/>
            <div>
                <h1>My Shed</h1>
            </div>
            <div>
                <button onClick={() => handleClick('show listings')}>My Listings</button>
                <button onClick={() => handleClick('show rentals')}>My Rentals</button>
            </div>
            <div>
                {showListings ? (
                    listings.map((tool) => <Listing key={tool.id} {...tool} />)
                ) : (
                    rentals.map((rental) => <Reservation key={rental.id} {...rental} />)
                )}
            </div>
            <div>
                <Reservation/>
            </div>
        </div>
    )
}

export default Profile;
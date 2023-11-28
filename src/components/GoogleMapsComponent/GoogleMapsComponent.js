
import './GoogleMapsComponent.scss';

import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 25.79950,
    lng: -80.202813,
};

const mapOptions = {
    // Customize map options here
    mapTypeId: 'roadmap',
    disableDefaultUI: true, // Hide default UI components (e.g., zoom control)
    styles: [
        {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }], // Hide points of interest labels
        },
        // Add more styles as needed

    ],
};

function GoogleMapComponent({ addresses }) {

    const apiKey = process.env.REACT_APP_GOOGLE_API;

    const [locations, setLocations] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);


    const fetchCoordinates = async (address) => {
        try {
            const googleAddress = `${address.street_address} ${address.city}, ${address.state}`;
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(googleAddress)}&key=AIzaSyADAbGy6K9_E5njq961RzpbsGk1Bb4oHiA`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                return { address, lat: location.lat, lng: location.lng };
            }

            return null;
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            return null;
        }
    };

    const fetchLocations = async () => {

        const resolvedAddresses = [];

        for (const address of addresses) {
            const googleAddress = `${address.street_address} ${address.city}, ${address.state}`;
            const location = await fetchCoordinates(address);
            if (location) {
                resolvedAddresses.push(location);
            }
        }

        setLocations(resolvedAddresses);
    };

    const handleMarkerClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyADAbGy6K9_E5njq961RzpbsGk1Bb4oHiA'
            /* googleMapsApiKey={apiKey} */
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={17}
                options={mapOptions}
            >
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={{ lat: location.lat, lng: location.lng }}
                        onClick={() => handleMarkerClick(location)}
                    />
                ))}

                {selectedRestaurant && (
                    <InfoWindow
                        position={{ lat: selectedRestaurant.lat, lng: selectedRestaurant.lng }}
                        onCloseClick={() => setSelectedRestaurant(null)}
                    >
                        <div className='maps-window'>
                            <div className='maps-window__image-container'>
                                <img className='maps-window__image' src={selectedRestaurant.address.image_url} alt={selectedRestaurant.address.restaurant_name} />
                            </div>
                            <h3 className='section-header maps-window__title'>{selectedRestaurant.address.restaurant_name}</h3>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;
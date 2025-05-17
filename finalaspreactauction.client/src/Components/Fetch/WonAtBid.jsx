import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Example/AuthContext';

const VehiclesWonAtBit = () => {
    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userId } = useAuth();

    const styles = {
        container: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '24px',
            color: '#333',
        },
        title: {
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '24px',
            color: '#111',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
        },
        card: {
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer',
        },
        cardImage: {
            width: '100%',
            height: '160px',
            objectFit: 'cover',
        },
        cardDetails: {
            padding: '16px',
        },
        badge: {
            display: 'inline-block',
            background: '#e0f2f1',
            color: '#00796b',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            marginBottom: '8px',
        },
        cardTitle: {
            fontSize: '18px',
            fontWeight: '600',
            margin: '8px 0',
            color: '#111',
        },
        cardInfo: {
            fontSize: '14px',
            color: '#666',
            margin: '4px 0',
        },
        bidAmount: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#111',
            margin: '8px 0',
        },
        centerState: {
            textAlign: 'center',
            padding: '40px 0',
        },
        spinner: {
            display: 'inline-block',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid rgba(0, 0, 0, 0.1)',
            borderTopColor: '#007aff',
            animation: 'spin 1s linear infinite',
            marginBottom: '16px',
        },
        errorMessage: {
            color: '#c62828',
            marginBottom: '16px',
        },
        button: {
            background: '#007aff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
        },
        emptyState: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 0',
        },
        emptyIcon: {
            fontSize: '48px',
            marginBottom: '16px',
            color: '#ccc',
        },
        emptyText: {
            color: '#666',
            textAlign: 'center',
            maxWidth: '400px',
            margin: '0 auto',
        }
    };

    useEffect(() => {
        const fetchVehicles = async () => {
            if (!userId) return;

            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get("https://localhost:7038/api/Winner", {
                    params: { userId }
                });

                const vehiclesWithDetails = await Promise.all(
                    response.data.map(async (winner) => {
                        try {
                            const carDetails = await axios.get(`https://localhost:7038/api/Car/GetById`, {
                                params: { id: winner.carId }
                            });
                            return { ...winner, ...carDetails.data };
                        } catch (error) {
                            console.error(`Error fetching details for car ${winner.carId}:`, error);
                            return winner;
                        }
                    })
                );

                setVehicles(vehiclesWithDetails);
            } catch (error) {
                console.error("Error fetching won vehicles:", error);
                setError("You did not win");
            } finally {
                setIsLoading(false);
            }
        };

        fetchVehicles();
    }, [userId]);

    return (
        <div
            style={{
                ...styles.container,
                display: error ? 'none' : 'block'
            }}
            id="dashb"
        >
            <style>
                {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
            </style>

            <h3 style={styles.title}>Vehicles Won at Auction</h3>

            {isLoading && (
                <div style={styles.centerState}>
                    <div style={styles.spinner}></div>
                    <p>Loading your vehicles...</p>
                </div>
            )}

            {error && (
                <div style={styles.centerState}>
                    <p style={styles.errorMessage}>{error}</p>
                    <button
                        style={styles.button}
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {!isLoading && !error && vehicles.length === 0 && (
                <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>🚗</div>
                    <div style={styles.emptyText}>
                        <p style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500' }}>You haven't won any vehicles yet.</p>
                        <p>Explore available auctions to place your first bid!</p>
                    </div>
                </div>
            )}

            {!isLoading && !error && vehicles.length > 0 && (
                <div style={styles.grid}>
                    {vehicles.map((vehicle) => (
                        <div
                            key={vehicle.carId}
                            style={styles.card}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <img
                                src={vehicle.imageUrl || "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                                alt={vehicle.make ? `${vehicle.make} ${vehicle.model}` : `Car ID: ${vehicle.carId}`}
                                style={styles.cardImage}
                            />
                            <div style={styles.cardDetails}>
                                <span style={styles.badge}>Won at Auction</span>
                                <h4 style={styles.cardTitle}>
                                    {vehicle.make ? `${vehicle.make} ${vehicle.model}` : `Vehicle #${vehicle.carId}`}
                                </h4>
                                {vehicle.year && <p style={styles.cardInfo}>Year: {vehicle.year}</p>}
                                {vehicle.winningBid && (
                                    <p style={styles.bidAmount}>
                                        Winning Bid: ${parseFloat(vehicle.winningBid).toLocaleString()}
                                    </p>
                                )}
                                {vehicle.dateWon && (
                                    <p style={styles.cardInfo}>
                                        Won on: {new Date(vehicle.dateWon).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VehiclesWonAtBit;
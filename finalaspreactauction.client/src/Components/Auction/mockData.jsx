export const mockVehicleData = {
    id: 'VIN1234567890ABCDE',
    title: '2022 Mercedes-Benz S-Class',
    subtitle: 'S 580 4MATIC Sedan',
    description: 'Luxury sedan in excellent condition with low mileage. Features premium Burmester sound system, heated and ventilated seats, and advanced driver assistance package.',
    currentBid: 72500,
    bidIncrement: 500,
    startingBid: 65000,
    reservePrice: 78000,
    buyNowPrice: 85000,
    timeRemaining: 1800, //bid time
    location: 'Los Angeles, CA',
    seller: 'Premium Auto Group',
    condition: 'Clean',
    odometer: '12,345',
    primaryDamage: 'None',
    secondaryDamage: 'None',
    driveablity: 'Runs and Drives',
    transmission: 'Automatic',
    fuel: 'Gasoline',
    keys: 'Yes',
    vehicleType: 'Automobile',
    color: 'Obsidian Black Metallic',
    engine: '4.0L V8 Biturbo',
    cylinders: '8',
    drive: 'All-Wheel Drive',
    status: 'Live',
    saleDate: '2025-07-15',
    images: [
        'https://www.topgear.com/sites/default/files/2023/06/23C0180_15.jpg',
        'https://www.motortrend.com/files/6765e3718b3cc30008a9e03e/004-2024-mercedes-amg-s63-s-e-performance-front-three-quarter-static.jpg',
        'https://images.cdn.autocar.co.uk/sites/autocar.co.uk/files/mercedes-amg-s63-e-performance-review-2024-01front-tracking.jpg '
    ],
    documents: [
        { name: 'Vehicle Title', available: true },
        { name: 'Service Records', available: true },
        { name: 'Original Window Sticker', available: true },
        { name: 'Manufacturer Warranty', available: true }
    ],
    features: [
        'Premium Burmester 4D Sound System',
        'MBUX Hyperscreen',
        'Head-Up Display',
        'Heated & Ventilated Massaging Seats',
        'Panoramic Sunroof',
        'Augmented Reality Navigation',
        'Driver Assistance Package',
        'Night Package',
        'Nappa Leather Upholstery',
        'Ambient Lighting with 64 Colors'
    ]
};

export const mockBidHistory = [
    {
        id: 5,
        amount: 72500,
        bidder: 'Bidder789',
        time: '2025-07-14T18:25:43Z',
        isUser: false
    },
    {
        id: 4,
        amount: 72000,
        bidder: 'Bidder456',
        time: '2025-07-14T18:20:17Z',
        isUser: false
    },
    {
        id: 3,
        amount: 71500,
        bidder: 'Bidder123',
        time: '2025-07-14T18:15:02Z',
        isUser: false
    },
    {
        id: 2,
        amount: 70000,
        bidder: 'Bidder456',
        time: '2025-07-14T18:10:55Z',
        isUser: false
    },
    {
        id: 1,
        amount: 68500,
        bidder: 'Bidder789',
        time: '2025-07-14T18:05:30Z',
        isUser: false
    },
    {
        id: 0,
        amount: 65000,
        bidder: 'System',
        time: '2025-07-14T18:00:00Z',
        isUser: false
    }
];
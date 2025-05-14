    import { mockVehicleData } from './../../Components/Auction/mockData';

    export const fetchVehicleDataAndMergeToMock = async (id) => {
        try {
            const response = await fetch(`https://localhost:7038/api/Car/GetById?id=${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const updatedVehicleData = {
                ...mockVehicleData,
                id: data.id ?? mockVehicleData.id,
                title: `${data.year} ${data.branch}`,
                subtitle: data.vin ?? mockVehicleData.subtitle,
                description: data.description ?? mockVehicleData.description,
                currentBid: 100,
                bidIncrement: 300,
                startingBid: 0,
                reservePrice: null,
                buyNowPrice: data.price ?? mockVehicleData.buyNowPrice,
                timeRemaining: data.tineBid ?? 10,
                location: data.country ?? mockVehicleData.location,
                seller: 'Auction',
                condition: 'Used',
                odometer: data.otometer ?? mockVehicleData.odometer ?? 'N/A',
                primaryDamage: data.damage ?? mockVehicleData.primaryDamage,
                secondaryDamage: '',
                driveablity: 'Unknown',
                transmission: '',
                fuel: data.fuelType ?? mockVehicleData.fuel,
                keys: data.key ?? mockVehicleData.keys,
                vehicleType: 'Car',
                color: '',
                engine: data.engine ?? mockVehicleData.engine,
                cylinders: data.cylinder ?? mockVehicleData.cylinders,
                drive: '',
                status: 'Active',
                saleDate: new Date().toISOString(),
                images: data.imageUrl ? [data.imageUrl] : mockVehicleData.images,
                video: data.videoUrl ? [data.videoUrl] : '',
                documents: [],
                features: [],
                auctionTime: data.auctionTime ? new Date(data.auctionTime) : new Date(Date.now()), 
                brandId: data.makeId ? data.makeId : 1
            };

            return updatedVehicleData;
        } catch (error) {
            console.error('Failed to fetch and merge vehicle data:', error);
            return mockVehicleData;
        }
    };

import React from 'react';
import { HomeIcon, AlertCircle } from 'lucide-react';

const NotFound = () => {
    const handleHomeClick = () => {
        window.location.href = '/';
    };

    return (
        <div className="relative min-h-screen bg-black" style={{marginTop:"-25px"} }>
            <img
                src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&height=900&width=1600&fit=bounds"
                alt="Dodge Challenger in dark garage with light painting"
                className="w-full h-screen object-cover opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                <div className="absolute inset-0 flex flex-col items-start justify-center pl-1 text-white max-w-3xl" style={{margin:"0 0 0 14vw"} }>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-7xl font-bold tracking-tight animate-fade-in">ERROR</h1>
                            <h2 className="text-6xl font-bold tracking-tight text-blue-400 animate-fade-in-delay">PAGE NOT FOUND</h2>
                        </div>

                        <div className="space-y-4 animate-slide-up">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                <AlertCircle className="text-blue-400" />
                                It could be for one of the following reasons:
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                                <li>You may have mistyped the web address</li>
                                <li>The page you're looking for has been moved or renamed</li>
                                <li>The page is temporarily unavailable</li>
                                <li>You followed a broken link from another site</li>
                            </ul>
                        </div>

                        <div className="pt-6">
                            <button
                                onClick={handleHomeClick}
                                className="bg-blue-500 text-black px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors duration-300 animate-fade-in-delay"
                            >
                                <HomeIcon size={20} />
                                <span>Return to Homepage</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>
        </div>
    );
};

export default NotFound;
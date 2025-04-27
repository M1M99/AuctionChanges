import React from 'react';

const GradientBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')] bg-fixed bg-no-repeat bg-cover mix-blend-overlay"></div>
            </div>
            {/* SVG Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTQuODUgMTYuNWMtLjk2NiAwLTEuNzUtLjc4NC0xLjc1LTEuNzVzLjc4NC0xLjc1IDEuNzUtMS43NSAxLjc1Ljc4NCAxLjc1IDEuNzVTNTUuODE2IDE2LjUgNTQuODUgMTYuNW0tMzEuODU3IDE3Ljc4NWMtLjg2NyAwLTEuNTctLjcwMy0xLjU3LTEuNTdsLjcwMy0xLjU3IDEuNTctMS41NyAxLjU3LjcwMyAxLjU3IDEuNTctLjcwMyAxLjU3LTEuNTcgMS41N004LjQyOSA0OWMtLjUxIDAtLjkyNC0uNDEzLS45MjQtLjkyNHMuNDE0LS45MjQuOTI0LS45MjQuOTI0LjQxMy45MjQuOTI0Uy44MzkgNDkgOC40MjkgNDltNDUuMTYgMGMtLjgyMyAwLTEuNDktLjY2Ny0xLjQ5LTEuNDkgMC0uODIyLjY2Ny0xLjQ5IDEuNDktMS40OS44MjIgMCAxLjQ5LjY2OCAxLjQ5IDEuNDkgMCAuODIzLS42NjggMS40OS0xLjQ5IDEuNDlNMTcuMSAxNi41Yy0xLjQyOCAwLTIuNTg4LTEuMTYtMi41ODgtMi41ODggMC0xLjQzIDEuMTYtMi41ODggMi41ODgtMi41ODhzMi41ODggMS4xNiAyLjU4OCAyLjU4OGMwIDEuNDMtMS4xNiAyLjU4OC0yLjU4OCAyLjU4OCAiZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-20"></div>
        </div>
    );
};

export default GradientBackground;

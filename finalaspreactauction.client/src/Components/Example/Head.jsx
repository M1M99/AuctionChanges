import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import logo from './../../assets/Auction.png';
import { useAuth } from '../../Components/Example/AuthContext';

const colors = {
    primary: {
        950: '#121825',
        900: '#192648',
        800: '#25395B',
        700: '#2C4265'
    },
    accent: {
        300: '#76B3FF',
        400: '#50A0FF',
        500: '#2A85FF',
        600: '#0070FF'
    },
    neutral: {
        100: '#EDF0F2',
        200: '#E2E6E9',
        300: '#D0D7DD',
        400: '#B8C2CC'
    }
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const HeaderContainer = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Nav = styled.nav`
  margin: 8px;
  height: 80px;
  background-color: ${colors.primary[950]};
  border-radius: 12px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  @media (max-width: 790px) {
    padding: 0 20px;
    margin: 4px;
    margin-bottom:0px
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  animation: ${slideDown} 0.5s ease-in-out;
`;

const LogoImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 790px) {
    width: 58px;
    height: 58px;
  }
`;

const BrandTitle = styled(Link)`
  color: ${colors.accent[500]};
  font-size: 24px;
  font-weight: 600;
  margin-left: 16px;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${colors.accent[300]};
  }
  
  @media (max-width: 925px) {
    font-size: 20px;
    margin-left: 12px;
  }
`;

const NavLinksContainer = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledNavLink = styled(Link)`
  color: ${colors.neutral[300]};
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  position: relative;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${colors.accent[300]};
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${colors.accent[500]};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  &.active {
    color: ${colors.accent[500]};
    
    &::after {
      width: 100%;
    }
  }
    @media (max-width: 925px) {
    font-size: 15px;
  }

      @media (max-width: 900px) {
    font-size: 13px;
  }
`;

const Button = styled.button`
  background-color: ${props => props.variant === 'primary' ? colors.accent[500] : colors.primary[900]};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
    align-items: center;
  
  &:hover {
    background-color: ${props => props.variant === 'primary' ? colors.accent[600] : colors.primary[800]};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }

    @media (max-width: 920px) {
    display: flex;
    padding:8px 16px;
    alignItems: center;
    font-size:15px;
    gap: 4px }
    @media (min-width: 920px) {
        width:140px;
    alignItems: center;
    gap: 8px }

     @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
}  
  }  

`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  text-transform:capitalize;
  color: ${colors.neutral[400]};
  margin-top: 4px;
   @media (max-width: 768px) {
   display:none;
  }  
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${colors.neutral[100]};
  font-size: 24px;
  cursor: pointer;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const MobileMenu = styled.div`
  @media (min-width: 769px) {
    display: none !important;
  }

  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background-color: ${colors.primary[900]};
  padding: 16px;
  z-index: 99;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-in-out;
  margin: 5px 10px;
`;

const MainContent = styled.main`
  padding: 12px;
`;

const NavLinks = ({ isAuthenticated }) => {
    const { userRole } = useAuth();
    return (
        <NavLinksContainer>
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/auctionVehicles">Auctions</StyledNavLink>
            {isAuthenticated && (
                <>
                    <StyledNavLink to="/dashboard" id="dashboard">Dashboard</StyledNavLink>
                    <StyledNavLink to="/favorites">Favorites</StyledNavLink>
                </>
            )}
            <StyledNavLink to="/about" id="about">About</StyledNavLink>
            {console.log(userRole)}
            {userRole == 'Admin' && (
                <StyledNavLink to="/admin">Admin</StyledNavLink>)
            }
        </NavLinksContainer>
    );
};

const Header1 = ({children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    //const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

    //useEffect(() => {
    //    const checkAuth = async () => {
    //        const token = localStorage.getItem('authToken');
    //        if (!token) {
    //            setIsAuthenticated(false);
    //            return;
    //        }
    //        setIsAuthenticated(true);
    //    };

    //    checkAuth();
    //}, []);
    const { isAuthenticated, logout, userRole,userName } = useAuth();
    const isAdmin = userRole === 'Admin';
    //const navigate = useNavigate();
    //const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        //localStorage.removeItem('authToken');
        //setIsAuthenticated(false);
        logout();
        navigate('/login');
    };

    return (
        <>
            <HeaderContainer>
                <Nav>
                    <LogoContainer>
                        <LogoImage
                            src={logo}
                            alt="Online Car Auction Logo"
                        />
                        <BrandTitle to="/#">Online Car Auction</BrandTitle>
                    </LogoContainer>

                    <NavLinks isAuthenticated={isAuthenticated} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {isAuthenticated ? (
                            <Button onClick={handleLogout} >
                                Log out
                                {userName && <UserInfo>{userName}</UserInfo>}
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={() => navigate('/login')}>
                                Log in
                            </Button>
                        )}

                        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? '✕' : '☰'}
                        </MobileMenuButton>
                    </div>
                </Nav>

                <MobileMenu isOpen={mobileMenuOpen}>
                    <StyledNavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</StyledNavLink>
                    <StyledNavLink to="/auctionVehicles" onClick={() => setMobileMenuOpen(false)}>Auctions</StyledNavLink>
                    {isAuthenticated && (
                        <>
                            <StyledNavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</StyledNavLink>
                            <StyledNavLink to="/favorites" onClick={() => setMobileMenuOpen(false)}>Favorites</StyledNavLink>
                            {isAdmin && (
                                <StyledNavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin</StyledNavLink>
                            )}
                        </>)}
                    <StyledNavLink to="/about" onClick={() => setMobileMenuOpen(false)}>About</StyledNavLink>
                    {isAuthenticated ? (
                        <Button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                            Log out
                            {userName && <UserInfo>{userName}</UserInfo>}
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                        >
                            Log in
                        </Button>
                    )}
                </MobileMenu>
            </HeaderContainer>

            <MainContent>{children}</MainContent>
        </>
    );
};


export const DashboardPage = () => (
    <div className="page-container">
        <h1>Your Dashboard</h1>
        <p>Manage your bids and account</p>
    </div>
);

export const FavoritesPage = () => (
    <div className="page-container">
        <h1>Your Favorites</h1>
        <p>Cars you've saved for later</p>
    </div>
);
export default Header1

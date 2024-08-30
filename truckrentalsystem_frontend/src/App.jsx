import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home.jsx';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Branches from './components/Branches';
import GetQuote from './components/GetQuote';
import CustomerProfile from './components/CustomerProfile.jsx';
import CustomerComponent from './components/CustomerComponent.jsx';
import HeaderComponent from './components/HeaderComponent.jsx';
import SignUpComponent from "./components/SignUpComponent.jsx";
import SignInComponent from "./components/SignInComponent.jsx";
import ConfirmDetails from "./components/ConfirmDetails.jsx";
import Payment from "./components/Payment.jsx";
import './App.css';
import ManagerPortal from "./components/manager/ManagerPortal.jsx";
import Trucks from "./components/manager/Trucks.jsx";
import Branchez from "./components/manager/Branchez.jsx";
import Employees from "./components/Employees.jsx";
import TruckTypes from "./components/manager/TruckTypes.jsx";
import ImagesComponent from "./components/manager/ImagesComponent.jsx";
import InsuranceList from "./components/manager/InsuranceList.jsx";
import ManagerContactUs from "./components/manager/ManagerContactUs.jsx";
import CustomerHome from "./components/CustomerHome.jsx";
import UpdateRental from "./components/customer/UpdateRental.jsx";
import RentalHistory from "./components/customer/RentalHistory.jsx";

function App() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <Router>
            <div className={`App ${!visible ? 'hidden' : ''}`}>
                <HeaderComponent />
                <div className="content-container">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/branches" element={<Branches />} />
                        <Route path="/customer-home" element={<CustomerHome/>} />
                        <Route path="/update-rental" element={<UpdateRental/>} />
                        <Route path="/rental-History" element={<RentalHistory/>} />

                        {/*---------MANAGER FUNCTIONALITY STARTS-----------*/}
                        <Route path="/manager-portal/*" element={<ManagerPortal/>}>
                            <Route path="dashboard" element={<div>Dashboard Content</div>}/>
                            <Route path="trucks" element={<Trucks/>}/>
                            <Route path="branchez" element={<Branchez/>}/>
                            <Route path="employees" element={<Employees/>}/>
                            <Route path="truck-types" element={<TruckTypes/>}/>
                            <Route path="images" element={<ImagesComponent/>}/>
                            <Route path="insurances" element={<InsuranceList/>}/>
                            <Route path="contact-us" element={<ManagerContactUs/>}/>
                        </Route>
                        {/*---------MANAGER FUNCTIONALITY ENDS-----------*/}

                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/sign-in" element={<SignInComponent />} />
                        <Route path="/sign-up" element={<SignUpComponent />} />
                        <Route path="/update-customer/:customerID" element={<CustomerComponent />} />
                        <Route path="/customer-profile" element={<CustomerProfile />} />
                        <Route path="/get-quote/:truckId" element={<GetQuote />} />
                        <Route path="/confirm-details" element={<ConfirmDetails/>} />
                        <Route path="/payment" element={<Payment/>}/>
                    </Routes>
                </div>
                {/*<FooterComponent />*/}
            </div>
        </Router>
    );
}

export default App;

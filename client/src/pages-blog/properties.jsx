import React,{useState,useEffect} from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import {Link, useLocation,useHistory} from 'react-router-dom';
import axios from 'axios';
import PropertyPagination from '../propertypagination.jsx'

const Templisting = () => {
    const [propertyList,setPropertyList] = useState([
        {
            _id: '', 
            imagefile: '',
            title: '', 
            address: '',
            bedroom: '', 
            bathroom: '', 
            area: '', 
            feature:[],
            price: '',
        }
        ]);
    const [loading,setLoading] = useState(true);
    let history = useHistory();
    let query = useLocation().search
    const getPropertyList =() =>{
        axios.get('/api/propertyListings' + query)
        .then((res) => {
            if(res.data==='notfound'){
                history.push('/404')
                return function cleanup(){}
            }
            setPropertyList(res.data);
            setLoading(false);
        })
        .catch(()=>{
            console.log('Error getting data!')
        })
    }
    useEffect(()=>{
        getPropertyList();
    },[query])
    if(loading){
        return <div id='loading'><h1>Loading...</h1></div>
    }
    return(
    <div>
        {propertyList.map((property,i) =>
        <Link to={`/properties/${property._id}`} className="listed" key={i}>
            <img alt="" src={property.imagefile}/>
            <div className="list-content">
                <h2>{property.title}</h2>
                <p>{property.address}</p>
                <h4>
                    <span><i className="fas fa-bed"></i>{property.bedroom}</span>
                    <span><i className="fas fa-shower"></i>{property.bathroom}</span>
                    <span><i className="fas fa-expand-arrows-alt"></i>{property.area} sqft</span>
                </h4>
            </div>
            <div className="list-price">
                <h2>£{property.price}</h2>
            </div>
        </Link>)}
        <PropertyPagination/>
    </div>
    )}


const Properties= () => {
    return (
        <div>
            <Header />
            <div className="overlap">
                <div id="properties">
                    <section id="filter">
                        <form action="/action.php">
                            <div id="form-flex">
                            <div className="styled-select">
                                <i className="fas fa-search"></i>
                                <select id="City" name="City">
                                    <option value="">Any cities</option>
                                    <option value="Birmingham">Birmingham</option>
                                    <option value="Bristol">Bristol</option>
                                    <option value="London">London</option>
                                    <option value="Manchester">Manchester</option>
                                    <option value="Reading">Reading</option>
                                </select>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                            <div className="styled-select">
                                <i className="fas fa-home"></i>
                                <select id="Type" name="Type">
                                <option value="">Any Types</option>
                                    <option value="HMO">HMO</option>
                                    <option value="Pre-owned Houses">Pre-owned Houses</option>
                                    <option value="Pre-owned Flats">Pre-owned Flats</option>
                                    <option value="Cottages">Cottages</option>
                                </select>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                            <div className="styled-select">
                                <i className="fas fa-pound-sign"></i>
                                <select id="Price" name="Price">
                                    <option value="Any">Any Prices</option>
                                    <option value="£50K">£50K - £300K</option>
                                    <option value="£100K">£300K - £700K</option>
                                    <option value="£1M">£700K - £1M</option>
                                </select>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                            <div className="styled-select">
                                <i className="fas fa-bed"></i>
                                <select id="Bedrooms" name="Bedrooms">
                                <option value="Any">Any Beds</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3+</option>
                                </select>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                            <input type="submit" value="Go !"/>
                            </div>
                        </form>
                    </section>
                    <section id="listings">
                        <h1>Properties for Sale</h1>
                        <Templisting/>
                        
                    </section>
                    
                </div>
                
                <Footer />
            </div>
           
        </div>
    );
}

export default Properties;
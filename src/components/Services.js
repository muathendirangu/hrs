import React, { Component } from 'react';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa';
import Title from './Title';
class Services extends Component {
    state = {
        services:[
            {
                icon: <FaCocktail/>,
                title: "Free cocktails",
                info:
                    "The cocktails are so awesome here come enjoy some"
            },
            {
                icon: <FaHiking/>,
                title: "We are going to hike",
                info:
                    "The cocktails are so awesome here come enjoy some"
            },
            {
                icon: <FaShuttleVan/>,
                title: "Vroom lets go",
                info:
                    "The cocktails are so awesome here come enjoy some"
            },
            {
                icon: <FaBeer/>,
                title: "Cold beer available",
                info:
                    "The cocktails are so awesome here come enjoy some"
            },
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services"/>
                <div className="services-center">
                   {this.state.services.map((service, index) => {
                       return (
                         <article key={index} className="service">
                             <span>{service.icon}</span>
                             <h6>{service.title}</h6>
                             <p>{service.info}</p>
                         </article>  
                       );
                   })} 
                </div>
            </section>
        )
    }
}

export default Services;
import React, { Component } from 'react'
// import items from './data';
import Client from './Contentful';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    
    state = {
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakFast: false,
        pets: false
    }

    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "hrs"
            })
            let rooms = this.formatData(response.items);        
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map( item => item.price));
            let maxSize = Math.max(...rooms.map( item => item.size));
            this.setState({
                    rooms,
                    featuredRooms,
                    sortedRooms:rooms,
                    loading:false,
                    price: maxPrice,
                    maxPrice,
                    maxSize
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount(){
        //fetch data from api, then format data
        this.getData();
    }

    formatData(rooms){
        let everyRoom = rooms.map(room => {
            let id = room.sys.id;
            let images = room.fields.images.map(image => 
                image.fields.file.url
            );
            let rm = {...room.fields, images, id}
            return rm;
        });
        return everyRoom;
    }

    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = event.target.name;

        this.setState({
            [name] : value
        }, this.filterRooms);       
    }

    filterRooms = () => {
        let {
            rooms, type, capacity, price, minSize, maxSize, breakFast, pets
        } = this.state;
        let tempRooms = [...rooms];
        
        // filter by room type
        if (type !== "all") {
            tempRooms = tempRooms.filter(room => room.type === type);
        }
        // filter by capacity
        capacity = parseInt(capacity);
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

         // filter by price
         price = parseInt(price);
         tempRooms = tempRooms.filter(room => room.price <= price);
         
         //filter by size
        tempRooms = tempRooms.filter(
            room => room.size >= minSize && room.size <= maxSize
        );
        //filter by breakFast
        if (breakFast) {
            tempRooms = tempRooms.filter(room => room.breakFast === true);
        }
        //filter by pets
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }
        this.setState({
            sortedRooms: tempRooms
        });
    }

    render() {
        return (
            <RoomContext.Provider 
                value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange
                    }}
            >
               {this.props.children} 
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

const withRoomConsumer = Component => {
    return (props) => {
        return <RoomConsumer>
                    {value => <Component {...props} context={value}/>}
               </RoomConsumer>
    } 
}


export { RoomProvider,  RoomConsumer, RoomContext, withRoomConsumer};
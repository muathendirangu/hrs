import React, { Component } from 'react'
import items from './data';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    
    state = {
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true
    }

    componentDidMount(){
        //fetch data from api, then format data
        let rooms = this.formatData(items);        
       let featuredRooms = rooms.filter(room => room.featured === true);
       
       this.setState({
            rooms,
            featuredRooms,
            sortedRooms:rooms,
            loading:false
       });
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

    render() {
        return (
            <RoomContext.Provider 
                value={{
                    ...this.state,
                    getRoom: this.getRoom
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
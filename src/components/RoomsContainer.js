import React from 'react';
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import { withRoomConsumer } from '../context';
import Loading from './Loading';

const RoomsContainer = ({context}) => {
            const {loading, rooms, sortedRooms} = context;
            if (loading) {
                return <Loading/>
            }
            return (
                <div>
                    <RoomsFilter rooms={rooms}/>
                    <RoomsList rooms={sortedRooms}/>
                </div>
            );
     }


export default withRoomConsumer(RoomsContainer);
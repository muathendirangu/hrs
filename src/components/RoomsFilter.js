import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Title from '../components/Title';


// get all unique values
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}

const RoomsFilter = ({rooms}) => {
    const context = useContext(RoomContext);
    
    
    const { handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets} = context;
    // get unique types of rooms
    let types = getUnique(rooms, "type");
    
    // get all types of rooms
    types = ["all", ...types];
    
    // map room types to jsx
    types = types.map((item, index) => {
        return (
            <option value={item} key={index}>
                {item}
            </option>
        )
    });
     // get unique rooms by capacity
     let people = getUnique(rooms, "capacity");
     
     // map capacity to jsx
     people = people.map((item, index) => {
         return (
             <option value={item} key={index}>
                 {item}
             </option>
         )
     });
    return (
        <section className="filter-container">
            <Title title="search rooms"/>
            <form className="filter-form">
                {/* room type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select 
                        name="type"
                        id="type"
                        value={type}
                        className="form-control"
                        onChange={handleChange}>
                            {types}
                    </select>
                </div>
                {/* end room type */}
                {/* select guest */}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select 
                        name="capacity"
                        id="capacity"
                        value={capacity}
                        className="form-control"
                        onChange={handleChange}>
                            {people}
                    </select>
                </div>
                {/* end select guest */}
                {/* filter by price */}
                <div className="form-group">
                    <label htmlFor="price">
                        room price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control"/>
                </div>
                {/* end filter by price */}
                {/* size */}
                <div className="form-group">
                <label htmlFor="price">room size </label>
                <div className="size-inputs">
                    <input
                    type="number"
                    name="minSize"
                    value={minSize}
                    onChange={handleChange}
                    className="size-input"
                    />
                    <input
                    type="number"
                    name="maxSize"
                    value={maxSize}
                    onChange={handleChange}
                    className="size-input"
                    />
                </div>
                </div>
                {/* end of select type */}
                {/* extras */}
                <div className="form-group">
                <div className="single-extra">
                    <input
                    type="checkbox"
                    name="breakfast"
                    id="breakfast"
                    checked={breakfast}
                    onChange={handleChange}
                    />
                    <label htmlFor="breakfast">breakfast</label>
                </div>
                <div className="single-extra">
                    <input
                    type="checkbox"
                    name="pets"
                    checked={pets}
                    onChange={handleChange}
                    />
                    <label htmlFor="breakfast">pets</label>
                </div>
                </div>
                {/* end of extras type */}
            </form>      
        </section>
    );
}

export default RoomsFilter;
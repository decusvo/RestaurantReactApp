import React from 'react';

/**
 * The About  component renders information describing the restaurant.
 *
 * @returns A container with information about the restaurant.
 */
const About = () => {

    return (
        <div className="container">

            <div className="row">
                <div className="one-half column" style={{marginTop:"15%"}}>
                    <h4>About this restaurant.</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                </div>
            </div>

        </div>
    )

};

export default About;
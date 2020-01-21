import React from 'react'
import 'src/Styling/Dashboard.scss';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render () {
        return (
        <div className="Container">
            <div className="Container-header">
                <header>
                   <h2> RMS </h2>
                </header>
            </div>

            <div className="Container-main">
            </div>

            <div className="Container-footer">
                <footer>

                </footer>
            </div>
        </div>

        )
    }

}
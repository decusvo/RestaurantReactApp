import React from 'react'

export default class FoodMenuItem extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            itemQuantity:0
        }

        this.PlusButtonHandler.bind(this);
        this.MinusButtonHandler.bind(this);
    }

    PlusButtonHandler() {
        let newState = (this.state.itemQuantity)+1;
        this.setState(newState);
    }

    MinusButtonHandler() {
        let newState = (this.state.itemQuantity)-1;
        this.setState(newState);
    }





    render () {
        return (
            <div className="Food-Menu-Item-Container">

                <div className="Item-title">
                    <h3>
                        {this.props.title}
                    </h3>
                </div>

                <div className="Item-image">
                    <img src={require(this.props.imageUrl)}/>
                </div>

                <div className="Item-description">

                    <div className="Item-sentence">
                        <i>{this.props.sentence}</i>

                    </div>

                    <div className="Item-nutritional-information">
                        <p>{this.props.nutritionalInformation}</p>

                    </div>

                    <div className="Item-Allergies">
                        <p>{this.props.allergies}</p>
                    </div>

                    <div className="Item-order">

                        <div className="Item-price">
                            <b>{this.props.price}</b>
                        </div>

                        <button className="Plus-button" onClick={this.PlusButtonHandler}>+</button>
                        <button className="Minus-button" onClick={this.MinusButtonHandler}>-</button>


                    </div>


                </div>

            </div>

        )
    }

};
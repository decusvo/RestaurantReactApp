import React from 'react'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import {createMuiTheme} from "@material-ui/core";

export default class MapOrderItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
/*    async componentDidMount(){
        //Fetches List of items from DB
        /!*fetch("//127.0.0.1:5000/get_orders", {method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"states": orderStates})
        })*!/
    }*/

    render() {
        const theme = createMuiTheme();
        const {orderID} = this.props;

        /*const MapOrderItem = ({value}) => {
            return value.map((ele, index) => {
                const order = ele;
                let {state, id, table_number} = order;
                return (<Card key={index}>this is a menu item</Card>)
            })
        };*/

        return(
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
            >
                <Divider variant="middle" />
                <Card style={{backgroundColor: "#fcc01a",
                    padding: theme.spacing(2),
                    marginBottom: theme.spacing(2)}} key={1}>
                    this is a menu item
                </Card>
                <Card style={{backgroundColor: "#fcc01a",
                    padding: theme.spacing(2),
                    marginBottom: theme.spacing(2)}} key={1}>
                    this is a menu item
                </Card>
                {/*<MapOrderItem value={this.state.items}/>*/}
            </Grid>
    )
    }

}
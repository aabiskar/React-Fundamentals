const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;

        this.setState(function(){
            return { username: value };
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }
    render() {
        return (
            <form  className= 'column' onSubmit= {this.handleSubmit}>
                <label className= 'header' htmlFor= 'username'>
                    {this.props.label}
                </label>
                <input
                    id= 'username'
                    placeholder= 'github username'
                    type= 'text'
                    autoComplete= 'off'
                    value= {this.state.username}
                    onChange= {this.handleChange }
                />
                <button
                    className= 'button'
                    type= 'submit'
                    disabled={!this.state.username}>
                    Submit
                </button>
            </form>
            )

    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            playerOneName: null,
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        };
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleSubmit(id,username) {
        console.log("HELLO",id,username)
        this.setState(function(){
            const newState= {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/'+username+ '.png?size=200';
            return newState;
        });
    }
    render() {
        const playerOneName = this.state.playerOneName;
        const playerTwoName = this.state.playerTwoName;
        return (
            <div>
                  <div className = 'row'>
                    {!playerOneName &&
                    <PlayerInput 
                        id= 'playerOne'
                        label = 'Player One'
                        onSubmit = {this.handleSubmit}
                    />}
                     {!playerTwoName && 
                    <PlayerInput
                        id= 'playerTwo'
                        label = 'Player Two'
                        onSubmit = {this.handleSubmit}
                    />}
                  </div>
            </div>
            
          
        )
    }
}

module.exports = Battle;
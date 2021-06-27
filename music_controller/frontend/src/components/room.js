import React, { Component } from 'react';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: true,
            isHost: false,
        };
        this.roomCode = this.props.match.params.roomCode;
        // this.getRoomDetails = this.getRoomDetails.bind(this);
        this.getRoomDetails();
    }

    getRoomDetails() {
        fetch("/api/get-room?code=" + this.roomCode)
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host
            })
        });
    }

    handleLeaveRoom = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room/", requestOptions)
            .then((_response) => {this.props.history.push("/")})
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Votes: {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Guest Can Pause: {this.state.guestCanPause === true ? 'yes' : 'no'}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Host: {this.state.isHost ? 'yes' : 'no'}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" onClick={this.handleLeaveRoom}  variant="contained">
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
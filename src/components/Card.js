import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width:'100%',
    maxHeight:"100%",
    display:'inline-flex',
    justifyContent:'space-between',
  },
  container:{
    display:'inline-flex',
    width:'100%',
    marginTop:'2px'
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    display:'inline-flex',
    marginTop:"20px",
  },
  name:{
    display:'inline-flex',
    padding:'6%',
  }
}));

export default function PersonCard(props) {
  const classes = useStyles();

  const[following,setFollowing] = useState(false);

  function follow() {
    if(!following){
      Axios.put(`https://api.github.com/user/following/${props.user.owner.login}`);
      setFollowing(true);
    }else{
      Axios.delete(`https://api.github.com/user/following/${props.user.owner.login}`);
      setFollowing(false);
    }
  }


  return (
      <Paper className={classes.container}>
        <div style={{width:"100%"}}>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar} src={props.user.owner.avatar_url} />
              }
            />
            <div className={classes.name}>
                {props.user.full_name}
            </div>
            <div>
            {following === false ?
            <Button className = {classes.button} variant="contained" color="primary" onClick={follow}>Follow</Button>
              : <Button className = {classes.button} variant="contained" color="secondary" onClick={follow}>Following</Button>}
            </div>
          </Card>
        </div>
    </Paper>
  );
}

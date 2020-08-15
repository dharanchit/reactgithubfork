import React,{useState,useEffect} from 'react';
import PersonCard from './Card';
import axios from 'axios';
import {Grid} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginLeft:'50%',
    },
  },
}));

export default function Cards(props) {
  const classes = useStyles();
  const[data,setData] = useState([]);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    async function fetchData(){
      setPage(page);
      await axios.get(`https://api.github.com/repos/facebook/react/forks?page=${page}`).then((response) => {
          setData(response.data);
      console.log(response);
    });
  }
  fetchData()
},[page])

  const handleChange=(e,value) =>{
    setPage(value);
  }
    
  return (
      <div>
        <Grid container spacing={3}>
            {data.map(item =>
              <Grid item xs={4}>
              <PersonCard key={item.id} user={item} />
              </Grid>
            )}
        </Grid>
        <div className={classes.root}>
          <Pagination count={100} color="primary" page={page} onChange={handleChange} />
      </div>
    </div>
  );
}

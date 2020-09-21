import React,{useState,useEffect} from 'react';
import { Chip, Card, CardHeader, CardContent, CardActions, Button, Paper, Container } from '@material-ui/core';
import activitiesService from '../Services/Activities'
import { makeStyles } from '@material-ui/core/styles';
import activitiesList from '../Shared/ActivityTypes'
const ActivityFinder = ()=>{
    const veto = (id) => {
        const activity = activities.find(t=>t._id ===id)
        const vetoActivity = {...activity,veto: true}
    
        activitiesService
          .update(id,vetoActivity)
          .then(retActivity =>{
            console.log(retActivity)
            setActivities(activities.map(t=>t._id !==id ? t : retActivity).filter(x=>!x.veto))
          })
          .catch(error=>{
            setErrs(
              "Fuck"
            )
            setTimeout(()=>{
              setErrs(null)
            },5000)
            })
         
      }
      function shuffleArray(inArray) {
        var array= [...inArray]   
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          padding: theme.spacing(0.5),
          margin: theme.spacing(1),
        },
        chip: {
          margin: theme.spacing(0.5),
        },
        card:{
            margin: theme.spacing(1),
        }
      }));
      const classes = useStyles();
    const clickedChip = (type) =>{
        if (thFilter.some(x=>x === type)){
            console.log(thFilter)
            setThFilter(thFilter.filter(x=>x !== type))
            console.log("in filter")
            console.log(thFilter)
        }else{
            setThFilter(thFilter.concat(type))
            console.log("new")
            console.log(thFilter)
        }
    }
    const [activities,setActivities] = useState([])
    const [thFilter,setThFilter] = useState([])
    const [err,setErrs] = useState('')
    useEffect(()=>{
        activitiesService
          .getAll()
          .then(currList=>{
            setActivities(currList.filter(x=>!x.veto))

          })
    
      },[])

    const color = (type)=>{
        if (thFilter.some(x=>x===type)){
            return "primary"
        } else{
            return "secondary"
        }
    }

    
return (
    <>
    <Container maxWidth="md">
    <h2>I would be ok with...</h2>
    <div>
    <Paper component="ul" className={classes.root}>
      {activitiesList.map((data) => {
        let icon;

        return (
          <li key={data}>
            <Chip

              label={data}
              onClick={()=>clickedChip(data)} 
              className={classes.chip}
              color={color(data)}
            />
          </li>
        );
      })}
    </Paper>
    </div>
    <div>
        {shuffleArray(activities.filter(x=>thFilter.some(z=>z === x.activityType))).map(filt =>{
            return (
                <Card className={classes.card}>                    

                <CardContent>
                    <h2>{filt.name}</h2>
                    <p>{filt.activityType}</p>
                </CardContent>
                <CardActions>
                    <Button color="secondary" onClick={()=>veto(filt._id)}>Veto!</Button>
                </CardActions>
            </Card>
            )
        }) }
    </div>
    </Container>
    </>
)
}

export default ActivityFinder;
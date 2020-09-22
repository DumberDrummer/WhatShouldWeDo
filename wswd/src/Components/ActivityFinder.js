import { Button, Card, CardActions, CardContent, Chip, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import activitiesService from '../Services/Activities';
import activitiesList from '../Shared/ActivityTypes';

const ActivityFinder = () => {
  //#region Hooks
  const [activities, setActivities] = useState([])
  const [thFilter, setThFilter] = useState([])
  const [, setErrs] = useState('')
  useEffect(() => {
    activitiesService
      .getAll()
      .then(currList => {
        setActivities(currList.filter(x => !x.veto))

      })

  }, [])
  //#endregion

  //#region Material UI
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
    card: {
      margin: theme.spacing(1),
    }
  }));
  const classes = useStyles();
  //#endregion

  //#region ServiceMethods
  const veto = (id) => {
    const activity = activities.find(t => t._id === id)
    const vetoActivity = { ...activity, veto: true }
    activitiesService
      .update(id, vetoActivity)
      .then(retActivity => {
        console.log(retActivity)
        setActivities(activities.map(t => t._id !== id ? t : retActivity).filter(x => !x.veto))
      })
      .catch(() => {
        setErrs(
          //Could display error to end user. 
        )
        setTimeout(() => {
          setErrs(null)
        }, 5000)
      })
  }
  //#endregion

  //#region Utility Functions
  const shuffleArray = (inArray) => {
    var array = [...inArray]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const color = (type) => {
    if (thFilter.some(x => x === type)) {
      return "primary"
    } else {
      return "secondary"
    }
  }
  //#endregion

  //#region Event Handlers
  const clickedChip = (type) => {
    if (thFilter.some(x => x === type)) {
      setThFilter(thFilter.filter(x => x !== type))
    } else {
      setThFilter(thFilter.concat(type))
    }
  }
  ////#endregion

  return (
    <>
            <h2>I would be ok with...</h2>
      <Container maxWidth="md">

        <div>
          <Paper component="ul" className={classes.root}>
            {activitiesList.map((data) => {

              return (
                <li key={data}>
                  <Chip

                    label={data}
                    onClick={() => clickedChip(data)}
                    className={classes.chip}
                    color={color(data)}
                  />
                </li>
              );
            })}
          </Paper>
        </div>
        <div>
          {shuffleArray(activities.filter(x => thFilter.some(z => z === x.activityType))).map(filt => {
            return (
              <Card className={classes.card}>

                <CardContent>
                  <h2>{filt.name}</h2>
                  <p>{filt.activityType}</p>
                </CardContent>
                <CardActions>
                  <Button color="secondary" onClick={() => veto(filt._id)}>Veto!</Button>
                </CardActions>
              </Card>
            )
          })}
        </div>
      </Container>
    </>
  )
}

export default ActivityFinder;
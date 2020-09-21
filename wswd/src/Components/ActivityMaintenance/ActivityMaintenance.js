import { Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import activitiesService from '../../Services/Activities';
import AddNewActivityDialog from './AddNewActivityDialog';


const ActivitiesMaintenance = () => {
  
  //#region Hooks
  const [activities, setActivities] = useState([])
  const [, setErrs] = useState(null)
  const [addOpen, setaddOpen] = React.useState(false);
  useEffect(() => {
    activitiesService
      .getAll()
      .then(currList => {
        setActivities(currList)
      })

  }, [])
  ////#endregion

  //#region MaterialUI
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 2,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }));
  const classes = useStyles()
  //#endregion

  //#region Service Methods
  const del = (id) => {
    const activity = activities.find(t => t._id === id)
    activitiesService.remove(id, activity)
      .then(() => {
        setActivities(activities.filter((activity) => activity._id !== id))
      });
  }

  const togVeto = (id) => {
    const activity = activities.find(t => t._id === id)
    const vetoActivity = { ...activity, veto: !activity.veto }

    activitiesService
      .update(id, vetoActivity)
      .then(retActivity => {
        setActivities(activities.map(t => t._id !== id ? t : retActivity))
      })
      .catch(() => {
        setErrs(
          //can set error message here
        )
        setTimeout(() => {
          setErrs(null)
        }, 5000)
      })

  }
  const add = (activity) => {
    setaddOpen(false)
    activitiesService.create(activity)
      .then(retActivity => {
        setActivities(activities.concat(retActivity))
      })
      .catch(() => {
        setErrs(
          //can set error message here
        )
        setTimeout(() => {
          setErrs(null)

        }, 5000)
      })
  }
  //#endregion

  //#region Event Handlers
  const handleDialogClose = () => {
    setaddOpen(false);
  }
  //#endregion

  return (
    <div>
      <Container maxWidth="md">
        <Paper className={classes.root}>
          <Typography variant="h5" gutterBottom>
            Current Activities
      </Typography>
        </Paper>

        <MaterialTable
          columns={[
            { title: "Name", field: "name" },
            { title: "Type", field: "activityType" },
          ]}
          data={activities}
          actions={[
            rowData => ({
              icon: 'delete',
              tooltip: 'Delete',
              disabled: !rowData.veto,
              onClick: (event, rowData) => {
                del(rowData._id)
              }
            }),
            rowData => ({
              icon: 'undo',
              tooltip: 'Remove Veto',
              hidden: !rowData.veto,
              onClick: (event, rowData) => {
                togVeto(rowData._id)
              }
            }),
            {
              icon: 'add',
              tooltip: 'Add Activity',
              isFreeAction: true,
              onClick: () => {
                setaddOpen(true)
                console.log(addOpen)
              }
            }          
          ]}
          options={{
            actionsColumnIndex: -1
          }}
          title=""
        />
        <AddNewActivityDialog onClose={handleDialogClose} open={addOpen} createHandler={add} />
      </Container>
    </div>
  )
}
export default ActivitiesMaintenance;
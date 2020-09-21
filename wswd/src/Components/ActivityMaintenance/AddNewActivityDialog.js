import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import typesList from '../../Shared/ActivityTypes'

const AddNewActivityDialog = ({ createHandler, onClose, open }) => {

    //#region MaterialUI
    const useStyles = makeStyles({
        root: {
            flexGrow: 1,
        },
    });
    const classes = useStyles()
    //#endregion

    //#region Hooks
    const [newActivityName, setNewActivityName] = useState('')
    const [newActivityType, setNewActivityType] = useState(typesList[0])
    //#endregion
    
    //#region Event Handlers
    const handleCreateActivity = (event) => {
        event.preventDefault()
        const newActivity = {
            name: newActivityName,
            activityType: newActivityType
        }
        createHandler(newActivity)
        setNewActivityName('')
    }
    const handleActivityChange = (event) => {
        setNewActivityName(event.target.value)
    }
    const handleTypeChange = (event) => {
        setNewActivityType(event.target.value)
    }
    const handleClose = () => {
        onClose()
    }
    //#endregion

    return (
        <Dialog onClose={handleClose} aria-labelledby="Add New" open={open}>
            <DialogTitle id="title">Add new activity to do!</DialogTitle>
            <DialogContent>
                <form onSubmit={handleCreateActivity}>
                    <div className={classes.root}>
                        <Grid container spacing={2} >
                            <Grid item xs={12}>
                                <TextField fullWidth label="New Activity to Do" variant="filled" value={newActivityName} onChange={handleActivityChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <Select fullWidth
                                    value={newActivityType}
                                    onChange={handleTypeChange}
                                >
                                    {typesList.map((types, i) => {
                                        return (
                                            <MenuItem value={types}>{types}</MenuItem>
                                        )

                                    })}

                                </Select>
                            </Grid>
                        </Grid>
                    </div>

                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleCreateActivity}
                >
                    Add
          </Button>
            </DialogActions>
        </Dialog>


    )

}

export default AddNewActivityDialog;
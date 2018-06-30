/* eslint-disable-line no-alert */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DialogContainer, TextField, Divider, Card, Button, Snackbar } from 'react-md';

import { withMainComponent } from '../hoc';

const NewPics = ({ saveNewPics, cancelNewPics, handleChange}) => {
    const styles = {
        save: { marginTop: 15, marginRight: 15 },
        cancel: { marginTop: 15 },
        buttonWrapper: { float: 'right' },
        section: { padding: 20 },
        card: { height: 260, width: 500 },
        header: { alignSelf: 'center' }
    }
    return (
        <div>
            <div className="cards md-cell--8" style={styles.header}>
                <h2>Add New Book</h2>
            </div>
            <div className="cards md-cell--center md-cell--12" >
                <form>
                    <section style={styles.section}>
                        <TextField
                            id="title"
                            name="title"
                            placeholder="Pic's title"
                            block
                            paddedBlock
                            onChange={handleChange}
                        />
                        <Divider />
                        <TextField
                            id="thumbnail"
                            name="thumbnail"
                            placeholder="Pic's url"
                            block
                            paddedBlock
                            onChange={handleChange}
                        />
                        <Divider />
                        <div style={styles.buttonsWrapper}>
                            <Button id="save" onClick={saveNewPics} raised primary style={styles.save} >Save</Button>
                            <Button id="cancel" onClick={cancelNewPics} raised primary style={styles.cancel}>Cancel</Button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
}

NewPics.PropTypes = {
    saveNewPics: PropTypes.func.isRequired, 
    cancelNewPics: PropTypes.func.isRequired, 
    handleChange: PropTypes.func.isRequired
}

export default withMainComponent(NewPics);
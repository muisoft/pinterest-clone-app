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
      section: { padding: 20, paddingTop: 2 },
      card: { height: 260, width: 500 },
      header: { textAlign: 'center'},
      largeInput: {
        height: 46,
        width: 400,
        padding: '10px 16px',
        fontSize: 18,
        lineHeight: 1.3333333,
        border: '2px solid #ccc',
        borderRadius: 6,
        backgroundImage: 'none',
        boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, .075)'
}
  }
  return (
      <div className="cards" style={{width: 400, height: 250}}>
          <div>
              <h2>Add New Pic</h2>
          </div>
          <div>
              <form>
                  <section>
                      <TextField
                          id="title"
                          name="title"
                          placeholder="Title"
                          block
                          inputStyle={styles.largeInput}
                          onChange={handleChange}
                      />
                      <TextField
                          id="thumbnai"
                          name="thumbnail"
                          placeholder="Image link"
                          block
                          inputStyle={styles.largeInput}
                          onChange={handleChange}
                      />
                      <div style={styles.buttonWrapper}>
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

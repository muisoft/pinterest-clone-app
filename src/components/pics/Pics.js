import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardActions, Avatar, FontIcon, Checkbox } from 'react-md';

import { withMainComponent } from '../hoc';

const Pics = ({ location, noRate, mypics, title, thumbnail, user, ownerImage, _id, owner, remove, request, isDisabled, rate, label, onRate, onDelete }) => {
    const styles = {
        actions: {
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: 5,
            paddingLeft: 12,
            paddingRight: 5,
            marginTop: 5
        },
    }

    const pics = {
        id: _id,
        request: true,
        url: thumbnail,
        owner: owner,
        to: user
    }
    const handleError = (e) => {
       e.target.src = process.env.NODE_ENV === 'production' ?
           'https://placeholdit.imgix.net/~text?txtsize=40&txt=pinit&w=200&h=200' :
           '/pics/20.jpg';
    }
    const renderCancel = () => {
        if (label === 'Delete') {
            return (
                <div style={{ position: 'relative', top: -10, right: -75 }}>
                    <Button
                        icon
                        tooltipLabel="Delete Pics"
                        style={{ paddingBottom: 0 }}
                        onClick={(e) => onDelete(pics)}>
                        close
                   </Button>
                </div>
            )
        }
    }
    const handleRate = (checked, changeEvent) => {
        if (checked === true) {
            rate++;
            onRate({ id: _id, rate: rate });
        }
        if (checked === false) {
            rate--;
            onRate({ id: _id, rate: rate });
        }
    }
    const renderAvatar = () => {
            if(ownerImage.length > 2){
                return (
                     <Avatar src={ownerImage} style={{ width: 30, height: 30 }} />
                )
            } else {
              return (
                <Avatar style={{ width: 30, height: 30 }}>{ownerImage[0]}</Avatar>
              )
            }
    }
    return (
        <Card style={{ padding: 4, width: 195, margin: 5 }} raise>
            {
                renderCancel()
            }
            <div style={{ position: 'relative', top: 2 }}>
                <img src={thumbnail} onError={handleError} style={{ width: '100%' }} alt={title} />
            </div>
            <div style={styles.actions}>
                <div style={{ ...styles.actions, ...styles.title }}><p id="title">{title}</p></div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -13 }}>
                    { renderAvatar() }
                    <div style={{ marginRight: 7 }}>
                        <Checkbox
                            id={title}
                            name="rate"
                            label={rate}
                            value={title}
                            disabled={noRate || location.pathname === '/'? true : false}
                            checkedIcon={<FontIcon primary iconClassName="fa fa-star" />}
                            uncheckedIcon={<FontIcon iconClassName="fa fa-star" />}
                            onChange={handleRate}
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}

Pics.PropTypes = {
    location: PropTypes.object,
    noRate: PropTypes.bool,
    mypics: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    ownerImage: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
    remove: PropTypes.func,
    request: PropTypes.func,
    isDisabled: PropTypes.bool,
    rate: PropTypes.number,
    label: PropTypes.string,
    onRate: PropTypes.func,
    onDelete: PropTypes.func
}
export default Pics;

//<Button flat iconClassName="fa fa-star" id="star"><span id="count">{20}</span></Button>

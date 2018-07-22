import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardActions, Avatar, FontIcon, Checkbox } from 'react-md';

import { withMainComponent } from '../hoc';
 
const Pics = ({ location, noRate, mypics, title, thumbnail, user, ownerImage, _id,
    owner, remove, request, isDisabled, rate, label, onRate, onDelete }) => {
    const styles = {
        actions: {
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: 5,
            paddingLeft: 12,
            paddingRight: 5,
            marginTop: 5
        },
        title: { fontSize: 16, wordWrap: 'break-word' },
        avatar: { width: 30, height: 30 },
        delete: { position: 'relative', top: -10, right: -75 },
        thumbnail: { position: 'relative', top: 2 },
        card: { padding: 4, width: 195, margin: 5 },
        rate: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -13 },
        checkedIcon: { fontSize: 20 }
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
            'https://placeholdit.imgix.net/~text?txtsize=40&txt=piccisy&w=200&h=200' :
            '/pics/20.jpg';
    }
    const renderCancel = () => {
        if (label === 'Delete') {
            return (
                <div style={styles.delete}>
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
        if (ownerImage.length > 2) {
            return (
                <Avatar src={ownerImage} style={styles.avatar} />
            )
        } else {
            return (
                <Avatar style={styles.avatar}>{ownerImage[0]}</Avatar>
            )
        }
    }

    return (
        <Card style={styles.card} raise>
            {
                renderCancel()
            }
            <div style={styles.thumbnail}>
                <img src={thumbnail} onError={handleError} style={{ width: '100%' }} alt={title} />
            </div>
            <div style={styles.actions}>
                <div style={styles.actions}><p style={styles.title} id="title">{title}</p></div>
                <div style={styles.rate}>
                    {renderAvatar()}
                    <div style={{ marginRight: 7 }}>
                        <Checkbox
                            id={title}
                            name="rate"
                            label={<span style={{ fontSize: 18 }}>{rate}</span>}
                            value={title}
                            disabled={noRate || location.pathname === '/' ? true : false}
                            checkedIcon={<FontIcon primary style={styles.checkedIcon} iconClassName="fa fa-star" />}
                            uncheckedIcon={<FontIcon style={styles.checkedIcon} iconClassName="fa fa-star" />}
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

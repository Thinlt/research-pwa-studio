import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classify from 'src/classify';
import MenuItem from '../MenuItem/index';
import MyMenuItem from '../MenuItem/MenuItem';
import SubMenuItem from '../MenuItem/subMenuItem';
import defaultClasses from './myAccountMenu.css';

class MyAccountMenu extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            list: PropTypes.string,
            signOutTitle: PropTypes.string,
            rewardsPoints: PropTypes.string
        }),
        signOut: PropTypes.func,
        user: PropTypes.shape({
            email: PropTypes.string,
            firstname: PropTypes.string,
            lastname: PropTypes.string,
            fullname: PropTypes.string
        }),
    };

    isShow = false;

    newsletterToggle = (event) => {
        if (event.target.parentElement && event.target.parentElement.className === 'subscribed') {
            return false;
        }
        if (!this.isShow) {
            this.isShow = true;
        } else {
            this.isShow = false;
        }
        this.setState({});
    }

    // TODO: add all menu items, use Badge component. Add purchase history page url.
    render() {
        const { classes, signOut, user } = this.props;

        return (
            <React.Fragment>
                <nav className={classes.list}>
                    <MenuItem.Link title="Purchase History" to="/" />
                    <MyMenuItem component="div" title={<div>Newsletter Subscription</div>}
                        onClick={this.newsletterToggle}
                        badge={
                            <SubMenuItem user={user} show={this.isShow} />
                        }
                    />
                    <MenuItem.Button
                        title={
                            <span className={classes.signOutTitle}>Sign Out</span>
                        }
                        onClick={signOut}
                    />
                </nav>
            </React.Fragment>
        );
    }
}

export default classify(defaultClasses)(MyAccountMenu);

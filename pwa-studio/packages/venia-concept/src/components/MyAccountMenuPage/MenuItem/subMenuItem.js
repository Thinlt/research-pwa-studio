import React, { Component } from 'react';
import PropTypes, {shape} from 'prop-types';
import classify from 'src/classify';
import defaultClasses from './menuItem.css';
import Newsletter from '../MyAccountMenu/newsletter';

class SubMenuItem extends Component {

    static propTypes = {
        content: PropTypes.object,
        classes: shape({
            subMenuItem: PropTypes.string
        }),
        show: PropTypes.bool
    };

    render() {
        let showClass = ''
        const { user, classes, show } = this.props;
        
        if (show) {
            showClass = ' ' + classes.show;
        }

        return (
            <div className={classes.subMenuItem + showClass}>
            { show && 
                <Newsletter user={user} />
            }
            </div>
        )
    }
}

export default classify(defaultClasses)(SubMenuItem);
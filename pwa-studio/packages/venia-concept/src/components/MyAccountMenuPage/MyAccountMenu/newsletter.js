import React, { useState } from 'react';
import { Query } from 'src/drivers';
import { object } from 'prop-types';
// import gql from 'graphql-tag';
// import { useQuery } from '@magento/peregrine';
import { Mutation } from 'react-apollo';
import { fullPageLoadingIndicator } from 'src/components/LoadingIndicator';
import CUSTOMER_NEWSLETTER from 'src/queries/customerNewsletter.graphql';
import CUSTOMER_NEWSLETTER_UPDATE from 'src/queries/customerNewsletterUpdate.graphql';

const Newsletter = props => {

    const {user} = props;
    
    // const updateQuery = gql`
    // mutation ($email: String, $isSubscribed: Boolean!) {
    //     updateCustomer (
    //         input: {
    //             email: $email
    //             is_subscribed: $isSubscribed
    //         }
    //     ){
    //         customer {
    //             firstname
    //             email
    //             is_subscribed
    //             id
    //         }
    //     }
    // }
    // `

    const [state, setState] = useState({isSubscribed: false});

    return (
        <Query query={CUSTOMER_NEWSLETTER}>
            {({ loading, error, data }) => {
                if (error) return <div>Data Fetch Error</div>;
                if (loading) return fullPageLoadingIndicator;
                const { customer } = data;
                const { is_subscribed } = customer;
                return (
                    <div className="subscribed">
                        <Mutation mutation={CUSTOMER_NEWSLETTER_UPDATE}>
                            {(updateCustomer, { data }) => (
                                <input type="checkbox" onChange={(e)=> {
                                    if (!user.email) return false;
                                    let isSubscribed = e.target.checked ? true : false;
                                    setState({isSubscribed: isSubscribed});
                                    updateCustomer({ variables: { email: user.email, isSubscribed: isSubscribed } });
                                }}
                                checked={is_subscribed} value={1} />
                            )}
                        </Mutation>
                        <label>General Subscription</label>
                    </div>
                );
            }}
        </Query>
    );
}

Newsletter.propTypes = {
    user: object
}

export default Newsletter;

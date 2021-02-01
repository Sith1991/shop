import React from 'react';
import {ShopstoreServiceConsumer} from "../shopstore-service-context";

const withShopstoreService = () => (Wrapped) => {
    return (props) => {
        return (
            <ShopstoreServiceConsumer>
                {
                    (shopstoreService) => {
                        return <Wrapped {...props} shopstoreService={shopstoreService} />
                    }
                }
            </ShopstoreServiceConsumer>
        );
    };
};

export default withShopstoreService;
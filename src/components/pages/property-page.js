import React from 'react';
import HeaderTabs from "../header-tabs";
import PropertyList from "../property-list";

const PropertyPage = () => {
    return (
        <div className={'property-page'}>
            <HeaderTabs />
            <PropertyList />
        </div>
    )
}

export default PropertyPage;
namespace Orders.db;
using { managed } from '@sap/cds/common';

entity OrderDetails{
    Key WorkOrder              :String(10)  @title: 'Work Order' ;
        Material               :String(10)  @title: 'Material';
        MaterialGroup          :String(10)  @title: 'Material Group';
        Quantity               :Decimal     @title: 'Quantity';
        StartPointAddress      :String(30)  @title: 'Start Point Address';
        EndPointAddress        :String(30)  @title: 'End Point Address';
        DeliveryDate             :Date        @title: 'Current Delivery Date as per PO';
        ModeofTransport        :String(10)  @title: 'Mode of transport';
        VendorDetails          :String(10)  @title: 'Vendor Details';
}

entity PROMPTDATA{
    Key WorkOrder           :String(10)     @title: 'Work Order';
        Payload             :String(1000)   @title: 'Prompt';
}

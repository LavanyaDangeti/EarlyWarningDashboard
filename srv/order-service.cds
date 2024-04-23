using Orders.db as my from '../db/datamodel';

service MyService{
    entity OrderDetails as projection on my.OrderDetails;
    entity PROMPTDATA as projection on my.PROMPTDATA;

    
   type response : {
        naturalDisasterDescription : String(20);
        OccurenceDate              : Date;
        SeverityScore              : String(10);        
    };   
    
    function getDetails(StartPointAddress:String, DeliveryDate:Date) returns array of response;
}


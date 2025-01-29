select 
 company_code,
 founder,
 (
     select count(distinct lead_manager_code)
     from lead_manager l
     where l.company_code = c.company_code
 ),
 (
     select count(distinct Senior_Manager_code)
     from Senior_Manager l
     where l.company_code = c.company_code
 ),
 (
     select count(distinct manager_code)
     from Manager l
     where l.company_code = c.company_code
 ),
 (
     select count(distinct Employee_code)
     from Employee l
     where l.company_code = c.company_code
 )
from company c
order by company_code ASC
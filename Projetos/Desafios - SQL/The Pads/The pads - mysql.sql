select CONCAT(name, "(", SUBSTRING(occupation, 1, 1), ")") 
from OCCUPATIONS
order by name;

select 
    concat("There are a total of ", o.count_occupations, " ", lower(o.occupation), "s.") 
from (
    select 
        occupation, 
        count(1) as count_occupations
    from occupations
    group by occupation
) o
order by o.count_occupations;
select s.name
from students s
join packages p on p.id = s.id
join friends fs on s.id = fs.id
join (
    select s.id, s.name, p.salary
    from students s
    join packages p on p.id = s.id
) f on f.id = fs.friend_id
where f.salary > p.salary
order by f.salary
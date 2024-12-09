with start_tasks as (
    select p1.start_date, row_number() over (order by p1.start_date) row_num
    from projects p1
    left join projects p2 on p1.start_date = p2.end_date
    where p2.task_id is null
),
end_tasks as (
    select p1.end_date, row_number() over (order by p1.end_date) row_num
    from projects p1
    left join projects p2 on p1.end_date = p2.start_date
    where p2.task_id is null
)
select start_date, end_date 
from start_tasks
inner join end_tasks on start_tasks.row_num = end_tasks.row_num
order by DATEDIFF(end_date, start_date);

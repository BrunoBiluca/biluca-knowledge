
```sql
-- estado inicial
CREATE TABLE employee (
  empId int,
  name varchar(15) NOT NULL,
  dept varchar(15) NOT NULL,
  curr bit,
  effective_date date,
  end_date date
);

INSERT INTO employee (empId, name, dept, curr, effective_date, end_date) 
  VALUES (0001, 'Clark', 'Programming', 0, "2024-08-05", NULL);
INSERT INTO employee (empId, name, dept, curr, effective_date, end_date) 
  VALUES (0001, 'Clark', 'Sales', 1, "2024-08-06", NULL);
INSERT INTO employee (empId, name, dept, curr, effective_date, end_date) 
  VALUES (0002, 'Dave', 'Accounting', 1, "2024-08-04", NULL);
INSERT INTO employee (empId, name, dept, curr, effective_date, end_date) 
  VALUES (0003, 'Ava', 'Sales', 1, "2024-08-05", NULL);

SELECT * FROM employee;

-- atualizações
CREATE TABLE updates (
  empId int,
  name varchar(15) NOT NULL,
  dept varchar(15) NOT NULL
);

INSERT INTO updates (empId, name, dept) VALUES (0001, 'Clark', 'Accounting');
INSERT INTO updates (empId, name, dept) VALUES (0003, 'Ava', 'Programming');

-- Levantamento de alterações
SELECT *
INTO #staged_updates
FROM (
  SELECT e.empId as merge_key, e.* FROM updates e 
  
  UNION ALL
  
  SELECT NULL as merge_key, updates.* FROM updates
  JOIN employee on updates.empId = employee.empId
  WHERE employee.curr = 1 and employee.dept <> updates.dept
) su;

SELECT * FROM #staged_updates;

-- Mesclagem
MERGE employee e
USING #staged_updates su
ON (e.empId = su.merge_key)
WHEN MATCHED THEN 
  UPDATE SET e.curr = 0
WHEN NOT MATCHED BY TARGET
  THEN INSERT (empId, name, dept, curr, effective_date, end_date) 
  VALUES (su.empId, su.name, su.dept, 1, "2024-08-07", NULL);
  
  
SELECT * FROM employee;

GO
```


```sql
-- Estado inicial
----------------------
 
empId       name            dept            curr effective_date   end_date        
----------- --------------- --------------- ---- ---------------- ----------------
          1 Clark           Programming        0       2024-08-05       2024-08-06
          1 Clark           Sales              1       2024-08-06             NULL
          2 Dave            Accounting         1       2024-08-04             NULL
          3 Ava             Sales              1       2024-08-05             NULL
 
-- Levantamento das alterações
----------------------
 
merge_key   empId       name            dept           
----------- ----------- --------------- ---------------
          1           1 Clark           Accounting     
          3           3 Ava             Programming    
       NULL           1 Clark           Accounting     
       NULL           3 Ava             Programming    
 
-- Estado após mesclagem
----------------------
 
empId       name            dept            curr effective_date   end_date        
----------- --------------- --------------- ---- ---------------- ----------------
          1 Clark           Accounting         1       2024-08-07             NULL
          1 Clark           Sales              0       2024-08-06       2024-08-07
          1 Clark           Programming        0       2024-08-05       2024-08-07
          2 Dave            Accounting         1       2024-08-04             NULL
          3 Ava             Programming        1       2024-08-07             NULL
          3 Ava             Sales              0       2024-08-05       2024-08-07
```
SELECT 
    SUBMISSION_DATE,
    (
        -- Cálculo dos hackers que submeteram na data em questão e anteriores
        SELECT COUNT(DISTINCT HACKER_ID)  
        FROM SUBMISSIONS S2  
        WHERE S2.SUBMISSION_DATE = S1.SUBMISSION_DATE AND    
            (
                -- Cálculo do número datas distintas com submissões
                SELECT COUNT(DISTINCT S3.SUBMISSION_DATE) 
                FROM SUBMISSIONS S3 
                WHERE S3.HACKER_ID = S2.HACKER_ID 
                    AND S3.SUBMISSION_DATE < S1.SUBMISSION_DATE
            ) = DATEDIFF(S1.SUBMISSION_DATE, '2016-03-01')
    ) AS COUNT_HACKERS,
    (
        -- Hacker que submeteu mais vezes na data
        SELECT HACKER_ID 
        FROM SUBMISSIONS S2 
        WHERE S2.SUBMISSION_DATE = S1.SUBMISSION_DATE 
        GROUP BY HACKER_ID 
        ORDER BY COUNT(SUBMISSION_ID) DESC, HACKER_ID 
        LIMIT 1
    ) AS TMP,
    (
        -- Nome do hacker que submeteu mais fezes na data
        SELECT NAME 
        FROM HACKERS
        WHERE HACKER_ID = TMP
    ) AS HACKER_NAME
FROM
    (
        SELECT DISTINCT SUBMISSION_DATE 
        FROM SUBMISSIONS
    ) S1
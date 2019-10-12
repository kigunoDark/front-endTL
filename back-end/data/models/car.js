const newCar=`
    CREATE TABLE IF NOT EXISTS cars (
        id BIGSERIAL NOT NULL,
        type varchar(50) NOT NULL,
        model varchar(50) NOT NULL,
        exp_year Date NOT NULL,
        PRIMARY KEY (id),
        owner_id BIGINT REFERENCES owners (id) 
    );`
module.exports =  newCar;
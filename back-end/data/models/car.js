const newCar=  `
    CREATE TABLE IF NOT EXISTS car(
        id bigserial not null primary key,
        name varchar(50)
    );
`
module.exports =  newCar;
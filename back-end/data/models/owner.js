const newOwner =`
    CREATE TABLE IF NOT EXISTS owners (
        id BIGSERIAL NOT NULL,
        name VARCHAR(50) NOT NULL,
        phone VARCHAR(10) NOT NULL,
        email VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
    );`
module.exports =  newOwner;
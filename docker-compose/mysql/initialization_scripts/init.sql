-- CREATE DATABASE IF NOT EXISTS nodemsdb;
CREATE TABLE images(
   transaction_id INT NOT NULL AUTO_INCREMENT,
   image_id VARCHAR(100) NOT NULL,
   scale INT NOT NULL,
   image_url VARCHAR(256) NOT NULL,
   PRIMARY KEY ( transaction_id )
);

-- image_id INT NOT NULL AUTO_INCREMENT,  
-- PRIMARY KEY ( cus_id )  
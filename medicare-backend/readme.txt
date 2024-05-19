-First of all you have to run this script in mysql (port 3306)

CREATE DATABASE centraldb;
use centraldb;

CREATE TABLE `superadmin` (
`id` INT PRIMARY KEY AUTO_INCREMENT,
`username` VARCHAR(255) NOT NULL UNIQUE,
`password` VARCHAR(255) NOT NULL
);

CREATE TABLE `clinics` (
`id` INT PRIMARY KEY AUTO_INCREMENT,
`code` VARCHAR(255) NOT NULL,
`address` VARCHAR(255) NOT NULL,
`phone` VARCHAR(255) NOT NULL,
`email` VARCHAR(255) NOT NULL,
`password` VARCHAR(255) NOT NULL,
`city` VARCHAR(255),
`postal_code` VARCHAR(255),
`logo` BLOB
);

-Inset the super admin in superadmin table 
username : admin
password : admin but insert it hashed $2a$10$ny6DasORrMGrGVX.YhkgD.BGMr4Tk39t.iib8sCJOSvMqZX20o8sO

## run this command in both folders clinic management and superadmin
npm i
npm start (to start the server) (superadmin port : 3301 | client port : 3302)
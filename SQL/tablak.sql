CREATE TABLE Felhasznalo (
    user_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);

CREATE TABLE Ajandek (
    id INT PRIMARY KEY,
    nev VARCHAR(100),
    leiras TEXT,
    ar INT,
    tipus VARCHAR(50),
    stilus_id INT,
    image_url VARCHAR(255),
    link_url VARCHAR(255)
);

CREATE TABLE Ajandek_Alkalom (
    ajandek_id INT,
    alkalom_id INT,
    PRIMARY KEY(ajandek_id, alkalom_id)
);

CREATE TABLE Ajandek_Celcsoport (
    ajandek_id INT,
    celcsoport_id INT,
    PRIMARY KEY(ajandek_id, celcsoport_id)
);

CREATE TABLE Alkalom (
    id INT PRIMARY KEY,
    nev VARCHAR(100)
);

CREATE TABLE Celcsoport (
    id INT PRIMARY KEY,
    nev VARCHAR(100)
);

CREATE TABLE Kuponok (
    coupon_id INT PRIMARY KEY,
    user_id INT,
    coupon_code VARCHAR(50),
    status VARCHAR(50),
    discount INT,
    expiry_date DATE
);

CREATE TABLE Stilusok (
    id INT PRIMARY KEY,
    nev VARCHAR(100)
);

use gestion_etudiant;

CREATE TABLE ETUDIANT(
    id INT AUTO_INCREMENT PRIMARY KEY,
    numEt VARCHAR(25) UNIQUE NOT NULL,
    nom  VARCHAR(150),
    prenom VARCHAR(150),
    note_math INT,
    note_phys INT
);

CREATE TABLE USER(

    userId INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(150),
    userPassword VARCHAR(255)
    
);
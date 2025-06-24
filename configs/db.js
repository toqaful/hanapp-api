require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  pool: {
    max: 20,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('✅ Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('❌ SQL Connection Error:', err);
        throw err;
    });

module.exports = {
  sql,
  poolPromise,
};

/*

CREATE TABLE Certificates (
    CertID INT IDENTITY(1,1) PRIMARY KEY,
    CertName NVARCHAR(255) NOT NULL,
	UploadedByID NVARCHAR(255) NOT NULL,
    TimeCreated DATETIME DEFAULT GETDATE(),
    TimeModified DATETIME DEFAULT GETDATE()
    
    -- Optional: Add a foreign key if uploadedByID refers to a user in another table
    -- FOREIGN KEY (uploadedByID) REFERENCES staff(staffID) -- or teacher/other table
);


CREATE TRIGGER trg_UpdateTimeModified
ON Certificates
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Certificates
    SET TimeModified = GETDATE()
    FROM Certificates c
    INNER JOIN inserted i ON c.CertID = i.CertID;
END;


CREATE TABLE Hub (
    HubID UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,  -- unique serial key
    CertID INT NOT NULL,                                -- reference to certificate
    ParticipantID NVARCHAR(255) NOT NULL,                          -- could be student/staff/teacher ID
    ParticipantEmail NVARCHAR(255) NOT NULL,
    ParticipantFname NVARCHAR(100) NOT NULL,
    ParticipantLname NVARCHAR(100) NOT NULL,
    ParticipantMname NVARCHAR(100) NULL,
	TimeCreated DATETIME DEFAULT GETDATE(),
    TimeModified DATETIME DEFAULT GETDATE()
    -- Optional Foreign Key:
    -- FOREIGN KEY (ecertID) REFERENCES certificate(certID)
);


CREATE TRIGGER trg_UpdateTimeModifiedHub
ON Hub
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Hub
    SET TimeModified = GETDATE()
    FROM Hub c
    INNER JOIN inserted i ON c.HubID = i.HubID;
END;


CREATE TABLE CertTemplate (
    TemplateID INT IDENTITY(1,1) PRIMARY KEY,
    CertID INT NOT NULL,
    CertPathName NVARCHAR(500) NOT NULL,
    UploadedByID NVARCHAR(255) NOT NULL,
	TimeCreated DATETIME DEFAULT GETDATE(),
    TimeModified DATETIME DEFAULT GETDATE()
    -- Optional Foreign Keys
    -- FOREIGN KEY (ecertID) REFERENCES certificate(certID),
    -- FOREIGN KEY (uploadedByID) REFERENCES staff(staffID) -- or users table
);

CREATE TRIGGER trg_UpdateTimeModifiedCertTemplate
ON CertTemplate
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE CertTemplate
    SET TimeModified = GETDATE()
    FROM CertTemplate c
    INNER JOIN inserted i ON c.TemplateID = i.TemplateID;
END;



CREATE TABLE Coordinates (
    CoordinateID INT IDENTITY(1,1) PRIMARY KEY,  -- unique ID
    CertID INT NOT NULL,                         -- reference to certificate
    UploadedByID NVARCHAR(255) NOT NULL,                    -- who created the coordinate
    FullnameX FLOAT NOT NULL,                            -- X position (e.g., horizontal)
    FullnameY FLOAT NOT NULL,                            -- Y position (e.g., vertical)
	SerialNumberX FLOAT NOT NULL,                            -- X position (e.g., horizontal)
    SerialNumberY FLOAT NOT NULL,                           -- Y position (e.g., vertical)
	TimeCreated DATETIME DEFAULT GETDATE(),
    TimeModified DATETIME DEFAULT GETDATE()

    -- Optional: Foreign Key Constraints
    -- FOREIGN KEY (certID) REFERENCES certificate(certID),
    -- FOREIGN KEY (createdByID) REFERENCES staff(staffID) -- or another users table
);

CREATE TRIGGER trg_UpdateTimeModifiedCoordinates
ON Coordinates
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Coordinates
    SET TimeModified = GETDATE()
    FROM Coordinates c
    INNER JOIN inserted i ON c.CoordinateID = i.CoordinateID;
END;


CREATE TABLE Uploader (
    UploaderID NVARCHAR(255) NOT NULL PRIMARY KEY,
    isDisabled BIT DEFAULT 0,
    TimeCreated DATETIME DEFAULT GETDATE(),
    TimeModified DATETIME DEFAULT GETDATE()
);


CREATE TRIGGER trg_UpdateTimeModifiedUploader
ON Uploader
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Uploader
    SET TimeModified = GETDATE()
    FROM Uploader c
    INNER JOIN inserted i ON c.UploaderID = i.UploaderID;
END;

*/
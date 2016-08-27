--if OBJECT_id('dbo.Items', 'U') is not null
--	drop table dbo.Items
--GO
--CREATE TABLE Items (
--    Id int IDENTITY PRIMARY KEY,
--    Description nvarchar(4000) NOT NULL,
--	Class nvarchar(30) NOT NULL,
--    Completed bit,
--    DueBy datetime2,
--	CreatedDate datetime2 NOT NULL,
--	UpdatedDate datetime2
--)
--GO


delete from SubItems
delete from Items
delete from Priorities
delete from Users
GO
DBCC CHECKIDENT ('[Items]', RESEED, 0);
DBCC CHECKIDENT ('[SubItems]', RESEED, 0);
DBCC CHECKIDENT ('[Priorities]', RESEED, 0);
DBCC CHECKIDENT ('[Users]', RESEED, 0);
GO
insert into [Priorities] (PriorityLevel)
VALUES ('High'),('Medium'),('Low')
GO
INSERT INTO USERS (CreatedDate, EmailId, Name)
VALUES
(GetDate(), 'deshpandeakhil@gmail.com', 'Akhil Deshpande'),
(GetDate(), 'kasturipore@gmail.com', 'Kasturi Pore')
GO
INSERT INTO Items (Class, Description, DueBy, CreatedDate, [PriorityId], UserId)
VALUES
('Tech','Install RTM version of SQL Server 2016', '2016-06-01', GetDate(),1,1),
('Tech','Go to github and download new samples', '2016-06-02', GetDate(),1,1),
('Tech','Install new Management Studio to try samples',  '2016-06-02', GetDate(),1,1),
('Grocery','Bring Milk', '2016-06-02', GetDate(),1,1),
('Grocery','Bring Coffee', '2016-06-02', GetDate(),1,1),
('Misc','OCI Card',  '2016-06-17', GetDate(),1,1),
('Misc','Buy Phone', '2016-06-17', GetDate(),1,1)
GO

update Items set [Status] = 1 where Id in (1,3,7)
update Items set [Status] = 2 where Id in (2,4)
update Items set [Status] = 3, CompletedOn=GETDATE() where Id in (5,6)
GO

INSERT INTO SubItems (Description, ItemId)
VALUES
('abc',1),
('cde',1),
('abc',2),
('xyz',2),
('abc',3),
('abc',4),
('abc',5),
('abc',6),
('abc',7)
GO

select * from items
select * from subitems
select * from [Priorities]
select * from Users


--ALTER DATABASE Todo SET COMPATIBILITY_LEVEL = 130
--GO

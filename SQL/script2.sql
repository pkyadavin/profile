/****** Object:  UserDefinedTableType [dbo].[AccountType]    Script Date: 18-03-2022 17:12:07 ******/
CREATE TYPE [dbo].[AccountType] AS TABLE(
	[Username] [varchar](20) NOT NULL,
	[NormalizedUsername] [varchar](20) NOT NULL,
	[Email] [varchar](30) NOT NULL,
	[NormalizedEmail] [varchar](30) NOT NULL,
	[Fullname] [varchar](30) NULL,
	[PasswordHash] [nvarchar](max) NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[ProfileType]    Script Date: 18-03-2022 17:12:07 ******/
CREATE TYPE [dbo].[ProfileType] AS TABLE(
	[Adhar] [varchar](20) NOT NULL,
	[Profile] [varchar](2000) NOT NULL
)
GO
/****** Object:  Table [dbo].[ApplicationUser]    Script Date: 18-03-2022 17:12:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApplicationUser](
	[ApplicationUserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](20) NOT NULL,
	[NormalizedUsername] [varchar](20) NOT NULL,
	[Email] [varchar](30) NOT NULL,
	[NormalizedEmail] [varchar](30) NOT NULL,
	[Fullname] [varchar](30) NULL,
	[PasswordHash] [nvarchar](max) NOT NULL,
	[Score] [int] NULL,
	[TimeSpent] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[ApplicationUserId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 18-03-2022 17:12:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profile](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Adhar] [varchar](20) NOT NULL,
	[Profile] [varchar](8000) NOT NULL,
 CONSTRAINT [UC_Adhar] UNIQUE NONCLUSTERED 
(
	[Adhar] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[Account_GetByUsername]    Script Date: 18-03-2022 17:12:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Account_GetByUsername]
	@NormalizedUsername VARCHAR(20)
AS
	SELECT 
	   [ApplicationUserId]
      ,[Username]
      ,[NormalizedUsername]
      ,[Email]
      ,[NormalizedEmail]
      ,[Fullname]
      ,[PasswordHash]
	FROM 
		[dbo].[ApplicationUser] t1 
	WHERE
		t1.[NormalizedUsername] = @NormalizedUsername
GO
/****** Object:  StoredProcedure [dbo].[Account_Insert]    Script Date: 18-03-2022 17:12:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Account_Insert]
	@Account AccountType READONLY
AS
	INSERT INTO 
		[dbo].[ApplicationUser]
           ([Username]
           ,[NormalizedUsername]
           ,[Email]
           ,[NormalizedEmail]
           ,[Fullname]
           ,[PasswordHash])
	SELECT
		 [Username]
		,[NormalizedUsername]
		,[Email]
        ,[NormalizedEmail]
        ,[Fullname]
        ,[PasswordHash]
	FROM
		@Account;

	SELECT CAST(SCOPE_IDENTITY() AS INT);
GO
/****** Object:  StoredProcedure [dbo].[Profile_Get]    Script Date: 18-03-2022 17:12:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Profile_Get]
	@Id INT
AS
	SELECT 
		*
	 FROM
		[dbo].[Profile] t1
	 WHERE
		t1.[Id] = @Id  
GO
/****** Object:  StoredProcedure [dbo].[Profile_GetByUserId]    Script Date: 18-03-2022 17:12:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Profile_GetByUserId]
	@ApplicationUserId INT
AS
SELECT 
		*
	 FROM
		[dbo].[Profile] 
GO
/****** Object:  StoredProcedure [dbo].[Profile_Upsert]    Script Date: 18-03-2022 17:12:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Profile_Upsert] 
@ProfileType ProfileType READONLY, 
@ApplicationUserId INT 
AS 
 
  INSERT INTO Profile (
       [Adhar]
      ,[Profile]
       )   
    SELECT      
       [Adhar]
      ,[Profile]   
  FROM 
    @ProfileType

SELECT 
  CAST(
    SCOPE_IDENTITY() AS INT
  );

GO

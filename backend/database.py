import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")

# Remove ssl-mode from the URL
DATABASE_URL = DATABASE_URL.replace("?ssl-mode=REQUIRED", "")

engine = create_engine(
    DATABASE_URL,
    connect_args={
        "ssl": {}
    }
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
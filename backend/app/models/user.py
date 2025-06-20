from sqlalchemy import Column, String
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id_number = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)

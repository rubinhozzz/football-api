from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    pass

class Player(Base):
    pass

class Match(Base):
    pass

class Location(Base):
    pass

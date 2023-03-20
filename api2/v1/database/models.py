from typing import List, Optional
from datetime import datetime
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary, Table
from sqlalchemy.orm import relationship, mapped_column, Mapped

from .database import Base

player_match = Table(
    "player_match",
    Base.metadata,
    Column("player_id", ForeignKey("player.id")),
    Column("match_id", ForeignKey("match.id")),
    Column("team", String, default=''),
    Column("pichichi", Boolean, default=False)
)

class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(100))
    hashed_password: Mapped[str] = mapped_column(String(30))
    is_active: Mapped[bool]

class Player(Base):
    __tablename__ = "player"
    id: Mapped[int] = mapped_column(primary_key=True)
    firstname: Mapped[str] = mapped_column(String(50))
    lastname: Mapped[str] = mapped_column(String(50))
    email: Mapped[Optional[str]] = mapped_column(String(100))
    country_code: Mapped[Optional[str]] = mapped_column(String(5))
    photo: Mapped[Optional[str]] = mapped_column(LargeBinary())
    is_active: Mapped[bool]
    matches: Mapped[List["Match"]] = relationship(secondary=player_match)
    match_mvp: Mapped["Match"] = relationship(back_populates="mvp")
    match_pichichis: Mapped["Match"] = relationship(back_populates="pichichis")

class Match(Base):
    __tablename__ = "match"
    id: Mapped[int] = mapped_column(primary_key=True)
    datetime: Mapped[datetime]
    teamA_name: Mapped[str] = mapped_column(String(100))
    teamB_name: Mapped[str] = mapped_column(String(100))
    teamA_score: Mapped[int]
    teamB_score: Mapped[int]
    location_id: Mapped[int] = mapped_column(ForeignKey("location.id")) 
    location: Mapped["Location"] = relationship(back_populates="match")
    mvp_id: Mapped[int] = mapped_column(ForeignKey("player.id")) 
    mvp: Mapped["Player"] = relationship(back_populates="match_mvp")
    pichichis: Mapped[List["Player"]] = relationship(secondary="player_match")

class Location(Base):
    __tablename__ = "location"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    postcode: Mapped[Optional[str]] = mapped_column(String(50))
    address: Mapped[Optional[str]] = mapped_column(String(100))
    is_active: Mapped[bool]
    match: Mapped["Match"] = relationship(back_populates="location")
    

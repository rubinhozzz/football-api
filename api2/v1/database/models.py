from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Mapped, relationship, mapped_column
from sqlalchemy import Boolean, Column, ForeignKey, String, LargeBinary, Table, DateTime
from .database import Base

"""
player_match = Table(
    "player_match",
    Base.metadata,
    Column("player_id", ForeignKey("player.id")),
    Column("match_id", ForeignKey("match.id")),
    Column("team", String, default=''),
    Column("pichichi", Boolean, default=False)
)
"""

class PlayerMatch(Base):
	__tablename__ = 'player_match'
	player_id: Mapped[int] = mapped_column(ForeignKey("player.id"), primary_key=True) 
	match_id: Mapped[int] = mapped_column(ForeignKey("match.id"), primary_key=True) 
	team: Mapped[Optional[str]] = mapped_column(String(1))
	pichichi: Mapped[bool] = mapped_column(Boolean, server_default='f', default=False)
        
	player: Mapped["Player"] = relationship(back_populates="matches", lazy="selectin")
	match: Mapped["Match"] = relationship(back_populates="players")

class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(100))
    hashed_password: Mapped[str] = mapped_column(String(100))
    is_active: Mapped[bool] = mapped_column(Boolean, server_default='t', default=True)

class Player(Base):
	__tablename__ = "player"
	id: Mapped[int] = mapped_column(primary_key=True)
	firstname: Mapped[str] = mapped_column(String(50))
	lastname: Mapped[str] = mapped_column(String(50))
	telephone: Mapped[Optional[str]] = mapped_column(String(30))
	country_code: Mapped[Optional[str]] = mapped_column(String(3))
	photo: Mapped[Optional[bytes]] = mapped_column(LargeBinary())
	is_active: Mapped[bool] = mapped_column(Boolean, server_default='t', default=True)
	match_mvp: Mapped["Match"] = relationship(back_populates="mvp")
	
	matches: Mapped[List["PlayerMatch"]] = relationship(back_populates="player", cascade='save-update, merge, delete, delete-orphan')
    

class Match(Base):
	__tablename__ = "match"
	id: Mapped[int] = mapped_column(primary_key=True)
	datetime: Mapped[int] = mapped_column(DateTime(timezone=True), default=datetime.now())
	teamA_name: Mapped[str] = mapped_column(String(100))
	teamB_name: Mapped[str] = mapped_column(String(100))
	teamA_score: Mapped[Optional[int]] = mapped_column(default=0)
	teamB_score: Mapped[Optional[int]] = mapped_column(default=0)
	location_id: Mapped[int] = mapped_column(ForeignKey("location.id")) 
	location: Mapped["Location"] = relationship(back_populates="matches", lazy='selectin')
	mvp_id: Mapped[Optional[int]] = mapped_column(ForeignKey("player.id")) 
	mvp: Mapped[Optional["Player"]] = relationship(back_populates="match_mvp", lazy='selectin')
	players: Mapped[List["PlayerMatch"]] = relationship(back_populates="match", lazy="selectin", cascade='save-update, merge, delete, delete-orphan')

class Location(Base):
    __tablename__ = "location"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    postcode: Mapped[Optional[str]] = mapped_column(String(10))
    address: Mapped[Optional[str]] = mapped_column(String(100))
    is_active: Mapped[bool] = mapped_column(Boolean, server_default='t', default=True)
    matches: Mapped[List["Match"]] = relationship(back_populates="location")
    

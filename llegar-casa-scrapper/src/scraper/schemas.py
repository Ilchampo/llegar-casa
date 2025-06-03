"""Scraper module Pydantic schemas."""

from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, field_validator


class ComplaintSearchRequest(BaseModel):
    """Request model for searching complaints by license plate."""
    
    license_plate: str = Field(
        ..., 
        min_length=6, 
        max_length=7,
        description="Vehicle license plate to search for"
    )
    driver_name: str = Field(
        ..., 
        min_length=2, 
        max_length=100,
        description="Driver name to match against processed persons"
    )
    
    @field_validator('license_plate')
    @classmethod
    def validate_license_plate(cls, v):
        """Validate license plate format."""
        if not v.replace(" ", "").isalnum():
            raise ValueError("License plate must contain only letters and numbers")
        return v.upper().replace(" ", "")
    
    @field_validator('driver_name')
    @classmethod
    def validate_driver_name(cls, v):
        """Validate and normalize driver name."""
        return " ".join(v.split()).upper()


class ComplaintSearchResponse(BaseModel):
    """Response model for complaint search results."""
    
    crime_report_number: Optional[str] = Field(
        None, 
        description="Crime report number (Noticia del Delito)"
    )
    lugar: Optional[str] = Field(
        None, 
        description="Location where the crime occurred"
    )
    fecha: Optional[str] = Field(
        None, 
        description="Date when the crime occurred"
    )
    delito: Optional[str] = Field(
        None, 
        description="Type of crime/offense"
    )
    
    procesados: List[str] = Field(
        default_factory=list,
        description="List of processed persons' full names"
    )
    
    name_match_found: bool = Field(
        False,
        description="Whether the driver name matches any processed person"
    )
    
    search_successful: bool = Field(
        True,
        description="Whether the search was completed successfully"
    )
    error_message: Optional[str] = Field(
        None,
        description="Error message if search failed"
    )
    searched_plate: str = Field(
        ...,
        description="The license plate that was searched"
    )
    searched_driver: str = Field(
        ...,
        description="The driver name that was searched"
    )


class ScraperHealthResponse(BaseModel):
    """Health check response for scraper service."""
    
    status: str = Field("healthy", description="Service status")
    browser_available: bool = Field(description="Whether browser automation is available")
    last_successful_search: Optional[datetime] = Field(
        None, 
        description="Timestamp of last successful search"
    )
    service_name: str = Field("scraper", description="Service identifier")
    
    circuit_breaker_state: Optional[str] = Field(None, description="Current circuit breaker state")
    
    retry_stats: Optional[Dict[str, Any]] = Field(None, description="Retry handler statistics")
    
    uptime_seconds: Optional[float] = Field(None, description="Service uptime in seconds")
    total_searches: Optional[int] = Field(None, description="Total searches performed")
    success_rate: Optional[float] = Field(None, description="Search success rate percentage")

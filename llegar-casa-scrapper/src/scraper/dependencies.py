"""FastAPI dependencies for the scraper module."""

import re
from typing import Annotated
from fastapi import Depends, HTTPException, Query, status
from fastapi.security import HTTPBearer
from datetime import datetime, timedelta

from .exceptions import InvalidPlateFormat

security = HTTPBearer(auto_error=False)


class RateLimiter:
    """Simple in-memory rate limiter for requests."""
    
    def __init__(self):
        self.requests = {}
        self.window_minutes = 5
        self.max_requests = 10
    
    def is_allowed(self, client_ip: str) -> bool:
        """Check if request is allowed based on rate limiting."""
        now = datetime.now()
        
        cutoff = now - timedelta(minutes=self.window_minutes)
        self.requests = {
            ip: times for ip, times in self.requests.items() 
            if any(t > cutoff for t in times)
        }
        
        if client_ip not in self.requests:
            self.requests[client_ip] = []
        
        self.requests[client_ip] = [
            t for t in self.requests[client_ip] if t > cutoff
        ]
        
        if len(self.requests[client_ip]) >= self.max_requests:
            return False
        
        self.requests[client_ip].append(now)
        return True


rate_limiter = RateLimiter()


async def validate_license_plate(
    license_plate: Annotated[str, Query(
        description="Vehicle license plate to search for",
        min_length=6,
        max_length=7,
        example="PCJ8619"
    )]
) -> str:
    """
    Validate and normalize license plate format.
    
    Raises:
        HTTPException: If license plate format is invalid
    """
    try:
        cleaned_plate = license_plate.replace(" ", "").upper()
        
        if not re.match(r'^[A-Z0-9]{6,7}$', cleaned_plate):
            raise InvalidPlateFormat(
                "License plate must be 6-7 alphanumeric characters"
            )
        
        if not re.match(r'^[A-Z]{2,3}[0-9]{3,4}[A-Z]?$', cleaned_plate):
            pass
        
        return cleaned_plate
        
    except InvalidPlateFormat as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Invalid license plate format: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"License plate validation error: {str(e)}"
        )


async def validate_driver_name(
    driver_name: Annotated[str, Query(
        description="Driver name to match against processed persons",
        min_length=2,
        max_length=100,
        example="TUQUEREZ JOSE FAUSTO"
    )]
) -> str:
    """
    Validate and normalize driver name.
    
    Raises:
        HTTPException: If driver name is invalid
    """
    try:
        cleaned_name = " ".join(driver_name.split()).upper()
        
        if not re.match(r'^[A-ZÁÉÍÓÚÑÜ\s\-\.]+$', cleaned_name):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Driver name contains invalid characters. Only letters, spaces, hyphens, and periods allowed."
            )
        
        if len(cleaned_name.replace(" ", "")) < 2:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Driver name too short. Must be at least 2 characters."
            )
        
        return cleaned_name
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Driver name validation error: {str(e)}"
        )


async def check_rate_limit(request) -> None:
    """
    Check if request is within rate limits.
    
    Raises:
        HTTPException: If rate limit exceeded
    """
    try:
        client_ip = request.client.host
        
        if not rate_limiter.is_allowed(client_ip):
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded. Maximum 10 requests per 5 minutes allowed.",
                headers={"Retry-After": "300"}
            )
            
    except HTTPException:
        raise
    except Exception as e:
        pass


async def validate_search_request(
    plate: Annotated[str, Depends(validate_license_plate)],
    driver: Annotated[str, Depends(validate_driver_name)]
) -> dict:
    """
    Combined validation for search request parameters.
    
    Returns:
        dict: Validated and normalized request parameters
    """
    return {
        "license_plate": plate,
        "driver_name": driver
    }


async def validate_api_key(
    credentials: Annotated[HTTPBearer, Depends(security)] = None
) -> str:
    """
    Validate API key (for future authentication if needed).
    
    Currently returns None since we don't require authentication.
    """
    return None


class ServiceHealth:
    """Dependency for checking service health status."""
    
    @staticmethod
    async def check_scraper_service() -> dict:
        """
        Check if scraper service dependencies are available.
        
        Returns:
            dict: Health status information
        """
        try:
            from playwright.async_api import async_playwright
            
            playwright = await async_playwright().start()
            await playwright.stop()
            
            return {
                "scraper_available": True,
                "playwright_available": True,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            return {
                "scraper_available": False,
                "playwright_available": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }

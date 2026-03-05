from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import httpx
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NASA_API_KEY = os.getenv("NASA_API_KEY", "DEMO_KEY")
NASA_API_URL = "https://api.nasa.gov/planetary/apod"

@app.get("/apod/{date}")
async def get_apod(date: str):
    """
    Fetches the APOD for a specific date from NASA API.
    Date should be in YYYY-MM-DD format.
    """
    if date < "1995-06-16":
        raise HTTPException(status_code=400, detail="A NASA começou a publicar a Imagem do Dia (APOD) apenas em 16 de Junho de 1995. Por favor, escolha uma data a partir dessa.")
        
    params = {
        "api_key": NASA_API_KEY,
        "date": date
    }
    
    try:
        async with httpx.AsyncClient(verify=False) as client:
            response = await client.get(NASA_API_URL, params=params)
            response.raise_for_status() # Raise HTTPError for bad responses
            data = response.json()
            return data
    except httpx.HTTPStatusError as e:
         raise HTTPException(status_code=e.response.status_code, detail=f"NASA API returned an error: {e}")
    except httpx.RequestError as e:
         raise HTTPException(status_code=500, detail=f"Error connecting to NASA API: {e}")
    except Exception as e:
         raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

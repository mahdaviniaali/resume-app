from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api import admin, public
from app.core.config import settings
from app.core.database import Base, SessionLocal, engine
from app.seed import seed_if_empty

Base.metadata.create_all(bind=engine)

with SessionLocal() as db:
    seed_if_empty(db)

app = FastAPI(title="Genesis API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

uploads = Path(__file__).resolve().parent.parent / "uploads"
uploads.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(uploads)), name="uploads")

app.include_router(public.router)
app.include_router(admin.router)


@app.get("/")
def root():
    return {"name": "Genesis API", "docs": "/docs"}
